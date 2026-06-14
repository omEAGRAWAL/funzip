"use client";

import { useActionState, useEffect, useState } from "react";
import { createLeadAction, type LeadFormState } from "@/lib/actions";

const initialState: LeadFormState = {
  ok: false,
  message: "",
};

export function HomeLeadForm({
  sourcePage,
  leadType,
  packageOptions,
}: {
  sourcePage: string;
  leadType: string;
  packageOptions: string[];
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
    <form action={action} className="lead-form">
      <input type="hidden" name="sourcePage" value={sourcePage} />
      <input type="hidden" name="leadType" value={leadType} />
      <input type="hidden" name="travelLocation" value="Kashmir" />
      {Object.entries(tracking).map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value} />
      ))}
      <input type="text" name="name" placeholder="Your name" aria-label="Your name" required />
      <input
        type="tel"
        name="phone"
        placeholder="Mobile number"
        aria-label="Mobile number"
        required
      />
      <select name="interestedPackage" aria-label="Travel type">
        {packageOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button type="submit" disabled={pending}>
        {pending ? "Sending..." : "Request Callback"}
      </button>
      {state.message ? (
        <p
          className={`home-form-message ${state.ok ? "success" : "error"}`}
          aria-live="polite"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
