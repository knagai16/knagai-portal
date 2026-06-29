import * as vm from "node:vm";
import * as cdk from "aws-cdk-lib";
import { Match, Template } from "aws-cdk-lib/assertions";
import { InfraStack } from "../lib/infra-stack";
import { URL_REWRITE_FUNCTION_CODE } from "../lib/url-rewrite-function";

interface CloudFrontRequest {
  uri: string;
}

type CloudFrontHandler = (event: {
  request: CloudFrontRequest;
}) => CloudFrontRequest;

function createUrlRewriteHandler(): CloudFrontHandler {
  const context = vm.createContext({});
  const script = new vm.Script(
    `${URL_REWRITE_FUNCTION_CODE}\nthis.rewriteHandler = handler;`,
  );
  script.runInContext(context);

  return context.rewriteHandler as CloudFrontHandler;
}

describe("CloudFront static export routing", () => {
  const rewrite = createUrlRewriteHandler();

  test.each([
    ["/", "/index.html"],
    ["/contact", "/contact.html"],
    ["/contact/", "/contact.html"],
    ["/portfolio", "/portfolio.html"],
    ["/_next/static/app.js", "/_next/static/app.js"],
  ])("rewrites %s to %s", (uri, expected) => {
    expect(rewrite({ request: { uri } }).uri).toBe(expected);
  });

  test("associates the rewrite function with viewer requests", () => {
    const app = new cdk.App();
    const stack = new InfraStack(app, "TestStack");
    const template = Template.fromStack(stack);

    template.hasResourceProperties("AWS::CloudFront::Function", {
      AutoPublish: true,
      FunctionConfig: {
        Comment: "Resolve extensionless URLs to static HTML exports",
        Runtime: "cloudfront-js-2.0",
      },
      FunctionCode: Match.stringLikeRegexp("request\\.uri = uri \\+ \\\"\\.html\\\""),
    });

    template.hasResourceProperties("AWS::CloudFront::Distribution", {
      DistributionConfig: {
        DefaultCacheBehavior: {
          FunctionAssociations: Match.arrayWith([
            Match.objectLike({
              EventType: "viewer-request",
              FunctionARN: Match.anyValue(),
            }),
          ]),
        },
      },
    });
  });
});
