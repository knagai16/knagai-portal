# GitHub Actionsによる自動公開

mainへのpush後、CIの`web`と`infra`が成功すると、検証済みの静的ファイルをS3へ反映し、CloudFrontキャッシュを削除します。
公開ページ5パターンと`deployment.json`のコミットIDを確認して完了します。
Actionsの`CI`をmainに対して手動実行することもできます。

## 認証と公開範囲

- AWSアクセスキーをGitHub Secretsやworkflowへ保存しません。OIDCで15分間の一時認証情報を取得します。
- AWSが信頼するのは、指定リポジトリID・main・`.github/workflows/ci.yml`の`push`または`workflow_dispatch`のみです。
- PR、fork、別ブランチ、別workflow、`pull_request_target`ではAWSロールを引き受けられません。
- ビルドとデプロイを別のGitHub hosted runnerに分け、ビルドにはAWS認証もOIDC権限も渡しません。
- deployジョブではnpmインストールやビルドを実行せず、同じ実行のartifact IDを指定して取得します。digest不一致はエラーです。
- 古いmainの再実行は、認証前の最新コミット確認で停止します。main実行は直列化し、実行中のデプロイを自動キャンセルしません。
- 公式ActionsはコミットSHA固定、checkoutの認証永続化と依存キャッシュは無効です。
- IAM権限は対象バケットの一覧・書き込み・削除と、対象Distributionのキャッシュ削除・完了確認のみです。
  バケット設定、IAM、CloudFront設定、CDKの変更権限は持ちません。
- artifactには検査済み`out/`だけを含め、保持期間は1日です。公開リポジトリのartifactやログは公開情報として扱います。
- `.env`、秘密鍵、ローカル資料、symlink、source map、既知の認証情報形式を検出すると停止します。
  これは補助検査であり、すべての独自形式の秘密情報を検出する保証はありません。GitHubのSecret scanning・push protectionも併用します。
- `.env.example`には空のプレースホルダーだけを許可します。フォームIDは公開値です。

## GitHub repository variables

| 名前 | 内容 |
| --- | --- |
| `AWS_REGION` | バケットのリージョン |
| `AWS_ACCOUNT_ID` | AWSアカウントID |
| `AWS_DEPLOY_ROLE_ARN` | `knagai-portal-github-deploy`ロールのARN |
| `S3_BUCKET` | 公開先バケット名 |
| `CLOUDFRONT_DISTRIBUTION_ID` | 配信ID |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | 公開用FormspreeフォームID |

これらは識別子であり、認証情報ではありません。非公開にする必要がある値をVariablesや`NEXT_PUBLIC_*`へ設定しないでください。
アカウントIDはAWS認証Actionのログ上でマスクしますが、識別子の秘匿にアクセス制御を依存させません。

## 初期設定・再構築

2026-10-22時点で、AWS OIDCプロバイダー、IAMロール、GitHubのsubject設定、repository variables、mainの保護は設定済みです。
追加の手動設定は不要です。IAM設定の読み戻しと権限シミュレーションは確認済みですが、実際のOIDC認証と自動公開は初回のmain実行で確認します。
以下は再構築が必要になった場合の手順です。

1. AWSに`https://token.actions.githubusercontent.com`、audience `sts.amazonaws.com`のOIDCプロバイダーを登録します。
2. `AWS_ACCOUNT_ID`、`GITHUB_REPOSITORY_ID`、`S3_BUCKET`、`CLOUDFRONT_DISTRIBUTION_ID`を指定して
   `node scripts/github-deploy-policies.mjs tmp/github-deploy-setup`を実行します。
3. `trust.json`で`knagai-portal-github-deploy`ロールを作成し、`permissions.json`をinline policyとして設定します。
4. `oidc.json`をGitHubの`PUT /repos/knagai16/knagai-portal/actions/oidc/customization/sub`へ適用します。
   subjectのキー順は`repository_id`, `ref`, `workflow_ref`, `event_name`です。IAM側と同時に変更してください。
