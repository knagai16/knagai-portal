import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as iam from "aws-cdk-lib/aws-iam";

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3バケット作成
    const bucket = new s3.Bucket(this, "KnagaiPortalBucket", {
      bucketName: "knagai-portal",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL, // OAC を使うため
    });

    // CloudFront OAC 設定
    const oac = new cloudfront.CfnOriginAccessControl(this, "KnagaiPortalOAC", {
      originAccessControlConfig: {
        name: "KnagaiPortalOAC",
        originAccessControlOriginType: "s3",
        signingBehavior: "always",
        signingProtocol: "sigv4",
      },
    });

    // CloudFront ディストリビューション作成
    const distribution = new cloudfront.CfnDistribution(
      this,
      "KnagaiPortalCDN",
      {
        distributionConfig: {
          enabled: true,
          defaultRootObject: "index.html",
          origins: [
            {
              id: "S3Origin",
              domainName: bucket.bucketRegionalDomainName,
              originAccessControlId: oac.ref, // OACを適用
              s3OriginConfig: { originAccessIdentity: "" }, // OAIを空にする
            },
          ],
          defaultCacheBehavior: {
            targetOriginId: "S3Origin",
            viewerProtocolPolicy: "redirect-to-https",
            allowedMethods: ["GET", "HEAD"],
            cachedMethods: ["GET", "HEAD"],
            forwardedValues: {
              queryString: false,
              cookies: { forward: "none" },
            },
          },
        },
      },
    );

    // S3 バケットポリシーを設定（CloudFront OAC 向け）
    bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        principals: [new iam.ServicePrincipal("cloudfront.amazonaws.com")],
        actions: ["s3:GetObject"],
        resources: [`${bucket.bucketArn}/*`],
        conditions: {
          StringEquals: {
            "AWS:SourceArn": `arn:aws:cloudfront::${this.account}:distribution/${distribution.ref}`,
          },
        },
      }),
    );

    new cdk.CfnOutput(this, "CloudFrontURL", {
      value: `https://${distribution.attrDomainName}`,
    });
  }
}

export default InfraStack;
