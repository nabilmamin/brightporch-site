"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-white/5 border border-white/10 rounded-sm p-8 text-center">
        <div className="font-archivo text-xl font-700 text-white mb-2">
          Message sent.
        </div>
        <p className="font-space text-[15px] text-white/50">
          We&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="font-space text-[13px] text-white/50 block mb-1.5">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 font-space text-[15px] text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="font-space text-[13px] text-white/50 block mb-1.5">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 font-space text-[15px] text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 transition-colors"
            placeholder="you@company.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="font-space text-[13px] text-white/50 block mb-1.5">
          What&apos;s broken?
        </label>
        <textarea
          id="contact-message"
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 font-space text-[15px] text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 transition-colors resize-none"
          placeholder="Tell us about the problem you're facing..."
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="font-space text-[14px] font-medium text-[#0A0A0A] bg-white px-8 py-4 rounded-sm hover:bg-white/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
      {status === "error" && (
        <p className="font-space text-[13px] text-red-400">
          Something went wrong. Try again or email us directly.
        </p>
      )}
    </form>
  );
}
