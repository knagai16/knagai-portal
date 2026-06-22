"use client";

import { useForm, ValidationError } from "@formspree/react";

const FIELD_CLASS_NAME = [
  "mt-2 block w-full rounded-xl border border-ink/20 bg-paper px-4 py-3.5",
  "outline-none focus:border-ink focus:ring-2 focus:ring-accent",
].join(" ");

interface ContactFormProps {
  formId: string;
}

export default function ContactForm({ formId }: ContactFormProps) {
  const [state, handleSubmit] = useForm(formId);

  if (state.succeeded) {
    return (
      <div
        className="panel grid min-h-80 place-items-center p-8 text-center"
        role="status"
      >
        <div>
          <p className="mb-3 text-4xl" aria-hidden="true">✓</p>
          <p className="text-xl font-extrabold">送信しました</p>
          <p className="mt-2 text-muted">お問い合わせありがとうございます。</p>
        </div>
      </div>
    );
  }

  return (
    <form className="panel p-7 sm:p-10" onSubmit={handleSubmit}>
      <label className="mb-7 block text-sm font-bold">
        メールアドレス
        <input
          id="email"
          type="email"
          name="email"
          className={FIELD_CLASS_NAME}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </label>

      <label className="mb-7 block text-sm font-bold">
        メッセージ
        <textarea
          id="message"
          name="message"
          rows={8}
          className={FIELD_CLASS_NAME}
          placeholder="お問い合わせ内容をご記入ください"
          required
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </label>

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full rounded-full bg-ink px-6 py-4 font-extrabold text-white hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state.submitting ? "送信中…" : "メッセージを送る ↗"}
      </button>
    </form>
  );
}
