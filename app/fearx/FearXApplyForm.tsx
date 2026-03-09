"use client";

import { useState } from "react";
import Button from "../components/Button";

interface FearXApplyFormProps {
  type: "speaker" | "panelist";
}

export default function FearXApplyForm({ type }: FearXApplyFormProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [yearsInSales, setYearsInSales] = useState("");
  const [story, setStory] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isSpeaker = type === "speaker";
  const label = isSpeaker ? "FEARX Speaker" : "FEARX Panelist";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/fearx-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, firstName, email, role, yearsInSales, story }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  const inputClass =
    "w-full px-6 py-4 border-2 border-gray-200 rounded-full text-base focus:outline-none focus:border-[#a08216] transition-colors disabled:opacity-50 text-[#161317]";

  if (status === "success") {
    return (
      <div className="bg-white p-8 rounded-sm shadow-lg text-center py-16">
        <p className="text-5xl mb-4 text-[#a08216]">✓</p>
        <p className="text-2xl font-heading font-bold mb-3 text-[#161317]">
          Application Received
        </p>
        <p className="text-gray-600 leading-relaxed">
          Thank you, {firstName}. We&apos;ve received your {label} application and will be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-sm shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor={`${type}-firstName`} className="sr-only">First Name</label>
          <input
            id={`${type}-firstName`}
            type="text"
            placeholder="First Name *"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputClass}
            required
            aria-required="true"
            disabled={status === "loading"}
          />
        </div>
        <div>
          <label htmlFor={`${type}-email`} className="sr-only">Email Address</label>
          <input
            id={`${type}-email`}
            type="email"
            placeholder="Email Address *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            required
            aria-required="true"
            disabled={status === "loading"}
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor={`${type}-role`} className="sr-only">Role / Title</label>
        <input
          id={`${type}-role`}
          type="text"
          placeholder="Role / Title (e.g. Real Estate Agent, Sales Director)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={inputClass}
          disabled={status === "loading"}
        />
      </div>

      <div className="mb-4">
        <label htmlFor={`${type}-years`} className="sr-only">Years in Sales</label>
        <select
          id={`${type}-years`}
          value={yearsInSales}
          onChange={(e) => setYearsInSales(e.target.value)}
          className={`${inputClass} appearance-none`}
          disabled={status === "loading"}
        >
          <option value="">Years in Sales</option>
          <option value="<1">Less than 1 year</option>
          <option value="1-3">1–3 years</option>
          <option value="3-5">3–5 years</option>
          <option value="5-10">5–10 years</option>
          <option value="10+">10+ years</option>
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor={`${type}-story`} className="sr-only">Your Courage Story</label>
        <textarea
          id={`${type}-story`}
          placeholder={
            isSpeaker
              ? "Tell us your courage story — the moment you faced fear in sales and chose courage anyway. *"
              : "Briefly describe your sales journey and the courage lessons you&apos;ve learned over 10+ years. *"
          }
          value={story}
          onChange={(e) => setStory(e.target.value)}
          rows={5}
          className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl text-base focus:outline-none focus:border-[#a08216] transition-colors disabled:opacity-50 text-[#161317] resize-none"
          required
          aria-required="true"
          disabled={status === "loading"}
        />
        <p className="text-xs text-gray-400 mt-1 ml-2">Aim for at least 100 words.</p>
      </div>

      {status === "error" && (
        <p className="text-red-500 text-sm mb-4 text-center" role="alert">
          {errorMsg}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        className="w-full !py-5 !text-base"
        aria-label={`Apply to become a ${label}`}
        disabled={status === "loading"}
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
            Submitting...
          </span>
        ) : (
          `Apply to Stand on the Courage Carpet`
        )}
      </Button>
    </form>
  );
}
