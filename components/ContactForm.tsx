"use client";
import React, { useState } from "react";
import { contact } from "@/data";

/**
 * The site is a static export, so there is no server to post to. Web3Forms
 * takes the submission and emails it on; set NEXT_PUBLIC_WEB3FORMS_KEY in the
 * Vercel project to switch it on.
 *
 * Without a key the form is not rendered at all — a contact form that silently
 * drops messages is worse than the mailto link it replaced.
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = "idle" | "sending" | "sent" | "error";

const ContactForm = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  if (!ACCESS_KEY) return null;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.append("access_key", ACCESS_KEY as string);
    data.append("subject", "New message from your portfolio");

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const result = await response.json();

      if (result.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setError(result.message || "Something went wrong. Try email instead?");
      }
    } catch {
      setStatus("error");
      setError("Couldn't reach the server. Try email instead?");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="w-full max-w-xl mt-10 rounded-2xl border border-purple/40 bg-[#10132E]/60 p-6 text-center"
      >
        <p className="text-white font-bold text-lg">Thanks — that reached me.</p>
        <p className="text-white-200 text-sm mt-2">
          I answer everything, usually within a day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-xl mt-10 flex flex-col gap-4 text-left"
    >
      {/* Honeypot — hidden from people, tempting to bots. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <Field id="name" label="Your name" className="flex-1">
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
          />
        </Field>
        <Field id="email" label="Your email" className="flex-1">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </Field>
      </div>

      <Field id="message" label="Message">
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={`${inputClass} resize-y`}
        />
      </Field>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-400">
          {error}{" "}
          <a href={`mailto:${contact.email}`} className="underline">
            {contact.email}
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 self-center w-full sm:w-56 h-12 rounded-lg bg-[#161a31] border border-white/[0.15] text-white text-sm font-medium hover:border-purple/60 hover:bg-[#1b2040] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple disabled:opacity-60 transition-colors"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
};

const inputClass =
  "w-full rounded-lg bg-[#10132E] border border-white/[0.12] px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple focus:border-transparent transition-shadow";

const Field = ({
  id,
  label,
  children,
  className = "",
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    <label htmlFor={id} className="text-sm text-white-200">
      {label}
    </label>
    {children}
  </div>
);

export default ContactForm;
