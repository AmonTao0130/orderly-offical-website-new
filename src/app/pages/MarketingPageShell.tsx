"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import {
  MobileFixedNav,
  MobileNavDrawer,
  MorphingHeader,
} from "@/app/components/SiteHeader";
import {
  MobileFooter,
  SiteFooter,
  TabletFooter,
} from "@/app/components/SiteFooter";

export function MarketingPageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="hidden lg:flex fixed top-0 left-0 right-0 z-[100] justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <MorphingHeader />
        </div>
      </div>
      <div className="lg:hidden">
        <MobileFixedNav onMenuClick={() => setNavOpen(true)} />
      </div>
      <AnimatePresence>
        {navOpen && <MobileNavDrawer onClose={() => setNavOpen(false)} />}
      </AnimatePresence>

      <main>{children}</main>

      <div className="hidden lg:block">
        <SiteFooter />
      </div>
      <div className="hidden sm:block lg:hidden pb-[24px]">
        <TabletFooter />
      </div>
      <div className="sm:hidden pb-[24px]">
        <MobileFooter />
      </div>
    </div>
  );
}
