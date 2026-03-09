"use client";

import { useState } from "react";
import Button from "./Button";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSuccessMsg(data.message || "");
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="max-w-lg mx-auto text-center py-8">
        <p className="text-4xl mb-4">✓</p>
        <p className="text-xl font-heading font-bold mb-2">You&apos;re in!</p>
        <p className="text-gray-600">
          {successMsg || "Check your inbox — your welcome email is on its way."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-6">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-6 py-5 mb-4 border-2 border-gray-300 rounded-full text-base focus:outline-none focus:border-[#a08216] transition-colors disabled:opacity-50"
        required
        aria-required="true"
        disabled={status === "loading"}
      />
      <label htmlFor="newsletter-name" className="sr-only">
        First name (optional)
      </label>
      <input
        id="newsletter-name"
        type="text"
        placeholder="First Name (optional)"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="w-full px-6 py-5 mb-6 border-2 border-gray-300 rounded-full text-base focus:outline-none focus:border-[#a08216] transition-colors disabled:opacity-50"
        disabled={status === "loading"}
      />
      {status === "error" && (
        <p className="text-red-500 text-sm mb-4 text-center" role="alert">
          {errorMsg}
        </p>
      )}
      <Button
        type="submit"
        variant="primary"
        className="w-full !py-5 !text-base"
        aria-label="Subscribe to The Untethered Weekly"
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Subscribing...
          </span>
        ) : (
          "Get Weekly Courage"
        )}
      </Button>
    </form>
  );
}
