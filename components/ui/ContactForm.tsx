"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-[#EAE8E3] p-8 text-[#111111] max-w-[400px]">
        <p className="font-serif text-[1.2rem] mb-2">Message Sent</p>
        <p className="text-[0.85rem] text-[#555555]">
          Thank you for reaching out. We will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1.5">
        <label className="label-text" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          placeholder="Your name"
          className="border border-[#D8D6D1] bg-transparent px-4 py-3 text-[0.9rem] text-[#333333] placeholder-[#D8D6D1] focus:outline-none focus:border-[#333333] transition-colors"
          style={{ fontFamily: "var(--font-sans)" }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="label-text" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="your@email.com"
          className="border border-[#D8D6D1] bg-transparent px-4 py-3 text-[0.9rem] text-[#333333] placeholder-[#D8D6D1] focus:outline-none focus:border-[#333333] transition-colors"
          style={{ fontFamily: "var(--font-sans)" }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="label-text" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          required
          placeholder="Tell us about your project..."
          className="border border-[#D8D6D1] bg-transparent px-4 py-3 text-[0.9rem] text-[#333333] placeholder-[#D8D6D1] focus:outline-none focus:border-[#333333] transition-colors resize-none"
          style={{ fontFamily: "var(--font-sans)" }}
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-3 bg-[#111111] text-[#F7F6F3] text-[11px] tracking-[0.1em] uppercase px-7 py-3.5 hover:bg-[#333333] transition-colors duration-300 w-fit mt-2"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        Send Message →
      </button>
    </form>
  );
}
