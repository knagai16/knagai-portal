import ContactForm from "@/components/contact/ContactForm";

export default function ContactFormWrapper() {
  const hashId = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

  // 環境変数がない場合のエラーメッセージ
  if (!hashId) {
    return (
      <div className="container mx-auto px-4 py-12 text-blue-900 dark:text-blue-400">
        <p className="text-center text-red-500 font-bold">
          ⚠ お問い合わせフォームが利用できません。
          <br />
          Profileページの各種SNSからお問い合わせください。
        </p>
      </div>
    );
  }
  return <ContactForm hashId={hashId} />;
}
