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

interface ApiStackProps extends cdk.NestedStackProps {
  cluster: Cluster
  loadBalancer: ApplicationLoadBalancer
  httpsListener: ApplicationListener
}

export class ApiStack extends cdk.NestedStack {
  public readonly service: FargateService

  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props)
    const apiImage = new DockerImageAsset(this, 'SampleboiApiImage', {
      directory: `../api`,
      platform: Platform.LINUX_AMD64,
    })

    const apiTaskDefinition = new FargateTaskDefinition(this, 'SampleboiApiTaskDef')

    const apiContainer = apiTaskDefinition.addContainer('SampleboiApiContainer', {
      image: ContainerImage.fromDockerImageAsset(apiImage),
      memoryLimitMiB: 256,
      logging: new AwsLogDriver({ streamPrefix: 'SampleboiApiContainerLogs' }),
      environment: {
        DJANGO_ALLOWED_HOSTS: "sampleboi.bryannemesis.de",
        CORS_ALLOWED_ORIGINS: "https://sampleboi.bryannemesis.de",
        // SECRET_KEY: ""
      },
    })

    apiContainer.addPortMappings({
      containerPort: 80,
    })

    this.service = new FargateService(this, 'SampleboiApiEcsService', {
      cluster: props.cluster,
      taskDefinition: apiTaskDefinition,
    })

    const zone = PublicHostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
      hostedZoneId: 'Z04908875U9LYDOBWV0',
      zoneName: 'bryannemesis.de',
    })

    new CnameRecord(this, 'SampleboiApiLoadBalancerRecord', {
      domainName: props.loadBalancer.loadBalancerDnsName,
      recordName: 'sampleboi-api.bryannemesis.de',
      zone,
    })
  }
}
