import * as lambda from "aws-cdk-lib/aws-lambda";
import * as cdk from "aws-cdk-lib";
import * as path from "path";

import { getAllowedOrigin } from "../data-access/utils";
import { ALLOWED_ORIGINS } from "../data-access/constants";

export const LAMBDA_SETTINGS = {
  runtime: lambda.Runtime.NODEJS_20_X,
  memorySize: 1024,
  timeout: cdk.Duration.seconds(5),
  handler: "handler.getProducts",
  code: lambda.Code.fromAsset(path.join(__dirname, "./")),
};

export const LAMBDA_INTEGRATION_SETTINGS = {
  integrationResponses: [
    // Mapping for successful response
    {
      statusCode: "200",
      responseTemplates: {
        // Response mapping
        "application/json":
          getAllowedOrigin(ALLOWED_ORIGINS) + `$input.path('$.body')`,
      },
    },
  ],
  proxy: false,
};
