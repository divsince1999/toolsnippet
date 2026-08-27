"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Feature Request / Tool Suggestion");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    // Trigger user mail client fallback cleanly
    const mailtoUrl = `mailto:contact@toolsnippet.com?subject=${encodeURIComponent(
      `[ToolSnippet Contact] ${subject} - ${name}`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
    )}`;

    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:py-24">
      {/* Header */}
      <div className="text-center">
        <span className="inline-flex items-center rounded-full bg-primary-solid/10 px-3 py-1 text-xs font-semibold text-primary-solid">
          📬 Get in Touch
        </span>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Contact <span className="text-primary-solid">ToolSnippet</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Have a suggestion for a new developer utility, noticed a bug, or want to partner with us? We’d love to hear from you.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-12">
        {/* Contact Info Cards (5 cols) */}
        <div className="space-y-4 md:col-span-5">
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-900">
            <div className="text-2xl">📧</div>
            <h3 className="mt-3 text-sm font-bold text-gray-900 dark:text-white">
              Direct Support Email
            </h3>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              For general inquiries, editorial questions, and partnership opportunities:
            </p>
            <a
              href="mailto:contact@toolsnippet.com"
              className="mt-3 inline-block font-mono text-xs font-semibold text-primary-solid hover:underline"
            >
              contact@toolsnippet.com
            </a>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-900">
            <div className="text-2xl">⏱️</div>
            <h3 className="mt-3 text-sm font-bold text-gray-900 dark:text-white">
              Response Time
            </h3>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              We review all developer inquiries and aim to reply within <strong>24 to 48 business hours</strong>.
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-900">
            <div className="text-2xl">💡</div>
            <h3 className="mt-3 text-sm font-bold text-gray-900 dark:text-white">
              Request a New Tool
            </h3>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              Need a specialized converter or format that isn&apos;t in our directory yet? Send us your specification and we&apos;ll build it!
            </p>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-xs dark:border-white/10 dark:bg-zinc-900 md:col-span-7">
          {submitted ? (
            <div className="py-12 text-center">
              <div className="text-4xl">🎉</div>
              <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                Message Initialized!
              </h3>
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                Your email client was opened with your message. If it didn&apos;t launch automatically, please email us directly at <code>contact@toolsnippet.com</code>.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSubmitted(false)}
                className="mt-6"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="mt-1 w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-primary-solid dark:border-white/15 dark:bg-black/30 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="mt-1 w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-primary-solid dark:border-white/15 dark:bg-black/30 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-primary-solid dark:border-white/15 dark:bg-zinc-800 dark:text-white"
                >
                  <option value="Feature Request / Tool Suggestion">Feature Request / Tool Suggestion</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Partnership & Sponsorship">Partnership &amp; Sponsorship</option>
                  <option value="General Question">General Question</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your suggestion, report, or inquiry..."
                  className="mt-1 w-full rounded-xl border border-black/15 bg-white p-3.5 text-xs text-gray-900 outline-none focus:border-primary-solid dark:border-white/15 dark:bg-black/30 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-primary-solid py-3 text-xs font-bold text-white shadow-xs transition hover:opacity-90 cursor-pointer"
              >
                Send Message →
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
