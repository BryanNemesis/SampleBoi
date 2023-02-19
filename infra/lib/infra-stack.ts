import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { Cluster } from 'aws-cdk-lib/aws-ecs'
import { BackendStack } from './stacks/backend-stack'
import { FrontendStack } from './stacks/frontend-stack'
import { BucketStack } from './stacks/bucket-stack'
import { Vpc } from 'aws-cdk-lib/aws-ec2'
import {
  ApplicationLoadBalancer,
  ApplicationProtocol,
  ListenerAction,
  ListenerCondition,
} from 'aws-cdk-lib/aws-elasticloadbalancingv2'
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const vpc = new Vpc(this, 'SampleboiVpc')

    const bucket = new BucketStack(this, 'SampleboiBucketStack', {})

    const loadBalancer = new ApplicationLoadBalancer(this, 'LoadBalancer', {
      vpc,
      internetFacing: true,
    })
    const cert = Certificate.fromCertificateArn(
      this,
      'Certificate',
      'arn:aws:acm:eu-west-1:789983344423:certificate/7cd99932-f81e-459c-b77e-b87cb8222b9d'
    )
    const httpListener = loadBalancer.addListener('PublicListener', {
      protocol: ApplicationProtocol.HTTP,
      port: 80,
      open: true,
      defaultAction: ListenerAction.redirect({
        port: '443',
        protocol: ApplicationProtocol.HTTPS,
        permanent: true,
      }),
    })
    const httpsListener = loadBalancer.addListener('HttpsPublicListener', {
      protocol: ApplicationProtocol.HTTPS,
      port: 443,
      open: true,
    })
    httpsListener.addCertificates('CertArns', [cert])

    const cluster = new Cluster(this, 'SampleboiEcsCluster', { vpc })

    const backendStack = new BackendStack(this, 'SampleboiBackendStack', {
      cluster,
      loadBalancer,
      httpsListener,
    })
    const frontendStack = new FrontendStack(this, 'SampleboiFrontendStack', {
      cluster,
      loadBalancer,
      httpsListener,
    })

    httpsListener.addTargets('SampleboiBackendEcsTarget', {
      protocol: ApplicationProtocol.HTTP,
      targets: [backendStack.service],
      priority: 10,
      conditions: [
        // can we add a wildcard at the end of the url?
        ListenerCondition.hostHeaders(['sampleboi-api.bryannemesis.de']),
      ],
      healthCheck: {
        path: '/health',
      },
    })

    httpsListener.addTargets('SampleboiFrontendEcsTarget', {
      protocol: ApplicationProtocol.HTTP,
      targets: [frontendStack.service],
      healthCheck: {
        path: '/health',
      },
    })
  }
}
