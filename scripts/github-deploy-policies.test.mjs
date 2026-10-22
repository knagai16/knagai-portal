import assert from "node:assert/strict";
import { test } from "node:test";
import { deploymentPolicies, subjectKeys } from "./github-deploy-policies.mjs";

const input = { accountId: "123456789012", repositoryId: "123456", bucket: "example-site-bucket", distributionId: "EXAMPLE123" };

test("OIDC trust accepts only the identified main workflow's push and manual events", () => {
  const { trust, oidc } = deploymentPolicies(input);
  assert.deepEqual(oidc.include_claim_keys, subjectKeys);
  const rules = trust.Statement[0].Condition.StringEquals;
  assert.equal(rules["token.actions.githubusercontent.com:aud"], "sts.amazonaws.com");
  const subjects = rules["token.actions.githubusercontent.com:sub"];
  const prefix = "repository_id:123456:ref:refs/heads/main:workflow_ref:knagai16/knagai-portal/.github/workflows/ci.yml@refs/heads/main:event_name:";
  assert.deepEqual(subjects, [prefix + "push", prefix + "workflow_dispatch"]);
  for (const rejected of [prefix + "pull_request_target", prefix + "pull_request", prefix.replaceAll("refs/heads/main", "refs/heads/feature") + "push", prefix.replace("repository_id:123456", "repository_id:999999") + "push", prefix.replace("ci.yml", "other.yml") + "push"]) {
    assert(!subjects.includes(rejected));
  }
  assert(!JSON.stringify(trust).includes("*"));
});

test("deployment policy scopes writes and invalidation and denies versioned asset deletion", () => {
  const { permissions } = deploymentPolicies(input);
  const allowed = permissions.Statement.filter((s) => s.Effect === "Allow");
  assert.deepEqual(allowed.flatMap((s) => s.Action).sort(), ["s3:ListBucket", "s3:GetBucketLocation", "s3:PutObject", "s3:DeleteObject", "cloudfront:CreateInvalidation", "cloudfront:GetInvalidation"].sort());
  assert(allowed.every((s) => s.Resource !== "*"));
  assert.equal(allowed.find((s) => s.Sid === "PublishSiteFiles").Resource, "arn:aws:s3:::example-site-bucket/*");
  assert.equal(allowed.find((s) => s.Sid === "InvalidateSiteCache").Resource, "arn:aws:cloudfront::123456789012:distribution/EXAMPLE123");
  assert.deepEqual(permissions.Statement.find((s) => s.Effect === "Deny"), {
    Sid: "PreserveVersionedAssets", Effect: "Deny", Action: "s3:DeleteObject", Resource: "arn:aws:s3:::example-site-bucket/_next/static/*",
  });
  assert.throws(() => deploymentPolicies({ ...input, bucket: "*" }));
});
