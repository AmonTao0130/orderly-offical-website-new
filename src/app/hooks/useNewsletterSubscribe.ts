import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function useNewsletterSubscribe() {
  const [status, setStatus] = useState<Status>("idle");

  async function subscribe(email: string) {
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Subscribe failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setStatus("idle");
  }

  return { status, subscribe, reset };
}
