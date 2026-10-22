import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const subjectKeys = ["repository_id", "ref", "workflow_ref", "event_name"];
export const repository = "knagai16/knagai-portal";
export const roleName = "knagai-portal-github-deploy";

export function deploymentPolicies({ accountId, repositoryId, bucket, distributionId }) {
  if (!/^\d{12}$/.test(accountId) || !/^\d+$/.test(repositoryId) ||
      !/^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/.test(bucket) || !/^[A-Z0-9]+$/.test(distributionId)) {
    throw new Error("Invalid deployment policy parameters");
  }
  const subject = `repository_id:${repositoryId}:ref:refs/heads/main:workflow_ref:${repository}/.github/workflows/ci.yml@refs/heads/main:event_name:`;
  return {
    oidc: { use_default: false, include_claim_keys: subjectKeys },
    trust: {
      Version: "2012-10-17",
      Statement: [{
        Effect: "Allow",
        Principal: { Federated: `arn:aws:iam::${accountId}:oidc-provider/token.actions.githubusercontent.com` },
        Action: "sts:AssumeRoleWithWebIdentity",
        Condition: { StringEquals: {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          "token.actions.githubusercontent.com:sub": [subject + "push", subject + "workflow_dispatch"],
        } },
      }],
    },
    permissions: {
      Version: "2012-10-17",
      Statement: [
        { Sid: "ListSiteBucket", Effect: "Allow", Action: ["s3:ListBucket", "s3:GetBucketLocation"], Resource: `arn:aws:s3:::${bucket}` },
        { Sid: "PublishSiteFiles", Effect: "Allow", Action: ["s3:PutObject", "s3:DeleteObject"], Resource: `arn:aws:s3:::${bucket}/*` },
        { Sid: "PreserveVersionedAssets", Effect: "Deny", Action: "s3:DeleteObject", Resource: `arn:aws:s3:::${bucket}/_next/static/*` },
        { Sid: "InvalidateSiteCache", Effect: "Allow", Action: ["cloudfront:CreateInvalidation", "cloudfront:GetInvalidation"], Resource: `arn:aws:cloudfront::${accountId}:distribution/${distributionId}` },
      ],
    },
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const output = process.argv[2];
  if (!output) throw new Error("Provide a private output directory");
  const policies = deploymentPolicies({
    accountId: process.env.AWS_ACCOUNT_ID,
    repositoryId: process.env.GITHUB_REPOSITORY_ID,
    bucket: process.env.S3_BUCKET,
    distributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID,
  });
  mkdirSync(output, { recursive: true });
  for (const [name, policy] of Object.entries(policies)) {
    writeFileSync(`${output}/${name}.json`, JSON.stringify(policy, null, 2) + "\n", { mode: 0o600 });
  }
  console.log("Deployment policies generated; no credentials are included.");
}
