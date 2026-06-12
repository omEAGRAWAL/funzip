"use client";

import { useActionState, useEffect, useState } from "react";
import { Send } from "lucide-react";
import { createLeadAction, type LeadFormState } from "@/lib/actions";

const initialState: LeadFormState = {
  ok: false,
  message: "",
};

export function LeadForm({
  sourcePage,
  leadType,
  interestedPackage,
  downloadUrl,
}: {
  sourcePage: string;
  leadType: string;
  interestedPackage?: string;
  downloadUrl?: string;
}) {
  const [state, action, pending] = useActionState(createLeadAction, initialState);
  const [tracking, setTracking] = useState({
    referrer: "",
    device: "",
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    utmTerm: "",
    utmContent: "",
  });

  useEffect(() => {
    const id = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      setTracking({
        referrer: document.referrer,
        device: `${navigator.platform} ${window.innerWidth}x${window.innerHeight}`,
        utmSource: params.get("utm_source") || "",
        utmMedium: params.get("utm_medium") || "",
        utmCampaign: params.get("utm_campaign") || "",
        utmTerm: params.get("utm_term") || "",
        utmContent: params.get("utm_content") || "",
      });
    }, 0);

    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black text-brand-dark">Get a Kashmir quote</h2>
      <p className="mt-2 text-sm leading-6 text-foreground/65">
        Share your details and a planner will call with route, hotel, cab, and
        price options.
      </p>
      <form action={action} className="mt-5 grid gap-3">
        <input type="hidden" name="sourcePage" value={sourcePage} />
        <input type="hidden" name="leadType" value={leadType} />
        <input
          type="hidden"
          name="interestedPackage"
          value={interestedPackage || ""}
        />
        {Object.entries(tracking).map(([key, value]) => (
          <input key={key} type="hidden" name={key} value={value} />
        ))}
        <label className="grid gap-1 text-sm font-semibold">
          Name
          <input className="admin-input" name="name" required />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Phone number
          <input className="admin-input" name="phone" required />
        </label>
        <div className="grid gap-3 md:grid-cols-2">
          <label className="grid gap-1 text-sm font-semibold">
            Travel location
            <input className="admin-input" name="travelLocation" />
          </label>
          <label className="grid gap-1 text-sm font-semibold">
            People
            <input className="admin-input" name="numberOfPeople" type="number" min="1" />
          </label>
        </div>
        <label className="grid gap-1 text-sm font-semibold">
          Travel date
          <input className="admin-input" name="travelDate" type="date" />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-brand px-4 text-sm font-bold text-white disabled:opacity-60"
        >
          <Send size={17} />
          {pending ? "Sending..." : "Request callback"}
        </button>
      </form>
      {state.message ? (
        <div
          className={`mt-4 rounded-md p-3 text-sm ${
            state.ok
              ? "bg-water text-brand-dark"
              : "bg-red-50 text-red-700"
          }`}
          aria-live="polite"
        >
          {state.message}
          {state.ok && downloadUrl ? (
            <a
              href={downloadUrl}
              className="mt-2 block font-bold text-brand underline"
              target="_blank"
              rel="noreferrer"
            >
              Download itinerary PDF
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
