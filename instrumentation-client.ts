import posthog from "posthog-js";

const NEXT_PUBLIC_POSTHOG_KEY =
  "REDACTED_POSTHOG_KEY";
const NEXT_PUBLIC_POSTHOG_HOST = "https://us.i.posthog.com";

posthog.init(NEXT_PUBLIC_POSTHOG_KEY, {
  api_host: NEXT_PUBLIC_POSTHOG_HOST,
  defaults: "2025-05-24",
});
