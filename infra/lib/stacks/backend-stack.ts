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
import { PublicHostedZone, CnameRecord } from 'aws-cdk-lib/aws-route53'

interface BackendStackProps extends cdk.NestedStackProps {
  cluster: Cluster
  loadBalancer: ApplicationLoadBalancer
  httpsListener: ApplicationListener
}

export class BackendStack extends cdk.NestedStack {
  public readonly service: FargateService

  constructor(scope: Construct, id: string, props: BackendStackProps) {
    super(scope, id, props)
    const backendImage = new DockerImageAsset(this, 'SampleboiBackendImage', {
      directory: `../backend`,
      platform: Platform.LINUX_AMD64,
    })

    const backendTaskDefinition = new FargateTaskDefinition(this, 'SampleboiBackendTaskDef')

    const backendContainer = backendTaskDefinition.addContainer('SampleboiBackendContainer', {
      image: ContainerImage.fromDockerImageAsset(backendImage),
      memoryLimitMiB: 256,
      logging: new AwsLogDriver({ streamPrefix: 'SampleboiBackendContainerLogs' }),
    })

    backendContainer.addPortMappings({
      containerPort: 80,
    })

    this.service = new FargateService(this, 'SampleboiBackendEcsService', {
      cluster: props.cluster,
      taskDefinition: backendTaskDefinition,
    })

    const zone = PublicHostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
      hostedZoneId: 'Z04908875U9LYDOBWV0',
      zoneName: 'bryannemesis.de',
    })

    new CnameRecord(this, 'SampleboiBackendLoadBalancerRecord', {
      domainName: props.loadBalancer.loadBalancerDnsName,
      recordName: 'sampleboi-api.bryannemesis.de',
      zone,
    })
  }
}
