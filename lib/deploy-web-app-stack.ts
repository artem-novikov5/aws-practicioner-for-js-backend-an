
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DeploymentService } from './deployment-service';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class DeployWebAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new DeploymentService(this, "deployment");
  }
}
