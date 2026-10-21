import ContactForm from "./ContactForm";

export default function ContactFormWrapper() {
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

  if (!formId) {
    return (
      <div className="panel grid min-h-80 place-items-center p-8 text-center">
        <div>
          <p className="text-xl font-extrabold">フォームは現在準備中です</p>
          <p className="mt-3 max-w-sm leading-7 text-muted">
            GitHubまたはLinkedInからご連絡ください。
          </p>
        </div>
      </div>
    );
  }

  return <ContactForm formId={formId} />;
}
