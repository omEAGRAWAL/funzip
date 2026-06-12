"use client";

import { useActionState } from "react";
import { Lock } from "lucide-react";
import { loginAction } from "@/lib/admin-actions";

const initialState = { ok: false, message: "" };

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <form action={action} className="mt-6 grid gap-4">
      <label className="grid gap-1 text-sm font-semibold">
        Admin password
        <input
          className="admin-input"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </label>
      <button
        disabled={pending}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-brand px-4 text-sm font-bold text-white"
      >
        <Lock size={17} />
        {pending ? "Checking..." : "Login"}
      </button>
      {state.message ? (
        <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
