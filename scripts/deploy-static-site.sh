#!/usr/bin/env bash
set -euo pipefail

: "${S3_BUCKET:?Missing bucket}"
: "${CLOUDFRONT_DISTRIBUTION_ID:?Missing distribution}"
: "${GITHUB_SHA:?Missing revision}"
test -s out/index.html
test -s out/contact.html
test -s out/portfolio.html
test -d out/_next/static

# Publish versioned assets first. Retain previous assets for already-open pages.
aws s3 sync out/_next/static/ "s3://$S3_BUCKET/_next/static/" \
  --no-follow-symlinks --only-show-errors \
  --cache-control 'public,max-age=31536000,immutable'

# HTML and other public files may change at the same URL. Remove obsolete pages,
# but never delete the versioned assets excluded from this synchronization.
aws s3 sync out/ "s3://$S3_BUCKET/" \
  --exclude '_next/static/*' --no-follow-symlinks --delete --only-show-errors \
  --cache-control 'public,max-age=0,must-revalidate'

invalidation_id="$(aws cloudfront create-invalidation \
  --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" --paths '/*' \
  --query 'Invalidation.Id' --output text)"
aws cloudfront wait invalidation-completed \
  --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" --id "$invalidation_id"

for path in / /contact /contact/ /portfolio /portfolio/; do
  curl --fail --silent --show-error --retry 3 --max-time 30 \
    --proto '=https' --output /dev/null "https://knagai.com$path"
done

curl --fail --silent --show-error --retry 3 --max-time 30 --proto '=https' \
  https://knagai.com/deployment.json \
  | node -e 'let s="";process.stdin.on("data",x=>s+=x).on("end",()=>require("node:assert/strict").equal(JSON.parse(s).commit,process.env.GITHUB_SHA))'
echo 'Deployment and public routes verified.'
