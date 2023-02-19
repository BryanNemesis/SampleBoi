import * as cdk from 'aws-cdk-lib'
import { Bucket, CorsRule, HttpMethods } from 'aws-cdk-lib/aws-s3'
import { Construct } from 'constructs'

export class BucketStack extends cdk.NestedStack {
  constructor(scope: Construct, id: string, props: {}) {
    super(scope, id, props)

    const corsRule: CorsRule = {
      allowedMethods: [HttpMethods.GET, HttpMethods.PUT, HttpMethods.POST, HttpMethods.DELETE],
      allowedOrigins: ['*'],
    }

    const bucket = new Bucket(this, 'SampleboiSamplesBucket', {
      cors: [corsRule],
    })
  }
}