5. 上記repository variablesを設定します。AWSキーを登録する必要はありません。
6. mainをPR・CI必須に保護し、`web`・`infra`の成功後にマージします。

作成したIAMロールとOIDCはサイトのCDKスタックとは別管理です。設定生成コードとローカル作業ログから再構築できます。

## 設定の確認（読み取りのみ）

AWS CLIとGitHub CLIで対象アカウントへログインしてから実行します。ローカルのAWS profile名が異なる場合は`knagai`を置き換えてください。
アクセスキーやトークンをコマンドへ直接記述する必要はありません。

```bash
export AWS_PROFILE=knagai
export AWS_ACCOUNT_ID="$(aws sts get-caller-identity --query Account --output text)"

aws iam get-open-id-connect-provider \
  --open-id-connect-provider-arn "arn:aws:iam::${AWS_ACCOUNT_ID}:oidc-provider/token.actions.githubusercontent.com" \
  --query '{Url:Url,Audience:ClientIDList}'

aws iam get-role --role-name knagai-portal-github-deploy \
  --query 'Role.AssumeRolePolicyDocument'

aws iam get-role-policy --role-name knagai-portal-github-deploy \
  --policy-name PublishStaticSite --query PolicyDocument

gh api repos/knagai16/knagai-portal/actions/oidc/customization/sub
gh variable list --repo knagai16/knagai-portal --json name --jq '.[].name'
```

確認する点は次のとおりです。

- プロバイダーのURLが`token.actions.githubusercontent.com`、audienceが`sts.amazonaws.com`であること。
- ロールのtrust policyが、対象リポジトリID、`refs/heads/main`、対象workflow、`push`と`workflow_dispatch`に限定されていること。
- inline policyが対象S3バケットとCloudFront Distributionに限定され、`_next/static/*`の削除が明示的に拒否されていること。
- GitHub側が`use_default: false`で、`include_claim_keys`が上記の4キーと同じ順序であること。
- Variablesに表の6項目があること。このコマンドでは値を表示しません。

## 初回公開と普段の操作

1. [PR #11](https://github.com/knagai16/knagai-portal/pull/11)の差分と`web`・`infra`の成功を確認し、mainへマージします。
2. [ActionsのCI](https://github.com/knagai16/knagai-portal/actions/workflows/ci.yml)で、マージ後のmainの実行を開きます。
3. `web`・`infra`に続いて`deploy`が成功したことを確認します。PRのCIでは`deploy`がスキップされるのが正常です。
4. `deploy`はS3反映、CloudFrontキャッシュ削除の完了待ち、公開URLとコミットIDの一致確認まで行います。
   必要に応じて[公開サイト](https://knagai.com)と[公開コミットID](https://knagai.com/deployment.json)もブラウザーで確認します。

以降は変更をPR経由でmainへマージするだけです。再実行する場合はActionsの`CI`で`Run workflow`を選び、ブランチを`main`にします。
初回にAWS認証で失敗した場合は、上の読み取りコマンドでsubjectとtrust policyの一致を確認してください。アクセスキーを追加する必要はありません。

## アップロードと障害時

バージョン付き`_next/static/`を先にアップロードし、その後HTML等を同期します。
古いJS/CSSは開いたままのページが利用するため削除せず、IAMでも削除を拒否します。
それ以外の廃止ファイルは同期で削除します。古いアセットの定期整理はこのworkflowの対象外です。

失敗した場合はActionsの失敗ステップを確認し、修正をmainへマージするか、現在のmainのworkflowを再実行してください。
古いrunの再実行による巻き戻しは拒否されるため、ロールバックはコードをrevertした新しいmainコミットで行います。
設定更新やキャッシュ削除の反映に時間がかかると、タイムアウトする場合があります。ジョブ失敗は必ずしもアップロード未実施を意味しません。
スモークテストでは問い合わせを送信しません。フォーム送信そのものは別途確認してください。
