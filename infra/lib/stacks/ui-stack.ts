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
} from 'aws-cdk-lib/aws-elasticloadbalancingv2'
import { CnameRecord, PublicHostedZone } from 'aws-cdk-lib/aws-route53'

interface UiStackProps extends cdk.NestedStackProps {
  cluster: Cluster
  loadBalancer: ApplicationLoadBalancer
  httpsListener: ApplicationListener
}

export class UiStack extends cdk.NestedStack {
  public readonly service: FargateService

  constructor(scope: Construct, id: string, props: UiStackProps) {
    super(scope, id, props)
    const uiImage = new DockerImageAsset(this, 'SampleboiUiImage', {
      directory: `../ui`,
      file: "Dockerfile.prod",
      platform: Platform.LINUX_AMD64,
    })

    const uiTaskDefinition = new FargateTaskDefinition(this, 'SampleboiUiTaskDef')

    const uiContainer = uiTaskDefinition.addContainer('SampleboiUiContainer', {
      image: ContainerImage.fromDockerImageAsset(uiImage),
      memoryLimitMiB: 256,
      logging: new AwsLogDriver({ streamPrefix: 'SampleboiUiContainerLogs' }),
      healthCheck: {
        command: ['CMD-SHELL', 'curl --fail -s 127.0.0.1:80'],
      },
    })

    uiContainer.addPortMappings({
      containerPort: 80,
    })

    this.service = new FargateService(this, 'SampleboiUiEcsService', {
      cluster: props.cluster,
      taskDefinition: uiTaskDefinition,
    })

    const zone = PublicHostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
      hostedZoneId: 'Z0884360360VTDLNX88R',
      zoneName: 'bryannemesis.com',
    })

    new CnameRecord(this, 'SampleboiUiLoadBalancerRecord', {
      domainName: props.loadBalancer.loadBalancerDnsName,
      recordName: 'sampleboi.bryannemesis.com',
      zone,
    })
  }
}
