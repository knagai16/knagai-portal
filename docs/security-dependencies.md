# 依存関係の脆弱性対応

確認日: 2026-10-22

## 検証結果

| 範囲 | Critical | High | Moderate |
| --- | ---: | ---: | ---: |
| Web（全依存） | 0 | 5 | 0 |
| Web（`--omit=dev`） | 0 | 0 | 0 |
| infra（全依存） | 0 | 0 | 20 |

Webとinfraの`npm ci`、Webのlint・型検査・ビルド、infraのビルド・既存Jestテスト、
CDKの`--no-lookups`でのテンプレート生成が成功。
最新main取り込み後、インフラの既存Jestテスト6件と静的書き出しテストも成功。
この環境には操作可能なブラウザがなく、Tailwind移行後の目視確認は未実施。
検証ホストのNode.jsは22.11.0であり、更新後の依存のengine要件に対する警告が出る。
通常の開発・CIでは`.nvmrc`に従い22系の最新パッチを使用する。

## 更新内容

- Next.js 15.1.7 → 15.5.28、React 19の修正版に更新。
- React 19に対応したFormspree React SDK 3とReact型定義に更新。
- Next.js内部のPostCSSは`overrides`で直接依存と同じ修正版に統一。
- Tailwind CSS 4と専用PostCSSプラグインに移行し、Tailwind経由のbraces依存を除去。
  既存の設定は`@config`で読み込み、border色、buttonカーソル、角丸の互換性を調整。
  mainの刷新後の配色は`--palette-*`変数を使用し、半透明色もTailwind 4形式で生成する。
  Tailwind 4の対象ブラウザはSafari 16.4+、Chrome 111+、Firefox 128+。
- ESLintを直接実行するlintコマンドに変更。Webとinfraの型検証範囲を分離。
- AWS CDK、Jest 30、互換性のあるts-jestと間接依存を更新。
- Node.jsは22系の最新パッチを使用する。ESLint依存の要件に合わせ、最低22.13.0を指定。

## 残るHigh

Webの開発依存に5件が残る。同じ`braces`の問題が次の依存経路に伝播した件数。

`eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces`

bracesの最新公開版3.0.3も影響範囲に含まれ、現時点で修正版はない。
最新のeslint-config-next 16.4.2でもこの経路が残る。
監査が提示する14系へのダウングレードは採用しない。

- Advisory: https://github.com/advisories/GHSA-vfj7-8cjw-p6xm
- 影響: 深くネストしたパターンの処理によるスタック枯渇。
- このリポジトリではlint時のファイルパターン処理に使用され、公開サイトのリクエスト処理経路には含まれない。
- 不特定ユーザーのパターンをlint設定として渡さない。修正版または依存除去が公開されたら再評価する。
- Advisoryの抑制や監査レベルの引き下げは行っていない。

## 確認方法

```sh
npm ci
npm audit
npm audit --omit=dev
npm run lint
npm run typecheck
npm run build
cd infra
npm ci
npm audit
npm run build
npx jest --watchman=false --runInBand
npx cdk synth --no-lookups
```

CDKの更新には生成テンプレートや補助Lambdaの変更が含まれ得るため、デプロイ時には差分を確認する。
この対応では本番デプロイは実施していない。
