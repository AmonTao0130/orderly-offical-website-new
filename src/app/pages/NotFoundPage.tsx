"use client";

import Link from "next/link";
import { MarketingPageShell } from "./MarketingPageShell";

export default function NotFoundPage() {
  return (
    <MarketingPageShell>
      <section className="relative flex min-h-[72vh] items-center overflow-hidden px-[20px] pt-[120px] pb-[72px] sm:px-[32px] lg:px-[48px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(103,0,206,0.5),transparent_34%),radial-gradient(circle_at_76%_28%,rgba(68,222,211,0.16),transparent_30%)]" />
        <div className="relative mx-auto max-w-[880px] text-center">
          <p className="mb-[18px] text-[14px] font-semibold uppercase tracking-[0.2em] text-[#9c75ff]">
            404
          </p>
          <h1 className="text-[44px] font-semibold leading-[1] tracking-0 sm:text-[72px]">
            This page is not available.
          </h1>
          <p className="mx-auto mt-[22px] max-w-[560px] text-[17px] leading-[1.65] text-white/68">
            The link may have moved, or the route no longer exists on Orderly
            Network.
          </p>
          <div className="mt-[30px] flex justify-center gap-[12px]">
            <Link
              href="/"
              className="inline-flex h-[48px] items-center justify-center rounded-full bg-white px-[22px] text-[15px] font-semibold text-black no-underline transition-opacity hover:opacity-80"
            >
              Go home
            </Link>
            <Link
              href="/partners"
              className="inline-flex h-[48px] items-center justify-center rounded-full border border-white/18 px-[22px] text-[15px] font-semibold text-white no-underline transition-colors hover:bg-white/10"
            >
              Explore partners
            </Link>
          </div>
        </div>
      </section>
    </MarketingPageShell>
  );
}
