import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import {
  AwsLogDriver,
  Cluster,
  ContainerImage,
  FargateService,
  FargateTaskDefinition,
} from 'aws-cdk-lib/aws-ecs'
import { DockerImageAsset, Platform } from 'aws-cdk-lib/aws-ecr-assets'
import {
  ApplicationListener,
  ApplicationLoadBalancer,
  ApplicationProtocol,
} from 'aws-cdk-lib/aws-elasticloadbalancingv2'
import { CnameRecord, PublicHostedZone } from 'aws-cdk-lib/aws-route53'

interface FrontendStackProps extends cdk.NestedStackProps {
  cluster: Cluster
  loadBalancer: ApplicationLoadBalancer
  httpsListener: ApplicationListener
}

export class FrontendStack extends cdk.NestedStack {
  public readonly service: FargateService

  constructor(scope: Construct, id: string, props: FrontendStackProps) {
    super(scope, id, props)
    const frontendImage = new DockerImageAsset(this, 'SampleboiFrontendImage', {
      directory: `../frontend`,
      platform: Platform.LINUX_AMD64,
    })

    const frontendTaskDefinition = new FargateTaskDefinition(this, 'SampleboiFrontendTaskDef')

    const frontendContainer = frontendTaskDefinition.addContainer('SampleboiFrontendContainer', {
      image: ContainerImage.fromDockerImageAsset(frontendImage),
      memoryLimitMiB: 256,
      logging: new AwsLogDriver({ streamPrefix: 'SampleboiFrontendContainerLogs' }),
      environment: {
        VITE_API_URL: 'https://sampleboi-api.bryannemesis.de/',
      },
      healthCheck: {
        command: ['CMD-SHELL', 'ping -c 1 127.0.0.1:5173'],
      },
    })

    frontendContainer.addPortMappings({
      containerPort: 5173,
    })

    this.service = new FargateService(this, 'SampleboiFrontendEcsService', {
      cluster: props.cluster,
      taskDefinition: frontendTaskDefinition,
    })

    const zone = PublicHostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
      hostedZoneId: 'Z04908875U9LYDOBWV0',
      zoneName: 'bryannemesis.de',
    })

    new CnameRecord(this, 'SampleboiFrontendLoadBalancerRecord', {
      domainName: props.loadBalancer.loadBalancerDnsName,
      recordName: 'sampleboi.bryannemesis.de',
      zone,
    })
  }
}
