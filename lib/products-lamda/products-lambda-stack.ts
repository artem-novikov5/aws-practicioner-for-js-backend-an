import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

import { ALLOWED_ORIGINS } from "../data-access/constants";

import { LAMBDA_INTEGRATION_SETTINGS, LAMBDA_SETTINGS } from "./settings";

export class ProductsLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new apigateway.RestApi(this, "my-api", {
      restApiName: "My API Gateway",
      description: "This API serves the Lambda functions.",
      defaultCorsPreflightOptions: {
        allowOrigins: ALLOWED_ORIGINS,
        allowHeaders: apigateway.Cors.DEFAULT_HEADERS.concat(["x-api-key"]),
        allowMethods: ["GET"],
      }
    });

    const getProductsList = new lambda.Function(
      this,
      "get-products-list-lambda-function",
      {
        ...LAMBDA_SETTINGS,
        handler: "handler.getProducts",
      }
    );

    const getProductById = new lambda.Function(
      this,
      "get-product-by-id-lambda-function",
      {
        ...LAMBDA_SETTINGS,
        handler: "handler.getProductById",
      }
    );

    const getProductsListLamdaIntegration = new apigateway.LambdaIntegration(
      getProductsList,
      { ...LAMBDA_INTEGRATION_SETTINGS }
    );

    const getProductByIdLamdaIntegration = new apigateway.LambdaIntegration(
      getProductById,
      {
        requestTemplates: {
          "application/json": `{ "productId": "$input.params('product_id')" }`, // Map the query param message
        },
        ...LAMBDA_INTEGRATION_SETTINGS,
      }
    );

    // Create a resource /hello and GET request under it
    const productsResource = api.root.addResource("products");
    const productResource = productsResource.addResource("{product_id}");

    // On this resource attach a GET method which pass request to our Lambda function
    productsResource.addMethod("GET", getProductsListLamdaIntegration, {
      methodResponses: [{ statusCode: "200" }],
    });

    // Get by ID
    productResource.addMethod("GET", getProductByIdLamdaIntegration, {
      methodResponses: [{ statusCode: "200" }],
    });
  }
}
