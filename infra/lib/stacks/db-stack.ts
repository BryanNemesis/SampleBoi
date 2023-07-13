import * as rds from "aws-cdk-lib/aws-rds"
import * as ec2 from "aws-cdk-lib/aws-ec2"
import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs"
import { Vpc } from "aws-cdk-lib/aws-ec2"

interface DbStackProps extends cdk.NestedStackProps {
    vpc: Vpc,
}

export class DbStack extends cdk.NestedStack {
  public readonly instance: rds.DatabaseInstance

  constructor(scope: Construct, id: string, props: DbStackProps) {
    super(scope, id, props)

    this.instance = new rds.DatabaseInstance(this, 'sampleboiDbInstance', {
      vpc: props.vpc,
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_14_6,
      }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.BURSTABLE3,
        ec2.InstanceSize.MICRO,
      ),
      credentials: rds.Credentials.fromGeneratedSecret('postgres'),
      deletionProtection: false,
      databaseName: 'sampleboi',

    });

    new cdk.CfnOutput(this, 'dbSecretArn', {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      value: this.instance.secret?.secretArn!,
      exportName: 'dbSecretArn'
    });
  }
}
