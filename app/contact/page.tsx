import ContactFormWrapper from "@/components/contact/ContactFormWrapper";

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12 text-blue-900 dark:text-blue-400">
      <h1 className="text-3xl font-bold text-center mb-6">お問い合わせ</h1>
      <p className="text-center mb-8">
        お問い合わせは以下のフォームよりお願いいたします。
        <br />
        SNSでのご連絡をご希望の方は
        <a
          href="/profile"
          className="text-blue-600 dark:text-blue-300 underline"
        >
          Profile
        </a>
        をご覧ください。
      </p>
      <ContactFormWrapper />
    </div>
  );
}
