import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import {
  AwsLogDriver,
  Cluster,
  ContainerImage,
  FargateService,
  FargateTaskDefinition,
  Secret
} from 'aws-cdk-lib/aws-ecs'

import { DockerImageAsset, Platform } from 'aws-cdk-lib/aws-ecr-assets'
import {
  ApplicationListener,
  ApplicationLoadBalancer,
} from 'aws-cdk-lib/aws-elasticloadbalancingv2'
import { PublicHostedZone, CnameRecord } from 'aws-cdk-lib/aws-route53'
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager'

interface ApiStackProps extends cdk.NestedStackProps {
  cluster: Cluster
  loadBalancer: ApplicationLoadBalancer
  httpsListener: ApplicationListener
  dbSecret: ISecret
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
      secrets: {
        "SQL_DATABASE": Secret.fromSecretsManager(props.dbSecret, 'dbname'),
        "SQL_USER": Secret.fromSecretsManager(props.dbSecret, 'username'),
        "SQL_PASSWORD": Secret.fromSecretsManager(props.dbSecret, 'password'),
        "SQL_HOST": Secret.fromSecretsManager(props.dbSecret, 'host'),
        "SQL_PORT": Secret.fromSecretsManager(props.dbSecret, 'port'),
      },
      environment: {
        DJANGO_ALLOWED_HOSTS: "sampleboi-api.bryannemesis.com",
        CORS_ALLOWED_ORIGINS: "https://sampleboi.bryannemesis.com",
        DEBUG: "1",
        SECRET_KEY: "asdasd",
        SQL_ENGINE: "django.db.backends.postgresql",
        // SQL_DATABASE: ,
        // SQL_USER: username,
        // SQL_PASSWORD: password,
        // SQL_HOST: host,
        // SQL_PORT: port
      },
    })

    apiContainer.addPortMappings({
      containerPort: 80,
    })

    this.service = new FargateService(this, 'SampleboiApiEcsService', {
      cluster: props.cluster,
      taskDefinition: apiTaskDefinition,
      enableExecuteCommand: true,
    })

    const zone = PublicHostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
      hostedZoneId: 'Z0884360360VTDLNX88R',
      zoneName: 'bryannemesis.com',
    })

    new CnameRecord(this, 'SampleboiApiLoadBalancerRecord', {
      domainName: props.loadBalancer.loadBalancerDnsName,
      recordName: 'sampleboi-api.bryannemesis.com',
      zone,
    })
  }
}
