"use client";

import React from "react";
import { useForm, ValidationError } from "@formspree/react";

const ContactForm = ({ hashId }: { hashId: string }) => {
  const [state, handleSubmit] = useForm(hashId);

  if (state.succeeded) {
    return (
      <div className="text-green-500 text-center mt-4">
        <p>✅ 送信が完了しました！お問い合わせ、ありがとうございます。</p>
      </div>
    );
  }

  return (
    <form
      className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-300">メールアドレス</span>

        <input
          id="email"
          type="email"
          name="email"
          className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-300">メッセージ</span>
        <textarea
          id="message"
          name="message"
          rows={10}
          className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 focus:ring-blue-500 focus:border-blue-500"
          required
        ></textarea>
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </label>

      <button
        type="submit"
        disabled={state.submitting}
        className={`w-full text-white font-bold py-2 px-4 rounded-lg transition-all ${
          state.submitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {state.submitting ? "送信中..." : "送信する"}
      </button>
    </form>
  );
};

export default ContactForm;
