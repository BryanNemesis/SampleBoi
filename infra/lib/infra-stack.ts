import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs"
import { Cluster } from "aws-cdk-lib/aws-ecs"
import { ApiStack } from "./stacks/api-stack"
import { UiStack } from "./stacks/ui-stack"
import { BucketStack } from "./stacks/bucket-stack"
import { Vpc, Port } from "aws-cdk-lib/aws-ec2"
import { Secret } from "aws-cdk-lib/aws-secretsmanager"
import {
  ApplicationLoadBalancer,
  ApplicationProtocol,
  ListenerAction,
  ListenerCondition,
} from "aws-cdk-lib/aws-elasticloadbalancingv2"
import { Certificate } from "aws-cdk-lib/aws-certificatemanager"
import { DbStack } from "./stacks/db-stack"

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const vpc = new Vpc(this, "SampleboiVpc")

    const bucket = new BucketStack(this, "SampleboiBucketStack", {})

    const loadBalancer = new ApplicationLoadBalancer(this, "LoadBalancer", {
      vpc,
      internetFacing: true,
    })
    const cert = Certificate.fromCertificateArn(
      this,
      "Certificate",
      "arn:aws:acm:eu-west-1:789983344423:certificate/f52a1d8f-e90f-4110-ad29-c9311b4e826a"
    )
    const httpListener = loadBalancer.addListener("PublicListener", {
      protocol: ApplicationProtocol.HTTP,
      port: 80,
      open: true,
      defaultAction: ListenerAction.redirect({
        port: "443",
        protocol: ApplicationProtocol.HTTPS,
        permanent: true,
      }),
    })
    const httpsListener = loadBalancer.addListener("HttpsPublicListener", {
      protocol: ApplicationProtocol.HTTPS,
      port: 443,
      open: true,
    })
    httpsListener.addCertificates("CertArns", [cert])

    const cluster = new Cluster(this, "SampleboiEcsCluster", { vpc })

    const dbStack = new DbStack(this, "SampleboiDbStack", { vpc })

    const dbSecret = Secret.fromSecretCompleteArn(
      this,
      "dbSecretArn",
      cdk.Fn.importValue("dbSecretArn")
    )

    const apiStack = new ApiStack(this, "SampleboiApiStack", {
      cluster,
      loadBalancer,
      httpsListener,
      dbSecret: dbSecret,
    })

    apiStack.addDependency(dbStack)
    // this port number can also come from dbSecret
    apiStack.service.connections.allowTo(dbStack.instance, Port.tcp(5432))

    const uiStack = new UiStack(this, "SampleboiUiStack", {
      cluster,
      loadBalancer,
      httpsListener,
    })

    httpsListener.addTargets("SampleboiApiEcsTarget", {
      protocol: ApplicationProtocol.HTTP,
      targets: [apiStack.service],
      priority: 10,
      conditions: [
        ListenerCondition.hostHeaders(["sampleboi-api.bryannemesis.com"]),
      ],
      healthCheck: {
        path: "/health",
      },
    })

    httpsListener.addTargets("SampleboiUiEcsTarget", {
      protocol: ApplicationProtocol.HTTP,
      targets: [uiStack.service],
      healthCheck: {
        path: "/health",
      },
    })
  }
}
