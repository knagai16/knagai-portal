# knagai portal

Personal portfolio built as a statically exported Next.js application.

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Formspree
- AWS S3 and CloudFront
- AWS CDK

## Local development

```bash
git clone git@github.com:knagai16/knagai-portal.git
cd knagai-portal
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>.

The contact form requires a public Formspree form ID in `.env.local`:

```dotenv
NEXT_PUBLIC_FORMSPREE_ENDPOINT=your_form_id
```

The contact page displays a fallback when the value is unset. Values prefixed
with `NEXT_PUBLIC_` are included in the browser bundle and must never contain a
secret.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
npm run test:static
```

`npm run build` exports the static site to `out/`.
`npm run test:static` verifies the exported `/`, `/contact`, and `/portfolio`
pages used by the CloudFront URL rewrite function.

## Infrastructure

The `infra/` directory contains the AWS CDK stack used for private S3 hosting
behind CloudFront Origin Access Control.
