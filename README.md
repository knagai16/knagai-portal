# Knagai Portal 🚀

Knagai Portal は、エンジニア向けのポータルサイトです。  
Next.js + TypeScript を活用して開発し、AWS S3 + CloudFront を使ってデプロイしています。

## 📌 使用技術

- **Next.js**: React ベースのフレームワーク
- **TypeScript**: 型安全な開発のために採用
- **Tailwind CSS**: シンプルなスタイリング
- **AWS S3**: 静的サイトホスティング
- **AWS CloudFront**: CDN によるパフォーマンス向上
- **AWS CDK**: インフラの IaC（Infrastructure as Code）化
- **Formspree**: お問い合わせフォームのバックエンド

## 🚀 セットアップ方法

### **1. Next.js アプリのセットアップ**

```sh
git clone https://github.com/yourusername/knagai-portal.git
cd knagai-portal
npm install
```

#### **開発サーバーの起動**
```sh
npm run dev
```
ブラウザで `http://localhost:3000` にアクセスすると、開発中のサイトを確認できます。

---

## 📬 お問い合わせフォームの設定

お問い合わせフォームは **Formspree** を利用して構築しています。  
`.env.local` に以下の環境変数を設定してください。

```
NEXT_PUBLIC_FORMSPREE_ENDPOINT=your_formspree_endpoint
```

この設定を追加し、アプリを再起動することでフォームが有効になります。

---

## 📜 ライセンス
このプロジェクトのコードは個人の著作物です。  
**利用や改変を希望する場合は、事前にご連絡ください！**  
無断使用はご遠慮いただけると助かります 🙏

---

💡 **Knagai Portal は、エンジニアとしての活動を発信するためのポートフォリオサイトです。  
改善点や提案があれば、ぜひ PR や Issue でご連絡ください！**
