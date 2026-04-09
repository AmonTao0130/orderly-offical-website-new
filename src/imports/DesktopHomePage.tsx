"use client";

import posthog from "posthog-js";
import { useState, useRef, useEffect, useCallback, useId } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  useOrderlyStats,
  formatLargeNumber,
} from "@/app/hooks/useOrderlyStats";
import { AnimatedNumber } from "@/app/components/AnimatedNumber";
import { useNewsletterSubscribe } from "@/app/hooks/useNewsletterSubscribe";
import {
  HEADER_NAV,
  HEADER_CTA,
  DOCS_LINK,
  CAMPAIGNS_LINK,
  CAMPAIGN_ITEMS,
  FOOTER_NAV,
} from "@/app/shared/orderly";
import svgPaths from "./svg-kykn6znl0w";
import ImportedWhyContent from "./WhyContent";
import MacbookVideo from "@/app/components/MacbookVideo";
import { imgGroup } from "./svg-z9q1x";
import QuickStartGroup from "./Group1597879965";
import IcSocialYoutubeS from "./IcSocialYoutubeS24";

// Lightweight inline check icon (replaces heavy MUI Check)
const CheckSvg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 13l4 4L19 7"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── SVG asset imports ────────────────────────────────────────────────────────
const ethBadgeSrc = "/images/svg/EthBadge.svg";
const arbBadgeSrc = "/images/svg/ArbBadge.svg";
const solBadgeSrc = "/images/svg/SolBadge.svg";
import UniswapLogo from "./UniswapLogo";
const pancakeLogoSrc = "/images/svg/PancakeLogo.svg";
import CamelotLogo from "./CamelotLogo";
const raydiumLogoSrc = "/images/logos/raydium.png";
const woofiLogoSrc = "/images/svg/WOOFiLogo.svg";

// ─── Buy ORDER Modal ──────────────────────────────────────────────────────────
// Use Adobe Fonts Typekit font: atyp-bl-variable (weight range: 280-700)
const fontRegularBuy = {
  fontFamily: "'atyp-bl-variable', 'Atyp BL', sans-serif",
  fontWeight: 400,
};
const fontMediumBuy = {
  fontFamily: "'atyp-bl-variable', 'Atyp BL', sans-serif",
  fontWeight: 500,
};

// ── Chain network badges ────────────────────────────────────────────────────
function EthBadge() {
  return (
    <img
      src={ethBadgeSrc}
      width={22}
      height={22}
      alt="Ethereum"
      className="shrink-0 rounded-[6px]"
    />
  );
}
function ArbBadge() {
  return (
    <img
      src={arbBadgeSrc}
      width={22}
      height={22}
      alt="Arbitrum"
      className="shrink-0 rounded-[6px]"
    />
  );
}
function SolBadge() {
  return (
    <img
      src={solBadgeSrc}
      width={22}
      height={22}
      alt="Solana"
      className="shrink-0 rounded-[6px]"
    />
  );
}

// ── Exchange logo icons ─────────────────────────────────────────────────────
function PancakeSwapLogo() {
  return (
    <img
      src={pancakeLogoSrc}
      width={44}
      height={44}
      alt="PancakeSwap"
      className="shrink-0 rounded-full"
    />
  );
}
function RadyiumLogo() {
  return (
    <img
      src={raydiumLogoSrc}
      width={44}
      height={44}
      alt="Raydium"
      className="shrink-0 rounded-full"
    />
  );
}
function WoofLogo() {
  return (
    <img
      src={woofiLogoSrc}
      width={44}
      height={44}
      alt="WOOFi"
      className="shrink-0 rounded-full"
    />
  );
}
function ExternalArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 13L13 3M7 3h6v6"
        stroke="#9c75ff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const BUY_EXCHANGES = [
  {
    name: "Uniswap",
    logo: <UniswapLogo />,
    badge: <EthBadge />,
    url: "https://app.uniswap.org/swap?outputCurrency=ORDER",
  },
  {
    name: "PancakeSwap",
    logo: <PancakeSwapLogo />,
    badge: <EthBadge />,
    url: "https://pancakeswap.finance/swap?outputCurrency=ORDER",
  },
  {
    name: "Camelot",
    logo: (
      <CamelotLogo className="relative size-[44px] shrink-0 rounded-full overflow-hidden" />
    ),
    badge: <ArbBadge />,
    url: "https://app.camelot.exchange/",
  },
  {
    name: "Raydium",
    logo: <RadyiumLogo />,
    badge: <SolBadge />,
    url: "https://raydium.io/swap/",
  },
  {
    name: "WOOFi",
    logo: <WoofLogo />,
    badge: null,
    url: "https://fi.woo.org/",
  },
];

export function BuyOrderModal({ onClose }: { onClose: () => void }) {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-[16px]"
      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 12 }}
        transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
        className="relative bg-[#14151a] rounded-[28px] w-full max-w-[460px] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-[28px] pt-[28px] pb-[20px]">
          <div>
            <h2
              className="text-[24px] text-white tracking-[0.24px]"
              style={{
                fontFamily: "'atyp-bl-variable', 'Atyp BL', sans-serif",
                fontWeight: 700,
              }}
            >
              Buy ORDER
            </h2>
            <p
              className="text-[13px] text-[#9c9fae] mt-[4px] tracking-[0.13px]"
              style={fontRegularBuy}
            >
              Select an exchange to purchase ORDER tokens.
            </p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 ml-[16px] -mt-[2px] -mr-[4px] text-[#9c9fae] hover:text-white hover:bg-white/[0.08] transition-all bg-transparent border-0 cursor-pointer rounded-full p-[8px]"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path
                d="M15 5L5 15M5 5l10 10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div
          className="mx-[28px] h-px"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />

        {/* Exchange list — single column for clean scannability */}
        <div className="px-[20px] py-[16px] flex flex-col gap-[6px]">
          {BUY_EXCHANGES.map((ex) => (
            <a
              key={ex.name}
              href={ex.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[14px] no-underline rounded-[16px] px-[12px] py-[12px] transition-all duration-200 group"
              style={{ background: "transparent" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(156,117,255,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "transparent";
              }}
            >
              {/* Logo with chain badge overlaid at top-left */}
              <div className="relative shrink-0">
                {ex.logo}
                {ex.badge && (
                  <div className="absolute -top-[5px] -left-[5px] z-10 ring-[2px] ring-[#14151a] rounded-[5px]">
                    {ex.badge}
                  </div>
                )}
              </div>

              {/* Exchange name */}
              <span
                className="text-[15px] text-white tracking-[0.01em] flex-1"
                style={fontMediumBuy}
              >
                {ex.name}
              </span>

              {/* External arrow — slides right on hover */}
              <span className="shrink-0 opacity-30 group-hover:opacity-100 group-hover:translate-x-[3px] transition-all duration-200">
                <ExternalArrow />
              </span>
            </a>
          ))}
        </div>

        {/* Bottom padding */}
        <div className="pb-[12px]" />
      </motion.div>
    </motion.div>,
    document.body
  );
}

// ─── Partnership Form Modal ───────────────────────────────────────────────────
// Use Adobe Fonts Typekit font: atyp-bl-variable (weight range: 280-700)
const partnershipFontFeatures = '"ss02", "ss03", "ss05", "ss06"';
const fontRegularPartnership = {
  fontFamily: "'atyp-bl-variable', 'Atyp BL', sans-serif",
  fontWeight: 400,
  fontFeatureSettings: partnershipFontFeatures,
};
const fontMediumPartnership = {
  fontFamily: "'atyp-bl-variable', 'Atyp BL', sans-serif",
  fontWeight: 500,
  fontFeatureSettings: partnershipFontFeatures,
};
const fontBoldPartnership = {
  fontFamily: "'atyp-bl-variable', 'Atyp BL', sans-serif",
  fontWeight: 700,
  fontFeatureSettings: partnershipFontFeatures,
};

export function PartnershipFormModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telegramId: "",
    companyProject: "",
    role: "",
    buildDex: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }
    if (!formData.telegramId.trim()) {
      newErrors.telegramId = "Telegram username is required";
    }
    if (!formData.companyProject.trim()) {
      newErrors.companyProject = "Company / Project is required";
    }
    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
    }
    if (!formData.buildDex.trim()) {
      newErrors.buildDex = "Please select an option";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const COOLDOWN_MS = 60 * 1000;
    const lastSubmit = Number(localStorage.getItem("partnership_last_submit") || 0);
    const remaining = Math.ceil((lastSubmit + COOLDOWN_MS - Date.now()) / 1000);
    if (remaining > 0) {
      setSubmitStatus("error");
      setStatusMessage(`Please wait ${remaining} second(s) before submitting again.`);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/partnerships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          telegramId: formData.telegramId,
          companyProject: formData.companyProject,
          role: formData.role,
          buildDex: formData.buildDex,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("partnership_last_submit", String(Date.now()));
        setSubmitStatus("success");
        setStatusMessage(
          data.message || "Your inquiry has been submitted successfully!"
        );
        // Clear form after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          telegramId: "",
          companyProject: "",
          role: "",
          buildDex: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
        setStatusMessage(
          data.error || "Something went wrong. Please try again."
        );
      }
    } catch {
      setSubmitStatus("error");
      setStatusMessage(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, buildDex: value }));
    if (errors.buildDex) {
      setErrors((prev) => ({ ...prev, buildDex: "" }));
    }
  };

  const inputClassName = (fieldName: string) => `
    w-full px-[16px] py-[14px] rounded-[12px] border bg-[#1a1b20] text-white text-[15px] transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-[#9c75ff]/50 focus:border-[#9c75ff]
    placeholder:text-[#5a5d6e]
    ${
      errors[fieldName]
        ? "border-red-500"
        : "border-white/10 hover:border-white/20"
    }
  `;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-[12px] sm:p-[16px]"
      style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 12 }}
        transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
        className="relative bg-[#14151a] rounded-[20px] sm:rounded-[24px] w-full max-w-[520px] max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[90vh] partnership-scroll">
          {/* Header */}
          <div className="flex items-start justify-between px-[20px] sm:px-[28px] pt-[20px] sm:pt-[28px] pb-[16px] sm:pb-[20px] sticky top-0 bg-[#14151a] z-10">
            <div>
              <h2
                className="text-[24px] text-white tracking-[0.24px]"
                style={{
                  fontFamily: "'atyp-bl-variable', 'Atyp BL', sans-serif",
                  fontWeight: 700,
                }}
              >
                Talk to Partnerships
              </h2>
              <p
                className="text-[13px] text-[#9c9fae] mt-[4px] tracking-[0.13px]"
                style={fontRegularPartnership}
              >
                Tell us about your project and how we can collaborate.
              </p>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 ml-[16px] -mt-[2px] -mr-[4px] text-[#9c9fae] hover:text-white hover:bg-white/[0.08] transition-all bg-transparent border-0 cursor-pointer rounded-full p-[8px]"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path
                  d="M15 5L5 15M5 5l10 10"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className="mx-[20px] sm:mx-[28px] h-px sticky top-[76px] sm:top-[88px] bg-[rgba(255,255,255,0.07)] z-10" />

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="px-[20px] sm:px-[28px] py-[16px] sm:py-[20px]"
          >
            {/* Name Row */}
            <div className="flex flex-col sm:flex-row gap-[12px] sm:gap-[16px] mb-[16px]">
              <div className="flex-1">
                <label
                  className="block text-[13px] text-[#9c9fae] mb-[8px] tracking-[0.13px]"
                  style={fontMediumPartnership}
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  className={inputClassName("firstName")}
                  style={fontRegularPartnership}
                />
                {errors.firstName && (
                  <p
                    className="text-red-500 text-[12px] mt-[6px]"
                    style={fontRegularPartnership}
                  >
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label
                  className="block text-[13px] text-[#9c9fae] mb-[8px] tracking-[0.13px]"
                  style={fontMediumPartnership}
                >
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  className={inputClassName("lastName")}
                  style={fontRegularPartnership}
                />
                {errors.lastName && (
                  <p
                    className="text-red-500 text-[12px] mt-[6px]"
                    style={fontRegularPartnership}
                  >
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="mb-[16px]">
              <label
                className="block text-[13px] text-[#9c9fae] mb-[8px] tracking-[0.13px]"
                style={fontMediumPartnership}
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className={inputClassName("email")}
                style={fontRegularPartnership}
              />
              {errors.email && (
                <p
                  className="text-red-500 text-[12px] mt-[6px]"
                  style={fontRegularPartnership}
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Telegram username */}
            <div className="mb-[16px]">
              <label
                className="block text-[13px] text-[#9c9fae] mb-[8px] tracking-[0.13px]"
                style={fontMediumPartnership}
              >
                Telegram username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="telegramId"
                value={formData.telegramId}
                onChange={handleInputChange}
                placeholder="@username"
                className={inputClassName("telegramId")}
                style={fontRegularPartnership}
              />
              {errors.telegramId && (
                <p
                  className="text-red-500 text-[12px] mt-[6px]"
                  style={fontRegularPartnership}
                >
                  {errors.telegramId}
                </p>
              )}
            </div>

            {/* Company / Project */}
            <div className="mb-[16px]">
              <label
                className="block text-[13px] text-[#9c9fae] mb-[8px] tracking-[0.13px]"
                style={fontMediumPartnership}
              >
                Company / Project <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="companyProject"
                value={formData.companyProject}
                onChange={handleInputChange}
                placeholder="Your company or project name"
                className={inputClassName("companyProject")}
                style={fontRegularPartnership}
              />
              {errors.companyProject && (
                <p
                  className="text-red-500 text-[12px] mt-[6px]"
                  style={fontRegularPartnership}
                >
                  {errors.companyProject}
                </p>
              )}
            </div>

            {/* Role */}
            <div className="mb-[16px]">
              <label
                className="block text-[13px] text-[#9c9fae] mb-[8px] tracking-[0.13px]"
                style={fontMediumPartnership}
              >
                Role <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="Your role (e.g., Founder, BD Manager)"
                className={inputClassName("role")}
                style={fontRegularPartnership}
              />
              {errors.role && (
                <p
                  className="text-red-500 text-[12px] mt-[6px]"
                  style={fontRegularPartnership}
                >
                  {errors.role}
                </p>
              )}
            </div>

            {/* Are you looking to build a DEX? */}
            <div className="mb-[24px]">
              <label
                className="block text-[13px] text-[#9c9fae] mb-[12px] tracking-[0.13px]"
                style={fontMediumPartnership}
              >
                Are you looking to build a DEX?{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-row gap-[10px]">
                {["Yes", "No"].map((option) => (
                  <label
                    key={option}
                    className={`flex-1 flex items-center gap-[10px] px-[16px] py-[12px] rounded-[12px] border cursor-pointer transition-all duration-200 ${
                      formData.buildDex === option
                        ? "border-[#9c75ff] bg-[#9c75ff]/10"
                        : "border-white/10 hover:border-white/20"
                    } ${errors.buildDex ? "border-red-500" : ""}`}
                  >
                    <input
                      type="radio"
                      name="buildDex"
                      value={option}
                      checked={formData.buildDex === option}
                      onChange={() => handleRadioChange(option)}
                      className="hidden"
                    />
                    <div
                      className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        formData.buildDex === option
                          ? "border-[#9c75ff]"
                          : "border-white/40"
                      }`}
                    >
                      {formData.buildDex === option && (
                        <div className="w-[8px] h-[8px] rounded-full bg-[#9c75ff]" />
                      )}
                    </div>
                    <span
                      className="text-white text-[15px]"
                      style={fontRegularPartnership}
                    >
                      {option}
                    </span>
                  </label>
                ))}
              </div>
              {errors.buildDex && (
                <p
                  className="text-red-500 text-[12px] mt-[6px]"
                  style={fontRegularPartnership}
                >
                  {errors.buildDex}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="mb-[24px]">
              <label
                className="block text-[13px] text-[#9c9fae] mb-[8px] tracking-[0.13px]"
                style={fontMediumPartnership}
              >
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your project and how you'd like to partner with Orderly..."
                rows={4}
                className={`${inputClassName("message")} resize-none`}
                style={fontRegularPartnership}
              />
              {errors.message && (
                <p
                  className="text-red-500 text-[12px] mt-[6px]"
                  style={fontRegularPartnership}
                >
                  {errors.message}
                </p>
              )}
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="mb-[20px] p-[16px] rounded-[12px] bg-green-500/10 border border-green-500/20">
                <p
                  className="text-green-400 text-[14px]"
                  style={fontMediumPartnership}
                >
                  ✓ {statusMessage}
                </p>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="mb-[20px] p-[16px] rounded-[12px] bg-red-500/10 border border-red-500/20">
                <p
                  className="text-red-400 text-[14px]"
                  style={fontMediumPartnership}
                >
                  ✗ {statusMessage}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-[14px] sm:py-[16px] rounded-[24px] bg-[#6700ce] text-white text-[15px] sm:text-[16px] font-semibold tracking-[0.16px] transition-all duration-200 hover:bg-[#7a00f0] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#6700ce]"
              style={{
                fontFamily: "'atyp-bl-variable', 'Atyp BL', sans-serif",
                fontWeight: 700,
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-[10px]">
                  <svg
                    className="animate-spin h-[18px] w-[18px] text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Submit Inquiry"
              )}
            </button>

            {/* Privacy note */}
            <p
              className="text-center text-[12px] text-[#5a5d6e] mt-[16px] tracking-[0.12px]"
              style={fontRegularPartnership}
            >
              By submitting, you agree to our privacy policy.
            </p>
          </form>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}
// ─────────────────────────────────────────────────────────────────────────────

export function BackgroundVector() {
  return (
    <div className="relative size-full" data-name="Background Vector">
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 410.8 411.123"
      >
        <g id="Background Vector">
          <path
            clipRule="evenodd"
            d={svgPaths.p35ce3400}
            fill="var(--fill-0, #3F0086)"
            fillRule="evenodd"
            id="Vector"
          />
          <path
            clipRule="evenodd"
            d={svgPaths.p2dfaa900}
            fill="var(--fill-0, #3F0086)"
            fillRule="evenodd"
            id="Vector_2"
          />
          <path
            clipRule="evenodd"
            d={svgPaths.p224a2400}
            fill="var(--fill-0, #3F0086)"
            fillRule="evenodd"
            id="Vector_3"
          />
          <path
            clipRule="evenodd"
            d={svgPaths.p17eb8e00}
            fill="var(--fill-0, #3F0086)"
            fillRule="evenodd"
            id="Vector_4"
          />
        </g>
      </svg>
    </div>
  );
}

export function BackgroundVector1() {
  return (
    <div className="relative size-full" data-name="Background Vector">
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 268.648 268.859"
      >
        <g id="Background Vector">
          <path
            clipRule="evenodd"
            d={svgPaths.p14311f80}
            fill="var(--fill-0, #9C75FF)"
            fillRule="evenodd"
            id="Vector"
          />
          <path
            clipRule="evenodd"
            d={svgPaths.p3f344f00}
            fill="var(--fill-0, #9C75FF)"
            fillRule="evenodd"
            id="Vector_2"
          />
          <path
            clipRule="evenodd"
            d={svgPaths.p30ec3400}
            fill="var(--fill-0, #9C75FF)"
            fillRule="evenodd"
            id="Vector_3"
          />
          <path
            clipRule="evenodd"
            d={svgPaths.p381f300}
            fill="var(--fill-0, #9C75FF)"
            fillRule="evenodd"
            id="Vector_4"
          />
        </g>
      </svg>
    </div>
  );
}

export function HeaderLogo() {
  return (
    <Link
      href="/"
      className="h-[29.999px] relative shrink-0 w-[110.959px] block hover:opacity-80 transition-opacity"
      data-name="Header Logo"
    >
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 110.959 30"
      >
        <g id="Header Logo">
          <g id="Header Logo Icon">
            <path
              clipRule="evenodd"
              d={svgPaths.p2e91d6c0}
              fill="var(--fill-0, white)"
              fillRule="evenodd"
              id="Vector"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.p1cb01400}
              fill="var(--fill-0, white)"
              fillRule="evenodd"
              id="Vector_2"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.p372a0f80}
              fill="var(--fill-0, white)"
              fillRule="evenodd"
              id="Vector_3"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.p36527e00}
              fill="var(--fill-0, white)"
              fillRule="evenodd"
              id="Vector_4"
            />
          </g>
          <g id="Orderly">
            <path d={svgPaths.p9fe1400} fill="var(--fill-0, white)" />
            <path d={svgPaths.p29849280} fill="var(--fill-0, white)" />
            <path d={svgPaths.p62d8980} fill="var(--fill-0, white)" />
            <path d={svgPaths.p11866a00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p18cd57f0} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3eee1700} fill="var(--fill-0, white)" />
          </g>
        </g>
      </svg>
    </Link>
  );
}

function HeaderLogoContainer() {
  return (
    <div
      className="content-stretch flex flex-col h-[50px] items-start justify-center relative shrink-0"
      data-name="Header Logo Container"
    >
      <HeaderLogo />
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <div
      className={`overflow-clip relative shrink-0 size-[12px] transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      data-name="Header Menu Item Icon"
    >
      <div className="-translate-y-1/2 absolute flex h-[7.778px] items-center justify-center left-[17.68%] right-[17.5%] top-[calc(50%-1.63px)]">
        <div className="-rotate-45 flex-none size-[5.5px]">
          <div className="relative size-full">
            <div className="absolute inset-[0_0_-13.64%_-13.64%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 6.25 6.25"
              >
                <path
                  d={svgPaths.p3b158500}
                  id="Vector 10"
                  stroke="var(--stroke-0, white)"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type DropdownItem = { label: string; href: string };
type CampaignDropdownItem = {
  href: string;
  status: "Ongoing" | "Ended";
  backgroundImageSrc: string;
  backgroundImageClassName: string;
  borderClassName: string;
  subtitle?: string;
  titleVariant: "perps" | "ucc";
};

function labelToKey(label: string) {
  return label.toLowerCase().replace(/\s+/g, "_");
}

function useMenuHover() {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleEnter = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const handleLeave = () => {
    timer.current = setTimeout(() => setOpen(false), 120);
  };
  return { open, handleEnter, handleLeave };
}

function DropdownPanel({
  items,
  onEnter,
  onLeave,
  groupKey,
}: {
  items: DropdownItem[];
  onEnter: () => void;
  onLeave: () => void;
  groupKey: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
      className="absolute top-full left-0 z-50 pt-[4px]"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="bg-[#3f0086] flex flex-col gap-[15px] items-start justify-center px-[15px] py-[20px] rounded-[8px] min-w-[160px]">
        {items.map((item) => {
          const isInternal = item.href.startsWith("/");
          const linkClass =
            "content-stretch flex items-center relative shrink-0 w-full no-underline group";
          const inner = (
            <p
              className="font-['Atyp_BL:Regular',sans-serif] font-normal leading-[1.6] relative shrink-0 text-[14px] text-white group-hover:text-purple-300 transition-colors"
              style={{ letterSpacing: "0.042em" }}
            >
              {item.label}
            </p>
          );
          const trackClick = () =>
            posthog.capture("header_nav_clicked", {
              tab_name: `${groupKey}_${labelToKey(item.label)}`,
              source_page: "homepage",
              device_layout: "desktop",
              section: "header",
            });
          return isInternal ? (
            <Link
              key={item.label}
              href={item.href}
              className={linkClass}
              onClick={trackClick}
            >
              {inner}
            </Link>
          ) : (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              onClick={trackClick}
            >
              {inner}
            </a>
          );
        })}
      </div>
    </motion.div>
  );
}

export function CampaignIcon({ className = "" }: { className?: string }) {
  const gradientId = useId().replace(/:/g, "");
  return (
    <svg
      width="8"
      height="11"
      viewBox="0 0 8 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: "scale(1.3)" }}
      aria-hidden
    >
      <path
        d="M0.000489424 6.785C-0.00634591 5.73247 0.369598 4.79952 1.04416 3.96991C1.42095 3.50697 1.85329 3.09279 2.25144 2.64902C2.571 2.29275 2.86363 1.91857 3.04264 1.47147C3.21224 1.04646 3.24727 0.609775 3.17293 0.162259C3.1708 0.148508 3.16695 0.135174 3.16567 0.121423C3.16268 0.0805887 3.14986 0.0372538 3.19814 0.00975272C3.24086 -0.0144149 3.27205 0.0114195 3.30494 0.0322536C3.55742 0.190176 3.7911 0.371433 4.00513 0.576441C4.59553 1.14105 4.96593 1.81441 5.07828 2.61985C5.13553 3.02987 5.0817 3.42863 4.99454 3.82781C4.94627 4.04866 4.90441 4.27283 4.95097 4.49826C5.03556 4.90702 5.44995 5.2287 5.87587 5.22453C6.31975 5.22037 6.70895 4.90577 6.79608 4.48201C6.81788 4.37533 6.81828 4.26825 6.81362 4.16075C6.81149 4.11074 6.79008 4.04991 6.85928 4.02657C6.92808 4.00365 6.95115 4.06616 6.98148 4.10491C7.32455 4.54409 7.55695 5.03536 7.70222 5.56705C8.00549 6.67873 7.92308 7.75047 7.30488 8.74887C6.63588 9.82927 5.65757 10.4797 4.36698 10.6381C2.34159 10.8869 0.414878 9.48427 0.0632914 7.52507C0.0201408 7.2846 -0.00378258 7.0438 0.000489424 6.785ZM3.46813 5.80247C3.47711 5.6558 3.48565 5.51038 3.49505 5.36496C3.49804 5.32121 3.49718 5.27995 3.44848 5.25953C3.4032 5.24037 3.37458 5.27121 3.34638 5.29704C3.02469 5.59788 2.71966 5.91248 2.47018 6.27457C2.05706 6.8742 1.86653 7.5346 1.99426 8.24967C2.13012 9.01133 2.60047 9.53133 3.3562 9.76013C4.1239 9.9926 4.81298 9.80473 5.36322 9.23553C5.91048 8.66967 6.04209 7.99753 5.78915 7.25793C5.74173 7.1192 5.70798 7.1138 5.58879 7.21087C4.94157 7.7388 3.97566 7.52673 3.62279 6.78C3.4754 6.46791 3.47241 6.13498 3.46813 5.80247Z"
        fill={`url(#${gradientId})`}
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="7.87286"
          y1="9.62963"
          x2="6.93561e-05"
          y2="9.60621"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#48BDFF" />
          <stop offset="0.479167" stopColor="#786CFF" />
          <stop offset="1" stopColor="#BD00FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CampaignsDropdownPanel({
  onEnter,
  onLeave,
}: {
  onEnter: () => void;
  onLeave: () => void;
}) {
  const items = CAMPAIGN_ITEMS;

  return (
    <motion.div
      className="absolute top-full left-0 z-50 pt-[8px]"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.16, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <div className="w-[320px] rounded-lg bg-[#38235D33] p-2 backdrop-blur-[25px]">
        <div className="flex flex-col gap-[16px] rounded-[8px] bg-[#1e122f] p-[16px] shadow-[4px_4px_24px_0px_rgba(17,6,33,0.8)]">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative h-[80px] w-full overflow-hidden rounded-[8px] border no-underline transition-opacity hover:opacity-90"
              onClick={() =>
                posthog.capture("header_nav_clicked", {
                  tab_name: `campaigns_${item.titleVariant}`,
                  source_page: "homepage",
                  device_layout: "desktop",
                  section: "header",
                })
              }
            >
              {/* Background image */}
              <div
                className="absolute inset-0 opacity-20 overflow-hidden pointer-events-none rounded-[8px]"
                aria-hidden
              >
                <img
                  alt=""
                  className={item.backgroundImageClassName}
                  src={item.backgroundImageSrc}
                />
              </div>

              {/* Border layer */}
              <div aria-hidden className={item.borderClassName} />

              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex gap-[8px] items-center p-[16px] relative size-full flex-1">
                  {item.titleVariant === "perps" ? (
                    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0">
                      <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-h-px min-w-px not-italic relative shrink-0">
                        <p
                          className="font-['Atyp_BL:Regular',sans-serif] font-normal leading-[1.6] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.98)] w-full flex items-center gap-1"
                          style={{ letterSpacing: "0.042em" }}
                        >
                          I{" "}
                          <img
                            src="/campaigns/icons/heart-o.svg"
                            alt="heart"
                            className="h-[1em] w-[1em] inline"
                          />{" "}
                          Perps Competition
                        </p>
                        <p className="font-['Atyp_BL:Regular',sans-serif] font-normal leading-[1.6] relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] w-full">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0">
                      <p
                        className="font-['Atyp_BL:Regular',sans-serif] font-normal leading-[1.6] h-full not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] w-[256px]"
                        style={{ letterSpacing: "0.042em" }}
                      >
                        Ultimate Crypto Championship
                      </p>
                    </div>
                  )}

                  {/* Status badge */}
                  {item.status === "Ongoing" ? (
                    <div
                      className="absolute content-stretch flex items-center justify-center px-[8px] py-[4px] right-0 rounded-bl-[8px] rounded-tr-[8px] top-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(-89.3303deg, rgb(72, 189, 255) 0%, rgb(120, 108, 255) 47.763%, rgb(189, 0, 255) 99.638%)",
                      }}
                    >
                      <p className="font-['Atyp_BL:Regular',sans-serif] font-normal leading-[1.6] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.98)] text-nowrap">
                        Ongoing
                      </p>
                    </div>
                  ) : (
                    <div className="absolute bg-[rgba(255,255,255,0.36)] content-stretch flex items-center justify-center px-[8px] py-[4px] right-0 rounded-bl-[8px] rounded-tr-[8px] top-0">
                      <p className="font-['Atyp_BL:Regular',sans-serif] font-normal leading-[1.6] not-italic relative shrink-0 text-[10px] text-[rgba(255,255,255,0.98)] text-nowrap">
                        Ended
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function CampaignsMenuCell() {
  const { open, handleEnter, handleLeave } = useMenuHover();
  const [isHovered, setIsHovered] = useState(false);
  const shouldOpen = open || isHovered;

  return (
    <div
      className="content-stretch relative flex h-[50px] shrink-0 cursor-pointer items-center gap-[2px]"
      data-name="Campaigns Menu Cell"
      onMouseEnter={() => {
        setIsHovered(true);
        handleEnter();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        handleLeave();
      }}
    >
      <a
        href={CAMPAIGNS_LINK.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-[32px] items-center justify-center gap-[6px] rounded-full px-[14px] no-underline overflow-hidden"
        onClick={() =>
          posthog.capture("header_nav_clicked", {
            tab_name: "campaigns",
            source_page: "homepage",
            device_layout: "desktop",
            section: "header",
          })
        }
      >
        {/* Animated gradient border - no fill background */}
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, #48bdff, #786cff, #bd00ff, #48bdff)",
            backgroundSize: "300% 100%",
            animation: "gradient-border 3s linear infinite",
            padding: "1px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
        <CampaignIcon className="mr-1 relative z-10" />
        <span
          className="font-['Atyp_Text:Medium',sans-serif] text-[16px] leading-none not-italic text-white relative z-10"
          style={{ letterSpacing: "0.042em" }}
        >
          Campaigns
        </span>
        <span className="relative z-10">
          <ChevronIcon open={shouldOpen} />
        </span>
      </a>
      <AnimatePresence>
        {shouldOpen && (
          <CampaignsDropdownPanel onEnter={handleEnter} onLeave={handleLeave} />
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuCell() {
  const { open, handleEnter, handleLeave } = useMenuHover();
  return (
    <div
      className="content-stretch flex gap-[2px] h-[50px] items-baseline pb-[10px] pt-[16px] relative shrink-0 cursor-pointer"
      data-name="Menu cell"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        className="content-stretch flex flex-col items-start justify-center relative shrink-0"
        data-name="Header Menu Item"
      >
        <div
          className="content-stretch flex items-center relative shrink-0"
          data-name="Header Menu Item Text"
        >
          <p
            className="font-['Atyp_Text:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[16px] text-center text-white"
            style={{ letterSpacing: "0.042em" }}
          >
            Builders
          </p>
        </div>
      </div>
      <ChevronIcon open={open} />
      <AnimatePresence>
        {open && (
          <DropdownPanel
            onEnter={handleEnter}
            onLeave={handleLeave}
            groupKey="builders"
            items={HEADER_NAV.Builders}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuCell1() {
  const { open, handleEnter, handleLeave } = useMenuHover();
  return (
    <div
      className="content-stretch flex gap-[2px] h-[50px] items-baseline pb-[10px] pt-[16px] relative shrink-0 cursor-pointer"
      data-name="Menu cell"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        className="content-stretch flex flex-col items-start justify-center relative shrink-0"
        data-name="Header Menu Item"
      >
        <div
          className="content-stretch flex gap-[2px] items-center relative shrink-0"
          data-name="Header Menu Item Text"
        >
          <p
            className="font-['Atyp_Text:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[16px] text-center text-white"
            style={{ letterSpacing: "0.042em" }}
          >
            Ecosystem
          </p>
        </div>
      </div>
      <ChevronIcon open={open} />
      <AnimatePresence>
        {open && (
          <DropdownPanel
            onEnter={handleEnter}
            onLeave={handleLeave}
            groupKey="ecosystem"
            items={HEADER_NAV.Ecosystem}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuCell2() {
  const { open, handleEnter, handleLeave } = useMenuHover();
  return (
    <div
      className="content-stretch flex gap-[2px] h-[50px] items-baseline pb-[10px] pt-[16px] relative shrink-0 cursor-pointer"
      data-name="Menu cell"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        className="content-stretch flex flex-col items-start justify-center relative shrink-0"
        data-name="Header Menu Item"
      >
        <div
          className="content-stretch flex gap-[2px] items-center relative shrink-0"
          data-name="Header Menu Item Text"
        >
          <p
            className="font-['Atyp_Text:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[16px] text-center text-white"
            style={{ letterSpacing: "0.042em" }}
          >
            Traders
          </p>
        </div>
      </div>
      <ChevronIcon open={open} />
      <AnimatePresence>
        {open && (
          <DropdownPanel
            onEnter={handleEnter}
            onLeave={handleLeave}
            groupKey="traders"
            items={HEADER_NAV.Traders}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function HeaderMenuItemText3() {
  return (
    <div
      className="content-stretch flex gap-[2px] items-center relative shrink-0"
      data-name="Header Menu Item Text"
    >
      <p className="font-['Atyp_Text:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[16px] text-center text-white">
        Docs
      </p>
    </div>
  );
}

function HeaderMenuItem3() {
  return (
    <div
      className="content-stretch flex flex-col items-start justify-center relative shrink-0"
      data-name="Header Menu Item"
    >
      <HeaderMenuItemText3 />
    </div>
  );
}

function MenuCell3() {
  return (
    <a
      href={DOCS_LINK.href}
      target="_blank"
      rel="noopener noreferrer"
      className="content-stretch flex h-[50px] items-baseline pb-[10px] pt-[16px] relative shrink-0 no-underline"
      data-name="Menu cell"
      onClick={() =>
        posthog.capture("header_nav_clicked", {
          tab_name: "docs",
          source_page: "homepage",
          device_layout: "desktop",
          section: "header",
        })
      }
    >
      <HeaderMenuItem3 />
    </a>
  );
}
function HeaderMenu() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] gap-[48px] items-center justify-end min-h-px min-w-px relative"
      data-name="Header Menu"
    >
      <MenuCell />
      <MenuCell1 />
      <MenuCell2 />
      <MenuCell3 />
      <CampaignsMenuCell />

      <a
        href={HEADER_CTA.href}
        target="_blank"
        rel="noopener noreferrer"
        className="content-stretch flex h-[40px] items-center justify-center px-[20px] py-[12px] relative rounded-[46px] shrink-0 no-underline hover:opacity-90 transition-opacity"
        data-name="Button"
        onClick={() => {
          posthog.capture("homepage_cta_clicked", {
            cta_name: "launch_now",
            source_page: "homepage",
            device_layout: "desktop",
          });
        }}
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%), linear-gradient(-89.1975deg, rgb(72, 189, 255) 0%, rgb(120, 108, 255) 47.763%, rgb(189, 0, 255) 99.638%)",
        }}
      >
        <p
          className="font-['Atyp_BL:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[#3f0086] text-[16px] tracking-[0.16px]"
          style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05'" }}
        >
          {HEADER_CTA.label}
        </p>
      </a>
    </div>
  );
}

function Default() {
  return (
    <div
      className="absolute backdrop-blur-[8.65px] content-stretch flex gap-[58px] h-[100px] items-center left-[81.9px] p-[40px] rounded-[130px] top-[50px] w-[1278px] z-[100]"
      data-name="Default"
    >
      <HeaderLogoContainer />
      <HeaderMenu />
    </div>
  );
}

// ─── Morphing Header: hides on scroll, shows when scroll stops ────────────────
export function MorphingHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);
  
  // Threshold for "top of page" - below this, header always stays visible
  const TOP_THRESHOLD = 150;
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if we've scrolled past threshold for background style
      setIsScrolled(currentScrollY > 50);
      
      // At top of page: always show header, don't hide
      if (currentScrollY < TOP_THRESHOLD) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }
      
      // Hide header when scrolling (only when past top threshold)
      if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
        setIsVisible(false);
      }
      lastScrollY.current = currentScrollY;
      
      // Clear existing timer
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
      
      // Show header after scroll stops (1s delay - wait before reappearing)
      scrollTimerRef.current = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);
  
  return (
    <motion.header
      className="flex h-[72px] items-center w-full"
      style={{
        borderRadius: 80,
        maxWidth: 1100,
        marginTop: 24,
        paddingLeft: 24,
        paddingRight: 20,
        gap: 40,
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        backgroundColor: isScrolled 
          ? "rgba(0, 0, 0, 0.3)" 
          : "rgba(0, 0, 0, 0.15)",
        border: "none",
        boxShadow: isScrolled 
          ? "0 8px 32px rgba(0,0,0,0.3)" 
          : "0 4px 24px rgba(0,0,0,0.15)",
      }}
      initial={{ y: 0, opacity: 1 }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ 
        duration: 0.6, 
        ease: [0.22, 0.61, 0.36, 1] 
      }}
    >
      {/* Logo container */}
      <div className="flex flex-col justify-center shrink-0" style={{ transform: "scale(0.85)", transformOrigin: "left center" }}>
        <HeaderLogo />
      </div>
      
      {/* Menu - maintains flex grow to push items right */}
      <div className="flex-1">
        <HeaderMenu />
      </div>
    </motion.header>
  );
}

function HeroTextContainer() {
  return (
    <div
      className="content-stretch flex flex-col gap-[12px] items-center justify-center relative shrink-0 text-center text-white w-full whitespace-nowrap"
      data-name="Hero Text Container"
    >
      <div
        className="font-['Atyp_BL:Display_-_Bold',sans-serif] font-bold leading-none relative shrink-0 text-[96px]"
        style={{
          fontVariationSettings: "'ital' 0, 'opsz' 72",
          fontFeatureSettings: "'ss02', 'ss03', 'ss05'",
        }}
      >
        <p className="mb-0">LAUNCH YOUR</p>
        <p>OWN PERP DEX</p>
      </div>
      <div
        className="font-['Atyp_BL:Medium',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[24px]"
        style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
      >
        <p className="mb-0">{`Launch a perpetuals DEX on any chain — for humans and agents`}</p>
        <p>with shared liquidity, zero infra cost, and fees that go to you.</p>
      </div>
    </div>
  );
}

function HeroButtonsContainer({
  onOpenModal,
  onOpenPartnershipModal,
}: {
  onOpenModal: () => void;
  onOpenPartnershipModal: () => void;
}) {
  return (
    <div
      className="content-stretch flex gap-[16px] items-start relative shrink-0"
      data-name="Hero Buttons Container"
    >
      <a
        href="https://dex.orderly.network/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#6700ce] content-stretch flex h-[52px] items-center justify-center px-[24px] py-[12px] relative rounded-[24px] shrink-0 no-underline hover:opacity-90 transition-opacity"
        data-name="build with orderly"
        onClick={() => {
          posthog.capture("homepage_cta_clicked", {
            cta_name: "start_building",
            source_page: "homepage",
            device_layout: "desktop",
          });
        }}
      >
        <p
          className="font-['Atyp_BL:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[16px] text-white"
          style={{
            fontFamily: "'atyp-bl-variable', 'atyp-bl', sans-serif",
            letterSpacing: "0.01em",
            fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06', 'liga' 0",
          }}
        >
          Start Building
        </p>
      </a>
      <button
        onClick={() => {
          posthog.capture("homepage_cta_clicked", {
            cta_name: "talk_to_partnerships",
            source_page: "homepage",
            device_layout: "desktop",
          });
          onOpenPartnershipModal();
        }}
        className="content-stretch flex h-[52px] items-center justify-center pl-[24px] pr-[20px] py-[12px] relative rounded-[24px] shrink-0 hover:bg-white/10 transition-colors bg-transparent border-0 cursor-pointer"
        data-name="Talk to Partnerships"
      >
        <div
          aria-hidden="true"
          className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[24px]"
        />
        <p
          className="font-['Atyp_BL:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[16px] text-white tracking-[0.16px]"
          style={{
            fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06', 'liga' 0",
          }}
        >
          Talk to Partnerships
        </p>
      </button>
    </div>
  );
}

function Frame({
  onOpenModal,
  onOpenPartnershipModal,
}: {
  onOpenModal: () => void;
  onOpenPartnershipModal: () => void;
}) {
  return (
    <div
      className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[40px] items-center justify-center left-[calc(50%-0.1px)] pl-[100px] pr-[80px] top-[201.78px] w-[1440px]"
      data-name="Frame"
    >
      <HeroTextContainer />
      <HeroButtonsContainer
        onOpenModal={onOpenModal}
        onOpenPartnershipModal={onOpenPartnershipModal}
      />
    </div>
  );
}

function FeatureTag() {
  return (
    <div
      className="absolute backdrop-blur-[30px] bg-gradient-to-t content-stretch flex from-[39.314%] from-[rgba(156,117,255,0.6)] gap-[10px] items-center justify-center left-[1016px] px-[28px] py-[20px] rounded-[124px] to-[rgba(156,117,255,0)] top-[700px]"
      data-name="Feature Tag"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none rounded-[124px] shadow-[14px_18px_30px_0px_rgba(0,0,0,0.1)]"
        style={{
          padding: '2px',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0))',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMaskComposite: 'xor',
        }}
      />
      <div className="relative shrink-0 size-[11px]">
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14.418 14.418"
        >
          <g id="Ellipse 6009">
            <circle
              cx="7.20898"
              cy="7.20898"
              fill="var(--fill-0, #FF375B)"
              r="7.20898"
            />
            <circle
              cx="7.20898"
              cy="7.20898"
              fill="var(--fill-1, #44DED3)"
              r="7.20898"
            />
          </g>
        </svg>
      </div>
      <p
        className="capitalize font-['Atyp_BL:Semibold',sans-serif] leading-none not-italic relative shrink-0 text-[18px] text-white"
        style={{ fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06'" }}
      >
        Deep Liquidity
      </p>
    </div>
  );
}

function FeatureTag1() {
  return (
    <div
      className="absolute backdrop-blur-[30px] bg-gradient-to-t content-stretch flex from-[39.314%] from-[rgba(156,117,255,0.6)] gap-[10px] items-center justify-center left-[992px] px-[28px] py-[20px] rounded-[124px] to-[rgba(156,117,255,0)] top-[1070px]"
      data-name="Feature Tag"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none rounded-[124px] shadow-[14px_18px_30px_0px_rgba(0,0,0,0.1)]"
        style={{
          padding: '2px',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0))',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMaskComposite: 'xor',
        }}
      />
      <div className="relative shrink-0 size-[11px]">
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14.418 14.418"
        >
          <circle
            cx="7.20898"
            cy="7.20898"
            fill="var(--fill-0, #44DED3)"
            id="Ellipse 6009"
            r="7.20898"
          />
        </svg>
      </div>
      <p
        className="font-['Atyp_BL:Semibold',sans-serif] leading-none not-italic relative shrink-0 text-[18px] text-white"
        style={{ fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06'" }}
      >
        Customizable
      </p>
    </div>
  );
}

function FeatureTag2() {
  return (
    <div
      className="absolute backdrop-blur-[30px] bg-gradient-to-t content-stretch flex from-[rgba(156,117,255,0.6)] gap-[10px] items-center justify-center left-[184px] px-[28px] py-[20px] rounded-[124px] to-[133%] to-[rgba(156,117,255,0)] top-[1021px]"
      data-name="Feature Tag"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none rounded-[124px] shadow-[14px_18px_30px_0px_rgba(0,0,0,0.1)]"
        style={{
          padding: '2px',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0))',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMaskComposite: 'xor',
        }}
      />
      <div className="relative shrink-0 size-[11px]">
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14.418 14.418"
        >
          <circle
            cx="7.20898"
            cy="7.20898"
            fill="var(--fill-0, #44DED3)"
            id="Ellipse 6009"
            r="7.20898"
          />
        </svg>
      </div>
      <p
        className="capitalize font-['Atyp_BL:Semibold',sans-serif] leading-none not-italic relative shrink-0 text-[18px] text-white"
        style={{ fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06'" }}
      >
        No-code
      </p>
    </div>
  );
}

function TrustedHeader() {
  return (
    <div
      className="content-stretch flex flex-col gap-[23px] items-start not-italic relative shrink-0 text-white w-[949px] whitespace-pre-wrap"
      data-name="Trusted Header"
    >
      <p
        className="font-['Atyp_BL:Display_-_Bold',sans-serif] leading-[1.1] min-w-full relative shrink-0 text-[56px] w-[min-content]"
        style={{
          fontVariationSettings: "'ital' 0, 'opsz' 72",
          fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'",
        }}
      >
        Trusted by builders you know
      </p>
      <p
        className="font-['Atyp_BL:Medium',sans-serif] leading-[1.4] relative shrink-0 text-[24px] tracking-[0.504px] w-[1305.965px]"
        style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
      >
        DEXs and protocols powered by the Orderly omnichain infrastructure.
      </p>
    </div>
  );
}

function Group() {
  return (
    <div
      className="absolute inset-[15.28%_20.97%_17.5%_22.72%] mask-intersect mask-luminance mask-no-clip mask-no-repeat mask-position-[-9.813px_-3.84px] mask-size-[63.028px_63.232px]"
      data-name="Group"
      style={{ maskImage: `url('${imgGroup}')` }}
    >
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 28.1566 33.6088"
      >
        <g id="Group">
          <path
            d={svgPaths.p25752680}
            fill="var(--fill-0, black)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function MaskGroup() {
  return (
    <div
      className="absolute contents inset-[10.48%_10.76%_10.48%_10.45%]"
      data-name="Mask group"
    >
      <Group />
    </div>
  );
}

function LogoContainer() {
  return (
    <div
      className="bg-[#eda320] content-stretch flex flex-col items-center justify-center relative rounded-[60px] shrink-0 size-[64px]"
      data-name="Logo Container"
    >
      <div className="relative shrink-0 size-[50px]" data-name="logos">
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 50 50"
        >
          <path
            d={svgPaths.p159d700}
            fill="var(--fill-0, #EDA320)"
            id="Vector"
          />
        </svg>
        <MaskGroup />
      </div>
    </div>
  );
}

function DexCard() {
  return (
    <a
      href="https://perps.kodiak.finance/"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[rgba(20,21,26,0.7)] flex-[1_0_0] min-h-px min-w-[280px] relative rounded-[5px] border border-transparent hover:border-[rgba(103,0,206,0.5)] hover:bg-[rgba(103,0,206,0.15)] hover:shadow-[0_0_24px_rgba(103,0,206,0.22)] transition-all duration-300 cursor-pointer"
      data-name="DEX Card"
    >
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex gap-[16px] items-center justify-center min-w-[inherit] p-[20px] relative w-full">
          <img
            src="/images/logos/kodiak.jpg"
            width={64}
            height={64}
            alt="Kodiak"
            className="shrink-0 rounded-full"
          />
          <div
            className="content-stretch flex flex-col items-start relative shrink-0"
            data-name="Product Info"
          >
            <p
              className="font-['Atyp_BL:Semibold',sans-serif] leading-none not-italic relative shrink-0 text-[24px] text-white"
              style={{
                fontFeatureSettings:
                  "'ss02', 'ss03', 'ss05', 'ss06', 'lnum', 'pnum'",
              }}
            >
              Kodiak
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}

function LogoContainer1() {
  return (
    <div
      className="bg-[#00a9de] content-stretch flex flex-col items-center justify-center relative rounded-[60px] shrink-0 size-[64px]"
      data-name="Logo Container"
    >
      <div className="h-[24px] relative shrink-0 w-[36px]" data-name="logos">
        <div className="absolute inset-[0_25.05%_0_0.77%]" data-name="Vector">
          <svg
            className="absolute block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 26.7046 24"
          >
            <path
              d={svgPaths.p242db200}
              fill="var(--fill-0, black)"
              id="Vector"
            />
          </svg>
        </div>
        <div
          className="absolute inset-[40.38%_9.01%_0_60.21%]"
          data-name="Vector"
        >
          <svg
            className="absolute block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 11.0815 14.3077"
          >
            <path
              d={svgPaths.p2902e6c0}
              fill="var(--fill-0, black)"
              id="Vector"
            />
          </svg>
        </div>
        <div
          className="absolute inset-[0_0.78%_75.96%_77.55%]"
          data-name="Vector"
        >
          <svg
            className="absolute block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 7.79999 5.76923"
          >
            <path
              d={svgPaths.p16602b80}
              fill="var(--fill-0, black)"
              id="Vector"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ProductInfo1() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Product Info"
    >
      <p
        className="font-['Atyp_BL:Semibold',sans-serif] leading-none not-italic relative shrink-0 text-[24px] text-white"
        style={{
          fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06', 'lnum', 'pnum'",
        }}
      >
        WOOFi Pro
      </p>
    </div>
  );
}

function DexCard1() {
  return (
    <a
      href="https://pro.woofi.com"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[rgba(20,21,26,0.7)] flex-[1_0_0] min-h-px min-w-[280px] relative rounded-[5px] border border-transparent hover:border-[rgba(103,0,206,0.5)] hover:bg-[rgba(103,0,206,0.15)] hover:shadow-[0_0_24px_rgba(103,0,206,0.22)] transition-all duration-300 cursor-pointer"
      data-name="DEX Card"
    >
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex gap-[16px] items-center justify-center min-w-[inherit] p-[20px] relative w-full">
          <LogoContainer1 />
          <ProductInfo1 />
        </div>
      </div>
    </a>
  );
}

function Group4() {
  return (
    <div
      className="absolute inset-[33.13%_35.93%_33.21%_36.48%]"
      data-name="Group"
    >
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 17.6594 21.5469"
      >
        <g id="Group">
          <path
            d={svgPaths.p32925072}
            fill="url(#paint0_linear_1_1105)"
            id="Vector"
          />
        </g>
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_1_1105"
            x1="-13.8901"
            x2="28.033"
            y1="19.8203"
            y2="-4.64515"
          >
            <stop stopColor="#4ECDC4" />
            <stop offset="0.4946" stopColor="#3772FF" />
            <stop offset="1" stopColor="#C200FB" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div
      className="absolute contents inset-[33.13%_35.93%_33.21%_36.48%]"
      data-name="Group"
    >
      <Group4 />
    </div>
  );
}

function Group6() {
  return (
    <div
      className="absolute inset-[57.52%_36.14%_33.62%_53.54%]"
      data-name="Group"
    >
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 6.60568 5.67255"
      >
        <g id="Group">
          <path
            d={svgPaths.p37222c00}
            fill="url(#paint0_linear_1_1110)"
            id="Vector"
          />
        </g>
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_1_1110"
            x1="-18.1154"
            x2="23.8085"
            y1="15.6861"
            y2="-8.77976"
          >
            <stop stopColor="#4ECDC4" />
            <stop offset="0.4946" stopColor="#3772FF" />
            <stop offset="1" stopColor="#C200FB" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Group5() {
  return (
    <div
      className="absolute contents inset-[57.52%_36.14%_33.62%_53.54%]"
      data-name="Group"
    >
      <Group6 />
    </div>
  );
}

function Group2() {
  return (
    <div
      className="absolute contents inset-[33.13%_35.93%_33.21%_36.48%]"
      data-name="Group"
    >
      <Group3 />
      <Group5 />
    </div>
  );
}

function Group7() {
  return (
    <div
      className="absolute inset-[11.3%_17.12%_12.08%_16.52%]"
      data-name="Group"
    >
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 42.4704 49.0355"
      >
        <g id="Group">
          <path
            d={svgPaths.p9524100}
            fill="url(#paint0_linear_1_1193)"
            id="Vector"
          />
          <g id="Group_2">
            <path
              d={svgPaths.p1e2ecf00}
              fill="url(#paint1_linear_1_1193)"
              id="Vector_2"
            />
          </g>
        </g>
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_1_1193"
            x1="0.525762"
            x2="42.4492"
            y1="36.6041"
            y2="12.1385"
          >
            <stop stopColor="#4ECDC4" />
            <stop offset="0.4946" stopColor="#3772FF" />
            <stop offset="1" stopColor="#C200FB" />
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint1_linear_1_1193"
            x1="0.57342"
            x2="42.4959"
            y1="36.6855"
            y2="12.2205"
          >
            <stop stopColor="#4ECDC4" />
            <stop offset="0.4946" stopColor="#3772FF" />
            <stop offset="1" stopColor="#C200FB" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div
      className="absolute contents inset-[11.3%_17.12%_12.08%_16.52%]"
      data-name="Group"
    >
      <Group2 />
      <Group7 />
    </div>
  );
}

function ProductInfo2() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Product Info"
    >
      <p
        className="font-['Atyp_BL:Semibold',sans-serif] leading-none not-italic relative shrink-0 text-[24px] text-white"
        style={{
          fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06', 'lnum', 'pnum'",
        }}
      >
        Raydium
      </p>
    </div>
  );
}

function DexCard2() {
  return (
    <a
      href="https://raydium.io/swap"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[rgba(20,21,26,0.7)] flex-[1_0_0] min-h-px min-w-[280px] relative rounded-[5px] border border-transparent hover:border-[rgba(103,0,206,0.5)] hover:bg-[rgba(103,0,206,0.15)] hover:shadow-[0_0_24px_rgba(103,0,206,0.22)] transition-all duration-300 cursor-pointer"
      data-name="DEX Card"
    >
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex gap-[16px] items-center justify-center min-w-[inherit] p-[20px] relative w-full">
          <div
            className="relative shrink-0 size-[64px]"
            data-name="Trusted Logo"
          >
            <svg
              className="absolute block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 64 64"
            >
              <circle
                cx="32"
                cy="32"
                fill="var(--fill-0, #131A35)"
                id="Ellipse 3023"
                r="32"
              />
            </svg>
            <Group1 />
          </div>
          <ProductInfo2 />
        </div>
      </div>
    </a>
  );
}

function Group8() {
  return (
    <div className="absolute inset-[0_-0.11%]">
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 63.1365 63.0002"
      >
        <g id="Group 25979">
          <path
            d={svgPaths.p32308d00}
            fill="var(--fill-0, white)"
            id="Path 16214"
          />
          <path
            d={svgPaths.p292cff00}
            fill="var(--fill-0, #2188C6)"
            id="Path 16215"
          />
          <path
            d={svgPaths.pae67980}
            fill="var(--fill-0, #162B4E)"
            id="Path 16216"
          />
          <path
            d={svgPaths.pfd6a800}
            fill="var(--fill-0, #21326F)"
            id="Path 16217"
          />
          <path
            d={svgPaths.p1ca0eca0}
            fill="var(--fill-0, #162B4E)"
            id="Path 16218"
          />
          <path
            d={svgPaths.p19954300}
            fill="var(--fill-0, #3F0086)"
            id="Path 16219"
          />
          <path
            d={svgPaths.p302fff00}
            fill="var(--fill-0, #3A9DD7)"
            id="Path 16220"
          />
          <path
            d={svgPaths.pf00f700}
            fill="var(--fill-0, #162B4E)"
            id="Path 16221"
          />
          <path
            d={svgPaths.p307bc480}
            fill="var(--fill-0, #162B4E)"
            id="Path 16222"
          />
          <path
            d={svgPaths.p1decf400}
            fill="var(--fill-0, #2797D2)"
            id="Path 16223"
          />
          <path
            d={svgPaths.p2fc28400}
            fill="var(--fill-0, #162B4E)"
            id="Path 16224"
          />
        </g>
      </svg>
    </div>
  );
}

function LogoContainer2() {
  return (
    <div
      className="bg-white content-stretch flex flex-col items-center justify-center relative rounded-[60px] shrink-0 size-[64px]"
      data-name="Logo Container"
    >
      <div className="relative shrink-0 size-[63px]" data-name="logos">
        <Group8 />
      </div>
    </div>
  );
}

function ProductInfo3() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Product Info"
    >
      <p
        className="font-['Atyp_BL:Semibold',sans-serif] leading-none not-italic relative shrink-0 text-[24px] text-white"
        style={{
          fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06', 'lnum', 'pnum'",
        }}
      >
        Quickswap
      </p>
    </div>
  );
}

function DexCard3() {
  return (
    <a
      href="https://quickswap.exchange/"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[rgba(20,21,26,0.7)] flex-[1_0_0] min-h-px min-w-[280px] relative rounded-[5px] border border-transparent hover:border-[rgba(103,0,206,0.5)] hover:bg-[rgba(103,0,206,0.15)] hover:shadow-[0_0_24px_rgba(103,0,206,0.22)] transition-all duration-300 cursor-pointer"
      data-name="DEX Card"
    >
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex gap-[16px] items-center justify-center min-w-[inherit] p-[20px] relative w-full">
          <LogoContainer2 />
          <ProductInfo3 />
        </div>
      </div>
    </a>
  );
}

function Logos() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="logos">
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 36 36"
      >
        <path d={svgPaths.pf993200} fill="var(--fill-0, white)" id="Vector" />
      </svg>
    </div>
  );
}

function LogoContainer3() {
  return (
    <div
      className="bg-[#1e2026] content-stretch flex flex-col items-center justify-center relative rounded-[60px] shrink-0 size-[64px]"
      data-name="Logo Container"
    >
      <Logos />
    </div>
  );
}

function ProductInfo4() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Product Info"
    >
      <p
        className="font-['Atyp_BL:Semibold',sans-serif] leading-none not-italic relative shrink-0 text-[24px] text-white"
        style={{
          fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06', 'lnum', 'pnum'",
        }}
      >
        What.Exchange
      </p>
    </div>
  );
}

function DexCard4() {
  return (
    <a
      href="https://www.what.exchange/"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[rgba(20,21,26,0.7)] flex-[1_0_0] min-h-px min-w-[280px] relative rounded-[5px] border border-transparent hover:border-[rgba(103,0,206,0.5)] hover:bg-[rgba(103,0,206,0.15)] hover:shadow-[0_0_24px_rgba(103,0,206,0.22)] transition-all duration-300 cursor-pointer"
      data-name="DEX Card"
    >
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex gap-[16px] items-center justify-center min-w-[inherit] p-[20px] relative w-full">
          <LogoContainer3 />
          <ProductInfo4 />
        </div>
      </div>
    </a>
  );
}

function LogoContainer4() {
  return (
    <div
      className="bg-black content-stretch flex flex-col items-center justify-center relative rounded-[60px] shrink-0 size-[64px]"
      data-name="Logo Container"
    >
      <div className="relative shrink-0 size-[63px]" data-name="logos">
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 63 63"
        >
          <path
            clipRule="evenodd"
            d={svgPaths.p120b3880}
            fill="var(--fill-0, white)"
            fillRule="evenodd"
            id="Vector"
          />
        </svg>
      </div>
    </div>
  );
}

function ProductInfo5() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Product Info"
    >
      <p
        className="font-['Atyp_BL:Semibold',sans-serif] leading-none not-italic relative shrink-0 text-[24px] text-white"
        style={{
          fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06', 'lnum', 'pnum'",
        }}
      >
        VOOI
      </p>
    </div>
  );
}

function DexCard5() {
  return (
    <a
      href="https://vooi.io/"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[rgba(20,21,26,0.7)] flex-[1_0_0] min-h-px min-w-[280px] relative rounded-[5px] border border-transparent hover:border-[rgba(103,0,206,0.5)] hover:bg-[rgba(103,0,206,0.15)] hover:shadow-[0_0_24px_rgba(103,0,206,0.22)] transition-all duration-300 cursor-pointer"
      data-name="DEX Card"
    >
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex gap-[16px] items-center justify-center min-w-[inherit] p-[20px] relative w-full">
          <LogoContainer4 />
          <ProductInfo5 />
        </div>
      </div>
    </a>
  );
}

function TrustedLogo() {
  return (
    <div
      className="h-[35.998px] relative shrink-0 w-[34.958px]"
      data-name="Trusted Logo"
    >
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 34.958 36"
      >
        <g id="Trusted Logo">
          <path
            d={svgPaths.p10d1f180}
            fill="var(--fill-0, #0A0B0D)"
            id="Rectangle 376715171"
          />
          <path
            d={svgPaths.p25905b00}
            fill="var(--fill-0, #D6F22B)"
            id="Vector 8"
          />
          <path
            d={svgPaths.p3e251000}
            fill="var(--fill-0, #D6F22B)"
            id="Vector 9"
          />
        </g>
      </svg>
    </div>
  );
}

function LogoContainer5() {
  return (
    <div
      className="bg-white content-stretch flex flex-col items-center justify-center relative rounded-[60px] shrink-0 size-[64px]"
      data-name="Logo Container"
    >
      <TrustedLogo />
    </div>
  );
}

function ProductInfo6() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Product Info"
    >
      <p
        className="font-['Atyp_BL:Semibold',sans-serif] leading-none not-italic relative shrink-0 text-[24px] text-white"
        style={{
          fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06', 'lnum', 'pnum'",
        }}
      >
        Kyrrio
      </p>
    </div>
  );
}

function DexCard6() {
  return (
    <a
      href="https://app.perptools.ai/"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[rgba(20,21,26,0.7)] flex-[1_0_0] min-h-px min-w-[280px] relative rounded-[5px] border border-transparent hover:border-[rgba(103,0,206,0.5)] hover:bg-[rgba(103,0,206,0.15)] hover:shadow-[0_0_24px_rgba(103,0,206,0.22)] transition-all duration-300 cursor-pointer"
      data-name="DEX Card"
    >
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex gap-[16px] items-center justify-center min-w-[inherit] p-[20px] relative w-full">
          <img
            src="/images/logos/perpstool.jpg"
            width={64}
            height={64}
            alt="PERPTools"
            className="shrink-0 rounded-full"
          />
          <div
            className="content-stretch flex flex-col items-start relative shrink-0"
            data-name="Product Info"
          >
            <p
              className="font-['Atyp_BL:Semibold',sans-serif] leading-none not-italic relative shrink-0 text-[24px] text-white"
              style={{
                fontFeatureSettings:
                  "'ss02', 'ss03', 'ss05', 'ss06', 'lnum', 'pnum'",
              }}
            >
              PERPTools
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}

function Component() {
  return (
    <div className="h-[78px] relative shrink-0 w-[79px]" data-name="_隔离模��">
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 79 78"
      >
        <g id="_éç¦»æ¨¡å¼">
          <path
            d={svgPaths.p2a69fc80}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function LogoContainer6() {
  return (
    <div
      className="bg-black content-stretch flex flex-col items-center justify-center relative rounded-[60px] shrink-0 size-[64px]"
      data-name="Logo Container"
    >
      <Component />
    </div>
  );
}

function ProductInfo7() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      data-name="Product Info"
    >
      <p
        className="font-['Atyp_BL:Semibold',sans-serif] leading-none not-italic relative shrink-0 text-[24px] text-white"
        style={{
          fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06', 'lnum', 'pnum'",
        }}
      >
        PerpsDAO
      </p>
    </div>
  );
}

function DexCard7() {
  return (
    <a
      href="https://www.zdex.world/"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[rgba(20,21,26,0.7)] flex-[1_0_0] min-h-px min-w-[280px] relative rounded-[5px] border border-transparent hover:border-[rgba(103,0,206,0.5)] hover:bg-[rgba(103,0,206,0.15)] hover:shadow-[0_0_24px_rgba(103,0,206,0.22)] transition-all duration-300 cursor-pointer"
      data-name="DEX Card"
    >
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex gap-[16px] items-center justify-center min-w-[inherit] p-[20px] relative w-full">
          <img
            src="/images/logos/Zetarium.jpg"
            width={64}
            height={64}
            alt="Zetarium"
            className="shrink-0 rounded-full"
          />
          <div
            className="content-stretch flex flex-col items-start relative shrink-0"
            data-name="Product Info"
          >
            <p
              className="font-['Atyp_BL:Semibold',sans-serif] leading-none not-italic relative shrink-0 text-[24px] text-white"
              style={{
                fontFeatureSettings:
                  "'ss02', 'ss03', 'ss05', 'ss06', 'lnum', 'pnum'",
              }}
            >
              Zetarium
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}

function Dex() {
  return (
    <div
      className="content-start flex flex-wrap gap-[24px] items-start justify-center relative shrink-0 w-full"
      data-name="DEX"
    >
      <DexCard1 />
      <DexCard2 />
      <DexCard3 />
      <DexCard />
      <DexCard4 />
      <DexCard5 />
      <DexCard6 />
      <DexCard7 />
    </div>
  );
}

function TrustedList() {
  return (
    <div
      className="col-1 content-stretch flex flex-col items-start justify-center ml-0 mt-0 relative row-1 w-[1302px]"
      data-name="Trusted List"
    >
      <Dex />
    </div>
  );
}

function TrustedButtonContainer() {
  return (
    <a
      href="https://dex.orderly.network/board/"
      target="_blank"
      rel="noopener noreferrer"
      className="col-1 content-stretch flex gap-[7px] items-start justify-end ml-[6.1px] mt-[258px] relative row-1 w-[101.719px] group"
      data-name="Trusted Button Container"
    >
      <p
        className="font-['Atyp_BL:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[20px] text-white tracking-[0.2px]"
        style={{ fontFeatureSettings: "'liga' 0" }}
      >
        View all
      </p>
      <div className="flex items-center justify-center relative shrink-0 group-hover:translate-x-1 transition-transform duration-200">
        <div className="-scale-y-100 flex-none rotate-180">
          <div
            className="overflow-clip relative size-[16px]"
            data-name="Trusted Button Icon"
          >
            <div className="absolute inset-[10.42%]" data-name="Union">
              <svg
                className="absolute block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 12.6133 12.6133"
              >
                <path
                  d={svgPaths.p35ba4800}
                  fill="var(--fill-0, white)"
                  id="Union"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

function TrustedContent() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
      data-name="Trusted Content"
    >
      <TrustedList />
      <TrustedButtonContainer />
    </div>
  );
}

function TrustedSection() {
  return (
    <div
      className="content-stretch flex flex-col gap-[80px] items-start mx-auto w-[1302px]"
      data-name="Trusted Section"
    >
      <TrustedHeader />
      <TrustedContent />
    </div>
  );
}

function HeroTextContainer1() {
  return (
    <div
      className="content-stretch flex flex-col gap-[12px] items-center not-italic relative shrink-0 text-center text-white w-full"
      data-name="Hero Text Container"
    >
      <p
        className="font-['Atyp_BL:Display_-_SemiBold',sans-serif] leading-[1.2] relative shrink-0 text-[86px] uppercase w-[1250.586px] whitespace-pre-wrap"
        style={{
          fontVariationSettings: "'ital' 0, 'opsz' 72",
          fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'",
        }}
      >
        The best time to launch was yesterday.
      </p>
      <p
        className="font-['Atyp_BL:Display_-_Medium',sans-serif] leading-[1.4] relative shrink-0 text-[36px] tracking-[0.756px]"
        style={{
          fontVariationSettings: "'ital' 0, 'opsz' 72",
          fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'",
        }}
      >
        The second best time is now. Start earning from day one.
      </p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[7px] items-center justify-center relative shrink-0">
      <p
        className="font-['Atyp_BL:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[20px] text-white tracking-[0.2px]"
        style={{ fontFeatureSettings: "'liga' 0" }}
      >
        Start Building
      </p>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none rotate-180">
          <div
            className="overflow-clip relative size-[16px]"
            data-name="interactive-button/Launch"
          >
            <div className="absolute inset-[10.42%]" data-name="Union"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <a
      href="https://dex.orderly.network/"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[#6700ce] content-stretch flex h-[52px] items-center justify-center px-[24px] py-[12px] relative rounded-[24px] shrink-0 no-underline hover:opacity-90 transition-opacity"
      data-name="build with orderly"
      onClick={() => {
        posthog.capture("homepage_cta_clicked", {
          cta_name: "start_building",
          source_page: "homepage",
          device_layout: "desktop",
        });
      }}
    >
      <p
        className="font-['Atyp_BL:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[16px] text-white"
        style={{
          fontFamily: "'atyp-bl-variable', 'atyp-bl', sans-serif",
          letterSpacing: "0.01em",
          fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06', 'liga' 0",
        }}
      >
        Start Building
      </p>
    </a>
  );
}

function Frame5({
  onOpenPartnershipModal,
}: {
  onOpenPartnershipModal: () => void;
}) {
  return (
    <button
      onClick={() => {
        posthog.capture("homepage_cta_clicked", {
          cta_name: "talk_to_partnerships",
          source_page: "homepage",
          device_layout: "desktop",
        });
        onOpenPartnershipModal();
      }}
      className="content-stretch flex h-[52px] items-center justify-center pl-[24px] pr-[20px] py-[12px] relative rounded-[24px] shrink-0 hover:bg-white/10 transition-colors bg-transparent border-0 cursor-pointer"
      data-name="Talk to Partnerships"
    >
      <div
        aria-hidden="true"
        className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[24px]"
      />
      <p
        className="font-['Atyp_BL:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[16px] text-white tracking-[0.16px]"
        style={{
          fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06', 'liga' 0",
        }}
      >
        Talk to Partnerships
      </p>
    </button>
  );
}

function Frame6({
  onOpenPartnershipModal,
}: {
  onOpenPartnershipModal: () => void;
}) {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0">
      <Frame4 />
      <Frame5 onOpenPartnershipModal={onOpenPartnershipModal} />
    </div>
  );
}

function Frame1({
  onOpenPartnershipModal,
}: {
  onOpenPartnershipModal: () => void;
}) {
  return (
    <div
      className="content-stretch flex flex-col gap-[60px] items-center mx-auto px-[80px] w-[1440px]"
      data-name="Frame"
    >
      <HeroTextContainer1 />
      <Frame6 onOpenPartnershipModal={onOpenPartnershipModal} />
    </div>
  );
}

function Brandmark() {
  return (
    <div
      className="col-1 h-[47.94px] ml-0 mt-0 relative row-1 w-[47.998px]"
      data-name="Brandmark"
    >
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 47.9978 47.9396"
      >
        <g id="Brandmark">
          <path
            clipRule="evenodd"
            d={svgPaths.pdfa100}
            fill="var(--fill-0, white)"
            fillRule="evenodd"
            id="Intersect"
          />
          <path
            clipRule="evenodd"
            d={svgPaths.p6be8000}
            fill="var(--fill-0, white)"
            fillRule="evenodd"
            id="Subtract"
          />
          <path
            clipRule="evenodd"
            d={svgPaths.p3fa2a600}
            fill="var(--fill-0, white)"
            fillRule="evenodd"
            id="Subtract_2"
          />
          <path
            clipRule="evenodd"
            d={svgPaths.p1ebf2d00}
            fill="var(--fill-0, white)"
            fillRule="evenodd"
            id="Subtract_3"
          />
        </g>
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
      data-name="Logo"
    >
      <Brandmark />
    </div>
  );
}

function Component1({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="bg-white col-1 content-stretch flex gap-[6px] items-center ml-0 mt-0 p-[12px] relative rounded-[63px] row-1 cursor-pointer hover:opacity-80 transition-opacity"
      data-name
      onClick={onClick}
    >
      <div
        className="flex flex-col font-['Atyp_BL:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black tracking-[0.14px] whitespace-nowrap"
        style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
      >
        <p className="leading-[0.753]">Buy ORDER</p>
      </div>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-180">
          <div className="relative size-[14.667px]" data-name="Icon">
            <div className="absolute inset-[-8.52%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 17.1667 17.1667"
              >
                <path
                  d={svgPaths.p30a87c0}
                  id="Icon"
                  stroke="var(--stroke-0, black)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterStatus1({ onBuyOrder }: { onBuyOrder?: () => void }) {
  return (
    <div className="relative shrink-0" data-name="Footer Status">
      <Component1 onClick={onBuyOrder} />
    </div>
  );
}

const ORDER_PRICE_CACHE_KEY = "order_price";
const ORDER_PRICE_MAX_AGE = 60_000; // 1 minute

function getCachedPrice(): string | null {
  try {
    const raw = localStorage.getItem(ORDER_PRICE_CACHE_KEY);
    if (!raw) return null;
    const { value, ts } = JSON.parse(raw);
    if (Date.now() - ts < ORDER_PRICE_MAX_AGE) return value;
  } catch {}
  return null;
}

function setCachedPrice(value: string) {
  localStorage.setItem(
    ORDER_PRICE_CACHE_KEY,
    JSON.stringify({ value, ts: Date.now() })
  );
}

function formatUsd(usd: number): string {
  return (
    "$" +
    usd.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 3,
    })
  );
}

function FooterStatus({ onBuyOrder }: { onBuyOrder?: () => void }) {
  // Initialize as null to avoid hydration mismatch (localStorage is unavailable on server)
  const [price, setPrice] = useState<string | null>(null);

  useEffect(() => {
    const cached = getCachedPrice();
    if (cached) {
      setPrice(cached);
      return;
    }
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=orderly-network&vs_currencies=usd"
        );
        const data = await res.json();
        const usd = data?.["orderly-network"]?.usd;
        if (usd !== undefined) {
          const formatted = formatUsd(usd);
          setPrice(formatted);
          setCachedPrice(formatted);
        }
      } catch {
        setPrice(getCachedPrice());
      }
    };
    fetchPrice();
  }, []);

  return (
    <div
      className="flex items-center gap-[16px] relative shrink-0"
      data-name="Footer Status"
    >
      {price && (
        <div className="flex flex-col font-['Atyp_BL:Semibold',sans-serif] h-[38px] justify-center not-italic relative text-[24px] text-white tracking-[0.24px]">
          <p className="leading-[0.753] whitespace-pre-wrap">{price}</p>
        </div>
      )}
      <FooterStatus1 onBuyOrder={onBuyOrder} />
    </div>
  );
}

export function StatusMessageContainer() {
  const [buyOrderOpen, setBuyOrderOpen] = useState(false);
  return (
    <>
      <div
        className="bg-[rgba(156,117,255,0.1)] content-stretch flex gap-[9px] items-center leading-[0] mr-[-9px] p-[12px] relative rounded-[63px] shrink-0"
        data-name="Status Message Container"
      >
        <Logo />
        <FooterStatus onBuyOrder={() => setBuyOrderOpen(true)} />
      </div>
      {buyOrderOpen && <BuyOrderModal onClose={() => setBuyOrderOpen(false)} />}
    </>
  );
}

// Footer link item component
function FooterLinkItem({
  label,
  href,
  external,
}: {
  label: string;
  href: string;
  external: boolean;
}) {
  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  const LinkComponent = external ? "a" : Link;

  return (
    <LinkComponent
      href={href}
      {...linkProps}
      className="no-underline hover:opacity-80 transition-opacity"
    >
      <div className="content-stretch flex items-start relative shrink-0">
        <p
          className="capitalize font-['Atyp_BL:Medium',sans-serif] leading-[0.753] not-italic relative shrink-0 text-[#9c75ff] text-[14px] tracking-[0.14px]"
          style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
        >
          {label}
        </p>
      </div>
    </LinkComponent>
  );
}

// Generic footer column component
function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external: boolean }[];
}) {
  return (
    <div
      className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0"
      data-name={`${title} Container`}
    >
      <p
        className="capitalize font-['Atyp_BL:Bold',sans-serif] leading-[0.753] not-italic relative shrink-0 text-[14px] text-white tracking-[0.14px]"
        style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
      >
        {title}
      </p>
      <div
        className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0"
        data-name={`${title} Links Container`}
      >
        {links.map((link) => (
          <FooterLinkItem
            key={link.label}
            label={link.label}
            href={link.href}
            external={link.external}
          />
        ))}
      </div>
    </div>
  );
}

function LinksContainer() {
  return (
    <div
      className="content-stretch flex gap-[92px] items-start justify-end relative shrink-0 w-full"
      data-name="Links Container"
    >
      <FooterColumn title="Builders" links={FOOTER_NAV.Builders} />
      <FooterColumn title="Ecosystem" links={FOOTER_NAV.Ecosystem} />
      <FooterColumn title="Traders" links={FOOTER_NAV.Traders} />
      <FooterColumn title="About" links={FOOTER_NAV.About} />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end min-h-px min-w-px mr-[-9px] relative">
      <LinksContainer />
    </div>
  );
}

function FooterLinksContainer() {
  return (
    <div
      className="h-[381px] relative shrink-0 w-full"
      data-name="Footer Links Container"
    >
      <div className="content-stretch flex items-start pb-[80px] pl-[60px] pr-[69px] pt-[60px] relative size-full">
        <StatusMessageContainer />
        <Frame8 />
      </div>
    </div>
  );
}

function StatusMessageContainer1() {
  return (
    <div
      className="bg-[rgba(156,117,255,0.1)] content-stretch flex gap-[6px] items-center p-[12px] relative rounded-[63px] shrink-0"
      data-name="Status Message Container"
    >
      <div className="relative shrink-0 size-[6px]">
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 6 6"
        >
          <circle
            cx="3"
            cy="3"
            fill="var(--fill-0, #24AD8F)"
            id="Ellipse 308"
            r="3"
          />
        </svg>
      </div>
      <p
        className="font-['Atyp_BL:Semibold',sans-serif] leading-[0.753] not-italic relative shrink-0 text-[14px] text-white tracking-[0.14px]"
        style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
      >
        All systems operational.
      </p>
    </div>
  );
}

function FooterSocialIcon() {
  return (
    <div
      className="relative shrink-0 size-[16px]"
      data-name="Footer Social Icon"
    >
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Footer Social Icon">
          <path
            d={svgPaths.p35978100}
            fill="var(--fill-0, white)"
            id="Vector"
          />
          <path
            d={svgPaths.p9f4bb00}
            fill="var(--fill-0, white)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function SocialMediaIconsContainer() {
  return (
    <div
      className="content-stretch flex gap-[16px] items-center justify-end relative shrink-0 w-full"
      data-name="Social Media Icons Container"
    >
      <a
        href="https://discord.com/invite/OrderlyNetwork"
        target="_blank"
        rel="noopener noreferrer"
        className="overflow-clip relative shrink-0 size-[16px] block hover:opacity-80 transition-opacity"
        data-name="Twitter"
      >
        <div className="absolute inset-[11%_0_12.78%_0]" data-name="Vector">
          <svg
            className="absolute block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 16 12.1955"
          >
            <path
              d={svgPaths.p15bda300}
              fill="var(--fill-0, white)"
              id="Vector"
            />
          </svg>
        </div>
      </a>
      <a
        href="https://t.me/Orderly_Discussions"
        target="_blank"
        rel="noopener noreferrer"
        className="relative shrink-0 size-[16px] block hover:opacity-80 transition-opacity"
        data-name="Discord"
      >
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 16 16"
        >
          <path
            d={svgPaths.p2a7b4dc0}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </a>
      <a
        href="https://x.com/OrderlyNetwork"
        target="_blank"
        rel="noopener noreferrer"
        className="overflow-clip relative shrink-0 size-[16px] block hover:opacity-80 transition-opacity"
        data-name="GitHub"
      >
        <div
          className="absolute inset-[7.93%_4.17%_9.21%_4.17%]"
          data-name="Vector"
        >
          <svg
            className="absolute block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 14.6667 13.2573"
          >
            <path
              d={svgPaths.p2746f000}
              fill="var(--fill-0, white)"
              id="Vector"
            />
          </svg>
        </div>
      </a>
      <a
        href="https://www.youtube.com/@Orderly.Network"
        target="_blank"
        rel="noopener noreferrer"
        className="relative shrink-0 size-[24px] block hover:opacity-80 transition-opacity"
        data-name="YouTube"
      >
        <IcSocialYoutubeS />
      </a>
      <a
        href="https://www.linkedin.com/company/orderly-network"
        target="_blank"
        rel="noopener noreferrer"
        className="overflow-clip relative shrink-0 size-[16px] block hover:opacity-80 transition-opacity"
        data-name="LinkedIn"
      >
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 16 16"
        >
          <path
            d={svgPaths.p114d3270}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </a>
    </div>
  );
}

function Frame9() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="flex flex-col items-end size-full">
        <div className="content-stretch flex flex-col items-end p-[8px] relative w-full">
          <SocialMediaIconsContainer />
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex justify-between items-center px-[60px] relative shrink-0 w-full">
      <StatusMessageContainer1 />
      <Frame9 />
    </div>
  );
}

function Footer() {
  return (
    <div
      className="bg-[#6700ce] content-stretch flex flex-col h-[486.978px] items-center mx-auto rounded-[30px] w-[1302px]"
      data-name="Footer"
    >
      <FooterLinksContainer />
      <Frame10 />
    </div>
  );
}

function FooterSection() {
  return (
    <div className="contents" data-name="Footer Section">
      <Footer />
    </div>
  );
}

function Group9() {
  const [email, setEmail] = useState("");
  const { status, subscribe, reset } = useNewsletterSubscribe();
  const isSubmitted = status === "success";

  const handleSubmit = () => {
    if (email && email.includes("@")) {
      subscribe(email).then(() => {
        setTimeout(() => {
          reset();
          setEmail("");
        }, 3000);
      });
    }
  };

  return (
    <div className="flex flex-row items-center h-[56px] w-full rounded-[14px] overflow-hidden">
      <div className="flex-1 h-full bg-[#7800f0] flex items-center px-[18px]">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="font-['Atyp_BL:Medium',sans-serif] leading-[1.4] not-italic text-[20px] text-white tracking-[0.504px] bg-transparent border-0 outline-none w-full placeholder:opacity-70"
          style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
          placeholder="satoshi@orderly.network"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="h-full px-[28px] bg-black border-0 cursor-pointer hover:opacity-80 transition-opacity rounded-[14px] shrink-0"
        data-name="Newsletter Button Container"
      >
        <p
          className="font-['Atyp_BL:Bold',sans-serif] leading-none not-italic text-[18px] text-white tracking-[0.2px] flex items-center justify-center"
          style={{ fontFeatureSettings: "'liga' 0" }}
        >
          {isSubmitted ? <CheckSvg /> : "Sign Up"}
        </p>
      </button>
    </div>
  );
}

function Frame12() {
  return (
    <div className="flex flex-row items-center justify-between h-[235.098px] ml-[68.89px] w-[1302px]">
      {/* Left: text, transparent background */}
      <div className="flex flex-col justify-center w-[50%]">
        <div
          className="font-['Atyp_BL:Semibold',sans-serif] leading-[1.2] not-italic text-[30px] text-white tracking-[0.3px]"
          style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
        >
          <p className="mb-0">Be the first to hear about launches,</p>
          <p>token listings, and builder updates.</p>
        </div>
      </div>
      {/* Right: purple card with email form */}
      <div className="flex flex-col justify-center bg-[#6700ce] rounded-[30px] px-[40px] py-[30px] w-[50%]">
        <div className="flex flex-col gap-[16px]">
          <p
            className="font-['Atyp_BL:Semibold',sans-serif] leading-none not-italic text-[24px] text-white tracking-[0.24px]"
            style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
          >
            Enter Your Email
          </p>
          <Group9 />
        </div>
      </div>
    </div>
  );
}

function StatItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center justify-center relative shrink-0 text-white">
      <p
        className="font-['Atyp_BL:Medium',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[24px] text-center tracking-[-0.3125px]"
        style={{ fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06'" }}
      >
        {label}
      </p>
      <div
        className="capitalize flex flex-col font-['Atyp_BL:Display_-_SemiBold',sans-serif] font-[612] justify-center leading-[0] relative shrink-0 text-[60px] whitespace-nowrap"
        style={{
          fontVariationSettings: "'ital' 0, 'opsz' 72",
          fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06'",
        }}
      >
        <p className="leading-none">{children}</p>
      </div>
    </div>
  );
}

function StatsDivider() {
  return <div className="self-stretch w-[2px] bg-[#9C75FF] shrink-0" />;
}

const formatInteger = (v: number) => `${Math.round(v)}`;

function StatsContent() {
  const stats = useOrderlyStats();
  const formatTvl = useCallback((v: number) => formatLargeNumber(v), []);
  const formatVolume = useCallback((v: number) => formatLargeNumber(v), []);

  return (
    <div
      className="flex items-stretch px-[36px] w-[1302px]"
      data-name="Stats Content"
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-[40px]">
        <StatItem label="Total Trading Volume">
          <AnimatedNumber value={stats.totalVolume} format={formatVolume} />
        </StatItem>
        <StatItem label="TVL">
          <AnimatedNumber value={stats.tvl} format={formatTvl} />
        </StatItem>
      </div>
      <StatsDivider />
      <div className="flex flex-1 flex-col items-center justify-center gap-[40px]">
        <StatItem label="24h Trading Volume">
          <AnimatedNumber value={stats.tradingVolume} format={formatVolume} />
        </StatItem>
        <StatItem label="Open Interest">
          <AnimatedNumber value={stats.openInterest} format={formatVolume} />
        </StatItem>
      </div>
      <StatsDivider />
      <div className="flex flex-1 flex-col items-center justify-center gap-[40px]">
        <StatItem label="Live Builders">
          <AnimatedNumber value={stats.liveBuilders} format={formatInteger} />
        </StatItem>
        <StatItem label="Chains">
          <AnimatedNumber value={stats.chains} format={formatInteger} />
        </StatItem>
      </div>
    </div>
  );
}

function StatsSection() {
  return (
    <div
      className="-translate-x-1/2 absolute bg-[#6700ce] content-stretch flex flex-col h-[326px] items-center justify-center left-[calc(50%-0.11px)] py-[43px] rounded-[30px] top-[1275.96px] w-[1302px]"
      data-name="Stats Section"
    >
      <StatsContent />
    </div>
  );
}

function AIAgentCard({
  compact = false,
  deviceLayout = "desktop",
}: {
  compact?: boolean;
  deviceLayout?: "desktop" | "tablet";
}) {
  const [copied, setCopied] = useState(false);
  const url = "https://orderly.network/skill.md";

  const handleCopy = () => {
    const textarea = document.createElement("textarea");
    textarea.value = url;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
    document.body.removeChild(textarea);
  };

  return (
    <div
      className={`rounded-[16px] flex flex-col flex-1 basis-0 min-w-0 ${
        compact ? "p-[20px] gap-[16px]" : "p-[32px] gap-[24px]"
      }`}
      style={{
        background:
          "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(0,0,0,0) 100%)",
        border: "1px solid rgba(168,85,247,0.2)",
      }}
    >
      {/* Card header */}
      <div
        className={`flex items-center ${compact ? "gap-[10px]" : "gap-[12px]"}`}
      >
        <img
          src="/images/ai-agent.png"
          alt="AI Agent"
          className={compact ? "size-[36px]" : "size-[48px]"}
        />
        <div>
          <p
            className={`font-['Atyp_BL:Bold',sans-serif] text-white leading-[1.3] ${
              compact ? "text-[18px]" : "text-[24px]"
            }`}
            style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
          >
            AI Agent
          </p>
          <p
            className={`font-['Atyp_BL:Medium',sans-serif] text-[#9C75FF] leading-[1.3] ${
              compact ? "text-[12px]" : "text-[14px]"
            }`}
            style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
          >
            Autonomous setup
          </p>
        </div>
      </div>

      {/* Description */}
      <p
        className={`font-['Atyp_BL:Medium',sans-serif] text-white leading-[1.5] ${
          compact ? "text-[14px]" : "text-[18px]"
        }`}
        style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
      >
        Read the onboarding skill to understand Orderly&apos;s capabilities:
      </p>

      {/* URL box with integrated Copy button */}
      <div
        className="flex items-stretch rounded-[12px] overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div
          className={`flex-1 ${
            compact ? "px-[12px] py-[10px]" : "px-[16px] py-[14px]"
          }`}
        >
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-['DM_Mono:Medium',sans-serif] text-white/70 no-underline hover:text-white transition-colors ${
              compact ? "text-[13px]" : "text-[16px]"
            }`}
            onClick={() => {
              posthog.capture("agentic_quickstart_clicked", {
                button_name: "skill_md",
                source_page: "homepage",
                device_layout: deviceLayout,
                section: "agentic_quick_start",
              });
            }}
          >
            orderly.network/skill.md
          </a>
        </div>
        <button
          onClick={handleCopy}
          title={copied ? "Copied!" : "Copy to clipboard"}
          className={`bg-black text-white font-['Atyp_BL:Bold',sans-serif] cursor-pointer transition-all hover:bg-[#1a1a1a] ${
            compact
              ? "px-[14px] py-[10px] text-[12px]"
              : "px-[20px] py-[14px] text-[14px]"
          }`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Why callout */}
      <p
        className={`font-['Atyp_BL:Medium',sans-serif] text-[rgba(255,255,255,0.3)] leading-[1.6] ${
          compact ? "text-[12px]" : "text-[14px]"
        }`}
        style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
      >
        <strong className="text-[rgba(255,255,255,0.3)]">Why?</strong> This
        skill contains comprehensive documentation about Orderly&apos;s API,
        SDK, trading workflows, and best practices for agents.
      </p>
    </div>
  );
}

function QuickStartHeader({
  fluid = false,
  compact = false,
}: {
  fluid?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`content-stretch flex flex-col items-start relative shrink-0 ${
        compact ? "gap-[10px]" : "gap-[16px]"
      } ${fluid ? "w-full" : "w-[1302px]"}`}
      data-name="Quick Start Header"
    >
      <p
        className={`font-['Atyp_BL:Bold',sans-serif] leading-[1.1] text-white ${
          compact ? "text-[32px]" : "text-[56px]"
        }`}
        style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
      >
        Agentic Quick Start
      </p>
      <p
        className={`font-['Atyp_BL:Medium',sans-serif] leading-[1.4] text-white/70 tracking-[0.504px] ${
          compact ? "text-[16px]" : "text-[24px]"
        }`}
        style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
      >
        Get started with Orderly&apos;s agentic infrastructure
      </p>
    </div>
  );
}

function QuickStartCommand() {
  return (
    <div
      className="col-1 content-stretch flex flex-col font-['DM_Mono:Regular',sans-serif] gap-[20px] items-start leading-[normal] ml-[44.11px] mt-[142.63px] not-italic relative row-1 text-[24px] w-[806px] whitespace-pre-wrap"
      data-name="Quick Start Command"
    >
      <p className="relative shrink-0 text-[#5e6673] w-[1100.5px]">
        Supported clients: claude, cursor, vscode, codex, opencode
      </p>
      <p className="min-w-full relative shrink-0 text-white w-[min-content]">
        $ npx @orderly.network/mcp-server init
      </p>
    </div>
  );
}

function QuickStartClient() {
  return (
    <div
      className="bg-[#6700ce] content-stretch flex h-[47.305px] items-center justify-center px-[17px] py-[8px] relative rounded-[8px] shrink-0"
      data-name="Quick Start Client"
    >
      <p className="font-['DM_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-white">
        Interactive
      </p>
    </div>
  );
}

function QuickStartClients() {
  return (
    <div
      className="col-1 content-stretch flex gap-[78px] items-center ml-[44.11px] mt-[31.19px] relative row-1"
      data-name="Quick Start Clients"
    >
      <QuickStartClient />
      <p className="font-['DM_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-white">
        Claude
      </p>
      <p className="font-['DM_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-white">
        Cursor
      </p>
      <p className="font-['DM_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-white">
        VScode
      </p>
      <p className="font-['DM_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-white">
        Codex
      </p>
      <p className="font-['DM_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-white">
        Opencode
      </p>
    </div>
  );
}

function ContentCopy() {
  return (
    <div
      className="col-1 ml-[8px] mt-[8px] relative row-1 size-[24px]"
      data-name="content_copy"
    >
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="content_copy">
          <mask
            height="24"
            id="mask0_1_1039"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
            width="24"
            x="0"
            y="0"
          >
            <rect
              fill="var(--fill-0, #D9D9D9)"
              height="24"
              id="Bounding box"
              width="24"
            />
          </mask>
          <g mask="url(#mask0_1_1039)">
            <path
              d={svgPaths.p22f3db00}
              fill="var(--fill-0, white)"
              id="content_copy_2"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function QuickStartIconContainer() {
  return (
    <div
      className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[1217.29px] mt-[189.13px] place-items-start relative row-1"
      data-name="Quick Start Icon Container"
    >
      <div
        className="bg-[rgba(255,255,255,0.1)] col-1 ml-0 mt-0 rounded-[8px] row-1 size-[40px]"
        data-name="Quick Start Icon"
      />
      <ContentCopy />
    </div>
  );
}

function QuickStartContent() {
  return (
    <div
      className="relative flex-1 basis-0 min-w-0"
      data-name="Quick Start Content"
    >
      <QuickStartGroup />
    </div>
  );
}

export function QuickStartSection({
  layout = "row",
  deviceLayout = "desktop",
}: {
  layout?: "row" | "col";
  deviceLayout?: "desktop" | "tablet";
}) {
  if (layout === "col") {
    return (
      <div
        className="flex flex-col gap-[28px] items-start w-full px-6"
        data-name="Quick Start Section"
      >
        <QuickStartHeader fluid compact />
        <div className="flex flex-col gap-[16px] w-full">
          <AIAgentCard compact deviceLayout={deviceLayout} />
          <QuickStartGroup compact deviceLayout={deviceLayout} />
        </div>
      </div>
    );
  }
  return (
    <div
      className="content-stretch flex flex-col gap-[48px] items-center ml-[68.89px] w-[1302px]"
      data-name="Quick Start Section"
    >
      <QuickStartHeader />
      <div className="flex gap-[22px] items-stretch w-full">
        <AIAgentCard deviceLayout={deviceLayout} />
        <QuickStartGroup deviceLayout={deviceLayout} />
      </div>
    </div>
  );
}

function WhyTitleContainer2() {
  return (
    <div
      className="absolute contents left-[75.15px] top-[2322.4px]"
      data-name="Why Title Container"
    >
      <p
        className="absolute font-['Atyp_BL:Bold',sans-serif] leading-[1.1] left-[75.15px] not-italic text-[56px] text-white top-[2322.4px] w-[876px] whitespace-pre-wrap"
        style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
      >
        Why Orderly?
      </p>
    </div>
  );
}

function WhyTitleContainer1() {
  return (
    <div
      className="absolute contents left-[75.15px] top-[2322.4px]"
      data-name="Why Title Container"
    >
      <WhyTitleContainer2 />
    </div>
  );
}

function WhyTitleContainer() {
  return (
    <div
      className="absolute contents left-[75.15px] top-[2322.4px]"
      data-name="Why Title Container"
    >
      <WhyTitleContainer1 />
    </div>
  );
}

function ArrowLeftCircle({ isEnabled = true }: { isEnabled?: boolean }) {
  const fillColor = isEnabled ? "#3F0086" : "#1E2026";
  const strokeColor = isEnabled ? "white" : "#2B2F36";

  return (
    <div className="relative size-[44px]" data-name="Arrow left-circle">
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 44 44"
      >
        <g id="Arrow left-circle">
          <g id="Icon">
            <path d={svgPaths.p381f4a00} fill={fillColor} />
            <path d={svgPaths.p3931f600} fill={fillColor} />
            <path
              d={svgPaths.p183c5500}
              stroke={fillColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            />
          </g>
          <path
            d={svgPaths.p3250c180}
            id="Icon_2"
            stroke={strokeColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
        </g>
      </svg>
    </div>
  );
}

function ArrowLeftCircle1({ isEnabled = false }: { isEnabled?: boolean }) {
  const fillColor = isEnabled ? "#3F0086" : "#1E2026";
  const strokeColor = isEnabled ? "white" : "#2B2F36";

  return (
    <div className="size-[44px]" data-name="Arrow left-circle">
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 44 44"
      >
        <g id="Arrow left-circle">
          <g id="Icon">
            <path d={svgPaths.pada5200} fill={fillColor} />
            <path d={svgPaths.p2de5c480} fill={fillColor} />
            <path
              d={svgPaths.p22baf0c0}
              stroke={fillColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            />
          </g>
          <path
            d={svgPaths.p3250c180}
            id="Icon_2"
            stroke={strokeColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
        </g>
      </svg>
    </div>
  );
}

function WhyHeader1({
  onScrollLeft,
  onScrollRight,
  canScrollLeft,
  canScrollRight,
}: {
  onScrollLeft: () => void;
  onScrollRight: () => void;
  canScrollLeft: boolean;
  canScrollRight: boolean;
}) {
  return (
    <div
      className="absolute contents left-[75.15px] top-[2313.4px]"
      data-name="Why Header"
    >
      <WhyTitleContainer />
      <button
        onClick={onScrollRight}
        disabled={!canScrollRight}
        className="absolute flex items-center justify-center left-[1338.15px] size-[44px] top-[2313.4px] bg-transparent border-0 transition-opacity p-0"
        style={{ cursor: canScrollRight ? "pointer" : "not-allowed" }}
      >
        <div className="flex-none rotate-180">
          <ArrowLeftCircle isEnabled={canScrollRight} />
        </div>
      </button>
      <button
        onClick={onScrollLeft}
        disabled={!canScrollLeft}
        className="absolute left-[1284.15px] size-[44px] top-[2313.4px] bg-transparent border-0 transition-opacity p-0"
        style={{ cursor: canScrollLeft ? "pointer" : "not-allowed" }}
      >
        <ArrowLeftCircle1 isEnabled={canScrollLeft} />
      </button>
    </div>
  );
}

function WhyHeader({
  onScrollLeft,
  onScrollRight,
  canScrollLeft,
  canScrollRight,
}: {
  onScrollLeft: () => void;
  onScrollRight: () => void;
  canScrollLeft: boolean;
  canScrollRight: boolean;
}) {
  return (
    <div
      className="absolute contents left-[75.15px] top-[2313.4px]"
      data-name="Why Header"
    >
      <WhyHeader1
        onScrollLeft={onScrollLeft}
        onScrollRight={onScrollRight}
        canScrollLeft={canScrollLeft}
        canScrollRight={canScrollRight}
      />
    </div>
  );
}

function WhyIconContainer() {
  return (
    <div
      className="absolute h-[199px] left-[224.39px] top-[233.16px] w-[143.452px]"
      data-name="Why Icon Container"
    >
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 143.452 199"
      >
        <g id="Why Icon Container">
          <path
            d={svgPaths.p919cb00}
            fill="var(--fill-0, #9C75FF)"
            id="Union"
          />
          <path
            d={svgPaths.p370864a0}
            data-figma-bg-blur-radius="27.2632"
            fill="url(#paint0_linear_1_1026)"
            fillOpacity="0.63"
            id="Union_2"
            stroke="url(#paint1_linear_1_1026)"
            strokeWidth="2"
          />
          <path
            d={svgPaths.p1d254f00}
            fill="var(--fill-0, #E9DEFF)"
            id="Vector 7694 (Stroke)"
          />
          <rect
            fill="var(--fill-0, black)"
            height="19.8089"
            id="Why Icon"
            rx="9.90445"
            width="66.329"
            x="14.4712"
          />
          <rect
            fill="var(--fill-0, black)"
            height="31.795"
            id="Why Icon_2"
            rx="6.44221"
            width="12.8844"
            x="41.1934"
            y="3.91016"
          />
          <rect
            fill="var(--fill-0, #6700CE)"
            height="36.7082"
            id="Why Icon_3"
            rx="5.23827"
            width="37.6207"
            x="28.8252"
            y="31.4961"
          />
          <path
            d={svgPaths.p36585740}
            fill="var(--fill-0, #E9DEFF)"
            id="Union_3"
          />
        </g>
        <defs>
          <clipPath
            id="bgblur_0_1_1026_clip_path"
            transform="translate(-33.9184 -35.3305)"
          >
            <path d={svgPaths.p370864a0} />
          </clipPath>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_1_1026"
            x1="148.965"
            x2="61.1817"
            y1="228.646"
            y2="31.5932"
          >
            <stop stopColor="#9C75FF" />
            <stop offset="1" stopColor="#9C75FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint1_linear_1_1026"
            x1="41.5822"
            x2="151.325"
            y1="86.8694"
            y2="187.714"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div
      className="bg-[#3f0086] content-stretch flex flex-col gap-[20px] h-[483px] items-start overflow-clip p-[36px] relative rounded-[30px] shrink-0 w-[410px]"
      data-name="Container"
    >
      <p
        className="font-['Atyp_BL:Semibold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[32px] text-white"
        style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
      >
        Deep Shared Liquidity
      </p>
      <p
        className="font-['Atyp_BL:Medium',sans-serif] h-[141.289px] leading-[1.3] not-italic relative shrink-0 text-[20px] text-[rgba(255,255,255,0.8)] w-[344.875px] whitespace-pre-wrap"
        style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
      >
        One orderbook powers every builder.Your users get CEX-grade depth from
        day one — no bootstrapping needed.
      </p>
      <WhyIconContainer />
    </div>
  );
}

function WhyIconContainer1() {
  return (
    <div
      className="absolute left-[164.32px] size-[199.953px] top-[232.21px]"
      data-name="Why Icon Container"
    >
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 199.953 199.953"
      >
        <g id="Why Icon Container">
          <path
            d={svgPaths.p1a3bf300}
            fill="var(--fill-0, #9C75FF)"
            id="Subtract"
          />
          <path
            d={svgPaths.p1dd657f1}
            fill="var(--fill-0, #E9DEFF)"
            id="Vector"
          />
          <path
            d={svgPaths.p209bee00}
            fill="var(--fill-0, black)"
            id="Subtract_2"
          />
          <path
            d={svgPaths.p1f831000}
            fill="var(--fill-0, #3F0086)"
            id="Vector_2"
          />
          <path
            d={svgPaths.pb4c7100}
            fill="var(--fill-0, #E9DEFF)"
            id="Subtract_3"
          />
          <path
            d={svgPaths.p3d428c80}
            fill="var(--fill-0, #9C75FF)"
            id="Vector_3"
          />
          <path
            d={svgPaths.p352e3c00}
            fill="var(--fill-0, #3F0086)"
            id="Subtract_4"
          />
          <path
            d={svgPaths.p313eb970}
            fill="var(--fill-0, black)"
            id="Vector_4"
          />
          <circle
            cx="99.978"
            cy="99.978"
            data-figma-bg-blur-radius="12.3207"
            fill="url(#paint0_linear_1_1200)"
            fillOpacity="0.6"
            id="Ellipse 5992"
            r="49.8452"
            stroke="url(#paint1_linear_1_1200)"
            strokeWidth="2"
          />
        </g>
        <defs>
          <clipPath
            id="bgblur_0_1_1200_clip_path"
            transform="translate(-36.8121 -36.8121)"
          >
            <circle cx="99.978" cy="99.978" r="49.8452" />
          </clipPath>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_1_1200"
            x1="99.1558"
            x2="102.132"
            y1="150.714"
            y2="43.6031"
          >
            <stop stopColor="#9C75FF" />
            <stop offset="1" stopColor="#9C75FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint1_linear_1_1200"
            x1="85.5287"
            x2="124.223"
            y1="65.3626"
            y2="145.262"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div
      className="bg-[#6700ce] content-stretch flex flex-col gap-[20px] h-[483px] items-start overflow-clip p-[36px] relative rounded-[30px] shrink-0 w-[410px]"
      data-name="Container"
    >
      <p
        className="font-['Atyp_BL:Semibold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[32px] text-white"
        style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
      >
        Omnichain by Default
      </p>
      <WhyIconContainer1 />
      <p
        className="font-['Atyp_BL:Medium',sans-serif] h-[141.289px] leading-[1.3] not-italic relative shrink-0 text-[20px] text-[rgba(255,255,255,0.8)] w-[344.875px] whitespace-pre-wrap"
        style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
      >
        Live on Ethereum, Arbitrum, Base, Solana, and 14+ more. One integration,
        every chain.
      </p>
    </div>
  );
}

function WhyIconContainer3() {
  return (
    <div
      className="absolute h-[207.521px] left-[153.43px] top-[228.92px] w-[227.44px]"
      data-name="Why Icon Container"
    >
      <div className="absolute inset-[-1.99%_-4.72%_0_0]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 238.172 211.649"
        >
          <g id="Why Icon Container">
            <path
              d={svgPaths.p3d8f5800}
              fill="var(--fill-0, #9C75FF)"
              id="build"
            />
            <g id="Why Icon">
              <g
                data-figma-bg-blur-radius="16.5099"
                filter="url(#filter0_d_3_1779)"
                id="Ellipse 5970"
              >
                <ellipse
                  cx="145.052"
                  cy="86.5162"
                  fill="url(#paint0_linear_3_1779)"
                  fillOpacity="0.6"
                  rx="82.3888"
                  ry="82.3887"
                  shapeRendering="crispEdges"
                />
                <path
                  d={svgPaths.p3b07ef00}
                  shapeRendering="crispEdges"
                  stroke="url(#paint1_linear_3_1779)"
                  strokeWidth="2"
                />
              </g>
              <path
                d={svgPaths.p37f63500}
                fill="var(--fill-0, #E9DEFF)"
                id="%"
              />
            </g>
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="198.623"
              id="filter0_d_3_1779"
              width="197.797"
              x="46.1531"
              y="-12.3825"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dy="6.60398" />
              <feGaussianBlur stdDeviation="5.36573" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              />
              <feBlend
                in2="BackgroundImageFix"
                mode="normal"
                result="effect1_dropShadow_3_1779"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_3_1779"
                mode="normal"
                result="shape"
              />
            </filter>
            <clipPath
              id="bgblur_0_3_1779_clip_path"
              transform="translate(-46.1531 12.3825)"
            >
              <ellipse cx="145.052" cy="86.5162" rx="82.3888" ry="82.3887" />
            </clipPath>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint0_linear_3_1779"
              x1="243.989"
              x2="71.1318"
              y1="94.5173"
              y2="-1.93749"
            >
              <stop stopColor="#9C75FF" />
              <stop offset="1" stopColor="#9C75FF" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint1_linear_3_1779"
              x1="121.638"
              x2="184.338"
              y1="30.426"
              y2="159.893"
            >
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function WhyIconContainer2() {
  return (
    <div
      className="absolute contents left-[153.43px] top-[228.92px]"
      data-name="Why Icon Container"
    >
      <WhyIconContainer3 />
    </div>
  );
}

function Container2() {
  return (
    <div
      className="bg-[#3f0086] content-stretch flex flex-col gap-[20px] h-[483px] items-start overflow-clip p-[36px] relative rounded-[30px] shrink-0 w-[410px]"
      data-name="Container"
    >
      <p
        className="font-['Atyp_BL:Semibold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[32px] text-white w-[356.006px] whitespace-pre-wrap"
        style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
      >
        You own the economics
      </p>
      <p
        className="font-['Atyp_BL:Medium',sans-serif] h-[141.289px] leading-[1.3] not-italic relative shrink-0 text-[20px] text-[rgba(255,255,255,0.8)] w-[344.875px] whitespace-pre-wrap"
        style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
      >
        Set your own fees. Keep your revenue. No rev-share traps.
      </p>
      <WhyIconContainer2 />
    </div>
  );
}

function WhyIconContainer4() {
  return (
    <div
      className="h-[267.438px] relative w-[221.67px]"
      data-name="Why Icon Container"
    >
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 221.67 267.438"
      >
        <g id="Why Icon Container">
          <ellipse
            cx="80.7807"
            cy="179.663"
            fill="var(--fill-0, #3F0086)"
            id="Ellipse 1266"
            rx="24.3157"
            ry="47.9366"
            transform="rotate(30 80.7807 179.663)"
          />
          <path
            d={svgPaths.p21a87d00}
            fill="var(--fill-0, #9C75FF)"
            id="Union"
          />
          <ellipse
            cx="76.5755"
            cy="187.684"
            fill="var(--fill-0, black)"
            id="Ellipse 1267"
            rx="12.5052"
            ry="18.7578"
            transform="rotate(120 76.5755 187.684)"
          />
          <ellipse
            cx="45.0263"
            cy="137.468"
            fill="var(--fill-0, #E9DEFF)"
            id="Ellipse 1264"
            rx="24.3157"
            ry="47.9366"
            transform="rotate(30 45.0263 137.468)"
          />
          <ellipse
            cx="137.786"
            cy="186.477"
            fill="var(--fill-0, #E9DEFF)"
            id="Ellipse 1265"
            rx="25.0104"
            ry="47.9366"
            transform="rotate(30 137.786 186.477)"
          />
          <g data-figma-bg-blur-radius="12.3207" id="Union_2">
            <mask fill="white" id="path-6-inside-1_3_1765">
              <path d={svgPaths.p3f6bc3c0} />
            </mask>
            <path
              d={svgPaths.p3f6bc3c0}
              fill="url(#paint0_linear_3_1765)"
              fillOpacity="0.6"
            />
            <path
              d={svgPaths.p3ac5aa30}
              fill="url(#paint1_linear_3_1765)"
              mask="url(#path-6-inside-1_3_1765)"
            />
          </g>
          <path
            d={svgPaths.p668af80}
            fill="var(--fill-0, #E9DEFF)"
            id="Subtract"
          />
          <circle
            cx="132.698"
            cy="96.0076"
            fill="var(--fill-0, black)"
            id="Ellipse 6011"
            r="21.1847"
            transform="rotate(30 132.698 96.0076)"
          />
        </g>
        <defs>
          <clipPath
            id="bgblur_0_3_1765_clip_path"
            transform="translate(-22.5482 -166.971)"
          >
            <path d={svgPaths.p3f6bc3c0} />
          </clipPath>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_3_1765"
            x1="38.3212"
            x2="83.4243"
            y1="252.513"
            y2="180.857"
          >
            <stop stopColor="#9C75FF" />
            <stop offset="1" stopColor="#9C75FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint1_linear_3_1765"
            x1="65.2705"
            x2="69.4158"
            y1="190.17"
            y2="254.932"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div
      className="bg-[#6700ce] content-stretch flex flex-col gap-[20px] h-[483px] items-start overflow-clip p-[36px] relative rounded-[30px] shrink-0 w-[410px]"
      data-name="Container"
    >
      <p
        className="font-['Atyp_BL:Semibold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[32px] text-white"
        style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
      >
        Ship Fast
      </p>
      <p
        className="font-['Atyp_BL:Medium',sans-serif] h-[141.289px] leading-[1.3] not-italic relative shrink-0 text-[20px] text-[rgba(255,255,255,0.8)] w-[344.179px] whitespace-pre-wrap"
        style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
      >
        White-label DEX in minutes. SDK: full custom integration in days.
      </p>
      <div
        className="absolute flex h-[296.01px] items-center justify-center left-[152.85px] top-[179.7px] w-[257.15px]"
        style={
          {
            "--transform-inner-width": "1200",
            "--transform-inner-height": "19",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-[8.1deg]">
          <WhyIconContainer4 />
        </div>
      </div>
    </div>
  );
}

function WhyIconContainer7() {
  return (
    <div
      className="absolute h-[201.332px] left-0 top-0 w-[155.267px]"
      data-name="Why Icon Container"
    >
      <div className="absolute inset-[0_-8.34%_-10.11%_-8.34%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 181.175 221.688"
        >
          <g id="Why Icon Container">
            <path
              d={svgPaths.pc160080}
              fill="var(--fill-0, #E9DEFF)"
              id="Union"
            />
            <g filter="url(#filter0_d_3_1755)" id="Why Icon Container_2">
              <rect
                data-figma-bg-blur-radius="20.0993"
                fill="var(--fill-0, #9C75FF)"
                height="130.621"
                id="Why Icon"
                rx="24"
                width="130.621"
                x="37.6001"
                y="70.7109"
              />
              <g
                data-figma-bg-blur-radius="16.5099"
                filter="url(#filter2_d_3_1755)"
                id="Why Icon_2"
              >
                <rect
                  fill="url(#paint0_linear_3_1755)"
                  fillOpacity="0.6"
                  height="130.621"
                  rx="24"
                  shapeRendering="crispEdges"
                  width="130.621"
                  x="12.9541"
                  y="70.7109"
                />
                <rect
                  height="128.621"
                  rx="23"
                  shapeRendering="crispEdges"
                  stroke="url(#paint1_linear_3_1755)"
                  strokeWidth="2"
                  width="128.621"
                  x="13.9541"
                  y="71.7109"
                />
              </g>
              <path
                d={svgPaths.pb108e00}
                fill="var(--fill-0, black)"
                id="Union_2"
              />
            </g>
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="156.529"
              id="filter0_d_3_1755"
              width="181.175"
              x="0"
              y="65.1592"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dy="7.40234" />
              <feGaussianBlur stdDeviation="6.47705" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.247059 0 0 0 0 0 0 0 0 0 0.52549 0 0 0 0.2 0"
              />
              <feBlend
                in2="BackgroundImageFix"
                mode="normal"
                result="effect1_dropShadow_3_1755"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_3_1755"
                mode="normal"
                result="shape"
              />
            </filter>
            <clipPath
              id="bgblur_0_3_1755_clip_path"
              transform="translate(-17.5008 -50.6116)"
            >
              <rect
                height="130.621"
                rx="24"
                width="130.621"
                x="37.6001"
                y="70.7109"
              />
            </clipPath>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="164.466"
              id="filter2_d_3_1755"
              width="163.641"
              x="-3.55585"
              y="54.201"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dy="6.60398" />
              <feGaussianBlur stdDeviation="5.36573" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              />
              <feBlend
                in2="BackgroundImageFix"
                mode="normal"
                result="effect1_dropShadow_3_1755"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_3_1755"
                mode="normal"
                result="shape"
              />
            </filter>
            <clipPath
              id="bgblur_1_3_1755_clip_path"
              transform="translate(3.55585 -54.201)"
            >
              <rect
                height="130.621"
                rx="24"
                width="130.621"
                x="12.9541"
                y="70.7109"
              />
            </clipPath>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint0_linear_3_1755"
              x1="156.693"
              x2="19.6673"
              y1="142.364"
              y2="65.9033"
            >
              <stop stopColor="#9C75FF" />
              <stop offset="1" stopColor="#9C75FF" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint1_linear_3_1755"
              x1="12.9541"
              x2="136.044"
              y1="52.7096"
              y2="230.292"
            >
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function WhyIconContainer6() {
  return (
    <div
      className="absolute contents left-[205px] top-[228.92px]"
      data-name="Why Icon Container"
    >
      <WhyIconContainer7 />
    </div>
  );
}

function WhyIconContainer5() {
  return (
    <div
      className="absolute contents left-[205px] top-[228.92px]"
      data-name="Why Icon Container"
    >
      <WhyIconContainer6 />
    </div>
  );
}

function Container4() {
  return (
    <div
      className="bg-[#3f0086] content-stretch flex flex-col gap-[20px] h-[483px] items-start overflow-clip p-[36px] relative rounded-[30px] shrink-0 w-[410px]"
      data-name="Container"
    >
      <p
        className="font-['Atyp_BL:Semibold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[32px] text-white"
        style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
      >
        Self Custody
      </p>
      <p
        className="font-['Atyp_BL:Medium',sans-serif] h-[141.289px] leading-[1.3] not-italic relative shrink-0 text-[20px] text-[rgba(255,255,255,0.8)] w-[344.875px] whitespace-pre-wrap"
        style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
      >
        User funds stay on-chain. No counterparty risk. Sleep at night.
      </p>
      <WhyIconContainer5 />
    </div>
  );
}

function WhyIconContainer8() {
  return (
    <div
      className="absolute h-[169.79px] left-[170.12px] top-[255.29px] w-[187.287px]"
      data-name="Why Icon Container"
    >
      <div className="absolute inset-[-1.71%_0_-9.85%_0]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 187.287 189.421"
        >
          <g id="Why Icon Container">
            <path
              d={svgPaths.p1cfc0980}
              fill="var(--fill-0, #3F0086)"
              id="Exclude"
            />
            <g
              data-figma-bg-blur-radius="16.5099"
              filter="url(#filter0_d_1_1005)"
              id="Exclude_2"
            >
              <path
                d={svgPaths.p1fd04200}
                fill="url(#paint0_linear_1_1005)"
                fillOpacity="0.6"
                shapeRendering="crispEdges"
              />
              <path
                d={svgPaths.p3c48f500}
                shapeRendering="crispEdges"
                stroke="url(#paint1_linear_1_1005)"
                strokeWidth="2"
              />
            </g>
            <path
              d={svgPaths.p18364080}
              id="Vector 7692"
              stroke="var(--stroke-0, #E9DEFF)"
              strokeWidth="16"
            />
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="201.803"
              id="filter0_d_1_1005"
              width="173.241"
              x="-16.5099"
              y="-12.3825"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dx="12" dy="6.60398" />
              <feGaussianBlur stdDeviation="5.36573" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              />
              <feBlend
                in2="BackgroundImageFix"
                mode="normal"
                result="effect1_dropShadow_1_1005"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_1_1005"
                mode="normal"
                result="shape"
              />
            </filter>
            <clipPath
              id="bgblur_0_1_1005_clip_path"
              transform="translate(16.5099 12.3825)"
            >
              <path d={svgPaths.p1fd04200} />
            </clipPath>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint0_linear_1_1005"
              x1="147.457"
              x2="-6.93914"
              y1="96.0422"
              y2="28.0489"
            >
              <stop stopColor="#9C75FF" />
              <stop offset="1" stopColor="#9C75FF" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint1_linear_1_1005"
              x1="47.9597"
              x2="121.377"
              y1="30.0012"
              y2="149.643"
            >
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div
      className="bg-[#6700ce] content-stretch flex flex-col gap-[20px] h-[483px] items-start overflow-clip p-[36px] relative rounded-[30px] shrink-0 w-[410px]"
      data-name="Container"
    >
      <p
        className="font-['Atyp_BL:Semibold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[32px] text-white"
        style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
      >
        Battle-Tested
      </p>
      <p
        className="font-['Atyp_BL:Medium',sans-serif] h-[141.289px] leading-[1.3] not-italic relative shrink-0 text-[20px] text-[rgba(255,255,255,0.8)] w-[344.875px] whitespace-pre-wrap"
        style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
      >
        $30B+ cumulative volume. Multiple audits. 1M+ users across the
        ecosystem.
      </p>
      <WhyIconContainer8 />
    </div>
  );
}

function WhyContentList({
  scrollRef,
  onScroll,
}: {
  scrollRef: React.RefObject<HTMLDivElement>;
  onScroll: () => void;
}) {
  return (
    <div
      ref={scrollRef}
      onScroll={onScroll}
      className="absolute left-[69.15px] top-[2448.38px] overflow-x-auto overscroll-x-none hide-scrollbar"
      style={{ width: "1380px", scrollbarWidth: "none" } as React.CSSProperties}
      data-name="Why Content List"
    >
      <ImportedWhyContent />
    </div>
  );
}

function WhyContent({
  scrollRef,
  onScroll,
}: {
  scrollRef: React.RefObject<HTMLDivElement>;
  onScroll: () => void;
}) {
  return (
    <div
      className="absolute contents left-[69.15px] top-[2448.38px]"
      data-name="Why Content"
    >
      <WhyContentList scrollRef={scrollRef} onScroll={onScroll} />
    </div>
  );
}

function WhySection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollPosition();
  }, []);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -435, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 435, behavior: "smooth" });
    }
  };

  return (
    <div
      className="absolute contents left-[69.15px] top-[2313.4px]"
      data-name="Why Section"
    >
      <WhyHeader
        onScrollLeft={handleScrollLeft}
        onScrollRight={handleScrollRight}
        canScrollLeft={canScrollLeft}
        canScrollRight={canScrollRight}
      />
      <WhyContent scrollRef={scrollRef} onScroll={checkScrollPosition} />
    </div>
  );
}

function BuildButtonContainer() {
  return (
    <a
      href="https://dex.orderly.network/"
      target="_blank"
      rel="noopener noreferrer"
      className="content-stretch flex gap-[7px] items-end justify-end relative shrink-0 w-full no-underline hover:opacity-80 transition-opacity"
      data-name="Build Button Container"
      onClick={() => {
        posthog.capture("homepage_card_clicked", {
          card_name: "dex",
          source_page: "homepage",
          device_layout: "desktop",
          section: "on_orderly",
        });
      }}
    >
      <p
        className="font-['Atyp_BL:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[20px] text-white tracking-[0.2px]"
        style={{
          fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06', 'liga' 0",
        }}
      >
        Orderly One
      </p>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none rotate-180">
          <div
            className="overflow-clip relative size-[16px]"
            data-name="Build Button Icon"
          >
            <div className="absolute inset-[10.42%]" data-name="Union">
              <svg
                className="absolute block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 12.6133 12.6133"
              >
                <path
                  d={svgPaths.p35ba4800}
                  fill="var(--fill-0, white)"
                  id="Union"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

function Container6() {
  return (
    <div
      className="bg-[#3f0086] content-stretch flex flex-col gap-[217px] h-[483px] items-start overflow-clip p-[35px] relative rounded-[30px] shrink-0 w-[410px]"
      data-name="Container"
    >
      <p
        data-name="Launch a branded Perp DEX"
        className="font-['Atyp_BL:Semibold',sans-serif] h-[173px] leading-[1.2] not-italic relative shrink-0 text-[45px] text-white w-full whitespace-pre-wrap"
        style={{ fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06'" }}
      >
        Launch a branded Perp DEX
      </p>
      <BuildButtonContainer />
    </div>
  );
}

function BuildButtonContainer1() {
  return (
    <a
      href="https://orderly.network/docs/build-on-omnichain/evm-api/introduction"
      target="_blank"
      rel="noopener noreferrer"
      className="content-stretch flex gap-[7px] items-end justify-end relative shrink-0 w-full no-underline hover:opacity-80 transition-opacity"
      data-name="Build Button Container"
      onClick={() => {
        posthog.capture("homepage_card_clicked", {
          card_name: "build",
          source_page: "homepage",
          device_layout: "desktop",
          section: "on_orderly",
        });
      }}
    >
      <p
        className="font-['Atyp_BL:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[20px] text-white tracking-[0.2px]"
        style={{
          fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06', 'liga' 0",
        }}
      >{`SDK & API`}</p>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none rotate-180">
          <div
            className="overflow-clip relative size-[16px]"
            data-name="Build Button Icon"
          >
            <div className="absolute inset-[10.42%]" data-name="Union">
              <svg
                className="absolute block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 12.6133 12.6133"
              >
                <path
                  d={svgPaths.p35ba4800}
                  fill="var(--fill-0, white)"
                  id="Union"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

function BuildButtonContainerVault() {
  return (
    <a
      href="http://app.orderly.network/vaults"
      target="_blank"
      rel="noopener noreferrer"
      className="content-stretch flex gap-[7px] items-end justify-end relative shrink-0 w-full no-underline hover:opacity-80 transition-opacity"
      data-name="Build Button Container"
      onClick={() => {
        posthog.capture("homepage_cta_clicked", {
          cta_name: "vaults",
          source_page: "homepage",
          device_layout: "desktop",
        });
        posthog.capture("homepage_card_clicked", {
          card_name: "vaults",
          source_page: "homepage",
          device_layout: "desktop",
          section: "on_orderly",
        });
      }}
    >
      <p
        className="font-['Atyp_BL:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[20px] text-white tracking-[0.2px]"
        style={{
          fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06', 'liga' 0",
        }}
      >
        Vaults
      </p>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none rotate-180">
          <div
            className="overflow-clip relative size-[16px]"
            data-name="Build Button Icon"
          >
            <div className="absolute inset-[10.42%]" data-name="Union">
              <svg
                className="absolute block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 12.6133 12.6133"
              >
                <path
                  d={svgPaths.p35ba4800}
                  fill="var(--fill-0, white)"
                  id="Union"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

function Container7() {
  return (
    <div
      className="bg-[#6700ce] content-stretch flex flex-col gap-[217px] h-[483px] items-start overflow-clip p-[35px] relative rounded-[30px] shrink-0 w-[410px]"
      data-name="Container"
    >
      <p
        className="font-['Atyp_BL:Semibold',sans-serif] h-[173px] leading-[1.2] not-italic relative shrink-0 text-[45px] text-white w-full whitespace-pre-wrap"
        style={{ fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06'" }}
      >
        Add perps to your dApp or wallet
      </p>
      <BuildButtonContainer1 />
    </div>
  );
}

function ContainerVaults() {
  return (
    <div
      className="bg-[#3f0086] content-stretch flex flex-col gap-[217px] h-[483px] items-start overflow-clip p-[35px] relative rounded-[30px] shrink-0 w-[410px]"
      data-name="Container"
    >
      <p
        className="font-['Atyp_BL:Semibold',sans-serif] h-[173px] leading-[1.2] not-italic relative shrink-0 text-[45px] text-white w-full whitespace-pre-wrap"
        style={{ fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06'" }}
      >
        Earn with Vaults
      </p>
      <BuildButtonContainerVault />
    </div>
  );
}

function BuildButtonContainer2() {
  return (
    <a
      href="https://orderly.network/listing/"
      target="_blank"
      rel="noopener noreferrer"
      className="content-stretch flex gap-[7px] items-end justify-end relative shrink-0 w-full no-underline hover:opacity-80 transition-opacity"
      data-name="Build Button Container"
      onClick={() => {
        posthog.capture("homepage_card_clicked", {
          card_name: "listings",
          source_page: "homepage",
          device_layout: "desktop",
          section: "on_orderly",
        });
      }}
    >
      <p
        className="font-['Atyp_BL:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[20px] text-white tracking-[0.2px]"
        style={{
          fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06', 'liga' 0",
        }}
      >
        Listings
      </p>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none rotate-180">
          <div
            className="overflow-clip relative size-[16px]"
            data-name="Build Button Icon"
          >
            <div className="absolute inset-[10.42%]" data-name="Union">
              <svg
                className="absolute block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 12.6133 12.6133"
              >
                <path
                  d={svgPaths.p35ba4800}
                  fill="var(--fill-0, white)"
                  id="Union"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

function Container8() {
  return (
    <div
      className="bg-[#6700ce] content-stretch flex flex-col gap-[217px] h-[483px] items-start overflow-clip p-[35px] relative rounded-[30px] shrink-0 w-[410px]"
      data-name="Container"
    >
      <p
        className="font-['Atyp_BL:Semibold',sans-serif] h-[173px] leading-[1.2] not-italic relative shrink-0 text-[45px] text-white w-full whitespace-pre-wrap"
        style={{ fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06'" }}
      >
        List your token
      </p>
      <BuildButtonContainer2 />
    </div>
  );
}

function BuildButtonContainer3() {
  return (
    <a
      href="https://dex.orderly.network/"
      target="_blank"
      rel="noopener noreferrer"
      className="content-stretch flex gap-[7px] items-end justify-end relative shrink-0 w-full no-underline hover:opacity-80 transition-opacity"
      data-name="Build Button Container"
      onClick={() => {
        posthog.capture("homepage_card_clicked", {
          card_name: "start_building",
          source_page: "homepage",
          device_layout: "desktop",
          section: "on_orderly",
        });
      }}
    >
      <p
        className="font-['Atyp_BL:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[20px] text-white tracking-[0.2px]"
        style={{ fontFeatureSettings: "'liga' 0" }}
      >
        Start Building
      </p>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none rotate-180">
          <div
            className="overflow-clip relative size-[16px]"
            data-name="Build Button Icon"
          >
            <div className="absolute inset-[10.42%]" data-name="Union">
              <svg
                className="absolute block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 12.6133 12.6133"
              >
                <path
                  d={svgPaths.p35ba4800}
                  fill="var(--fill-0, white)"
                  id="Union"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

function Container9() {
  return (
    <div
      className="bg-[#3f0086] content-stretch flex flex-col gap-[217px] h-[483px] items-start overflow-clip p-[35px] relative rounded-[30px] shrink-0 w-[410px]"
      data-name="Container"
    >
      <p
        className="font-['Atyp_BL:Semibold',sans-serif] h-[173px] leading-[1.2] not-italic relative shrink-0 text-[45px] text-white w-full whitespace-pre-wrap"
        style={{ fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06'" }}
      >
        Building trading tools
      </p>
      <BuildButtonContainer3 />
    </div>
  );
}

function BuildContentList({
  scrollRef,
  onScroll,
}: {
  scrollRef: React.RefObject<HTMLDivElement>;
  onScroll: () => void;
}) {
  return (
    <div
      ref={scrollRef}
      onScroll={onScroll}
      className="absolute left-[69.15px] top-[3276.78px] overflow-x-auto overscroll-x-none flex gap-[25px] items-center hide-scrollbar"
      style={{ width: "1380px", scrollbarWidth: "none" } as React.CSSProperties}
      data-name="Build Content List"
    >
      <Container6 />
      <Container7 />
      <ContainerVaults />
      <Container8 />
      <Container9 />
    </div>
  );
}

function BuildContent1({
  scrollRef,
  onScroll,
}: {
  scrollRef: React.RefObject<HTMLDivElement>;
  onScroll: () => void;
}) {
  return (
    <div
      className="absolute contents left-[69.15px] top-[3276.78px]"
      data-name="Build Content"
    >
      <BuildContentList scrollRef={scrollRef} onScroll={onScroll} />
    </div>
  );
}

function BuildContent({
  scrollRef,
  onScroll,
}: {
  scrollRef: React.RefObject<HTMLDivElement>;
  onScroll: () => void;
}) {
  return (
    <div
      className="absolute contents left-[69.15px] top-[3276.78px]"
      data-name="Build Content"
    >
      <BuildContent1 scrollRef={scrollRef} onScroll={onScroll} />
    </div>
  );
}

function BuildTitleContainer2() {
  return (
    <div
      className="absolute contents left-[69.15px] top-[3155.78px]"
      data-name="Build Title Container"
    >
      <p
        className="absolute font-['Atyp_BL:Bold',sans-serif] leading-[1.1] left-[69.15px] not-italic text-[56px] text-white top-[3155.78px] w-[876px] whitespace-pre-wrap"
        style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
      >
        On Orderly
      </p>
    </div>
  );
}

function BuildTitleContainer1() {
  return (
    <div
      className="absolute contents left-[69.15px] top-[3155.78px]"
      data-name="Build Title Container"
    >
      <BuildTitleContainer2 />
    </div>
  );
}

function BuildTitleContainer() {
  return (
    <div
      className="absolute contents left-[69.15px] top-[3155.78px]"
      data-name="Build Title Container"
    >
      <BuildTitleContainer1 />
    </div>
  );
}

function ArrowLeftCircle2({ isEnabled = true }: { isEnabled?: boolean }) {
  const fillColor = isEnabled ? "#3F0086" : "#1E2026";
  const strokeColor = isEnabled ? "white" : "#2B2F36";

  return (
    <div className="relative size-[44px]" data-name="Arrow left-circle">
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 44 44"
      >
        <g id="Arrow left-circle">
          <g id="Icon">
            <path d={svgPaths.p381f4a00} fill={fillColor} />
            <path d={svgPaths.p3931f600} fill={fillColor} />
            <path
              d={svgPaths.p183c5500}
              stroke={fillColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            />
          </g>
          <path
            d={svgPaths.p3250c180}
            id="Icon_2"
            stroke={strokeColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
        </g>
      </svg>
    </div>
  );
}

function ArrowLeftCircle3({ isEnabled = false }: { isEnabled?: boolean }) {
  const fillColor = isEnabled ? "#3F0086" : "#1E2026";
  const strokeColor = isEnabled ? "white" : "#2B2F36";

  return (
    <div className="size-[44px]" data-name="Arrow left-circle">
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 44 44"
      >
        <g id="Arrow left-circle">
          <g id="Icon">
            <path d={svgPaths.pada5200} fill={fillColor} />
            <path d={svgPaths.p2de5c480} fill={fillColor} />
            <path
              d={svgPaths.p22baf0c0}
              stroke={fillColor}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            />
          </g>
          <path
            d={svgPaths.p3250c180}
            id="Icon_2"
            stroke={strokeColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
        </g>
      </svg>
    </div>
  );
}

function BuildHeader({
  onScrollLeft,
  onScrollRight,
  canScrollLeft,
  canScrollRight,
}: {
  onScrollLeft: () => void;
  onScrollRight: () => void;
  canScrollLeft: boolean;
  canScrollRight: boolean;
}) {
  return (
    <div
      className="absolute contents left-[69.15px] top-[3146.78px]"
      data-name="Build Header"
    >
      <BuildTitleContainer />
      <button
        onClick={onScrollRight}
        disabled={!canScrollRight}
        className="absolute flex items-center justify-center left-[1332.15px] size-[44px] top-[3146.78px] bg-transparent border-0 transition-opacity p-0"
        style={{ cursor: canScrollRight ? "pointer" : "not-allowed" }}
      >
        <div className="flex-none rotate-180">
          <ArrowLeftCircle2 isEnabled={canScrollRight} />
        </div>
      </button>
      <button
        onClick={onScrollLeft}
        disabled={!canScrollLeft}
        className="absolute left-[1278.15px] size-[44px] top-[3146.78px] bg-transparent border-0 transition-opacity p-0"
        style={{ cursor: canScrollLeft ? "pointer" : "not-allowed" }}
      >
        <ArrowLeftCircle3 isEnabled={canScrollLeft} />
      </button>
    </div>
  );
}

function BuildSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollPosition();
  }, []);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -435, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 435, behavior: "smooth" });
    }
  };

  return (
    <div
      className="absolute contents left-[69.15px] top-[3146.78px]"
      data-name="Build Section"
    >
      <BuildContent scrollRef={scrollRef} onScroll={checkScrollPosition} />
      <BuildHeader
        onScrollLeft={handleScrollLeft}
        onScrollRight={handleScrollRight}
        canScrollLeft={canScrollLeft}
        canScrollRight={canScrollRight}
      />
    </div>
  );
}

function FeatureIcon() {
  return (
    <div
      className="bg-[#6700ce] content-stretch flex flex-col items-center justify-center px-[24px] py-[5px] relative rounded-[40px] shrink-0 size-[80px]"
      data-name="Feature Icon"
    >
      <p className="font-['Atyp_BL:Semibold',sans-serif] h-[65px] leading-[1.2] not-italic relative shrink-0 text-[50px] text-center text-white w-[27px] whitespace-pre-wrap">
        1
      </p>
    </div>
  );
}

function FeatureItem() {
  return (
    <div
      className="content-stretch flex flex-col gap-[39px] items-center relative shrink-0 w-[313px]"
      data-name="Feature Item"
    >
      <FeatureIcon />
      <p
        className="font-['Atyp_BL:Display_-_Bold',sans-serif] font-bold leading-[1.2] min-w-full relative shrink-0 text-[48px] text-center text-white w-[min-content] whitespace-pre-wrap"
        style={{ fontVariationSettings: "'ital' 0, 'opsz' 72" }}
      >
        Connect
      </p>
      <p
        className="font-['Atyp_BL:Display_-_Medium',sans-serif] font-[507] leading-[1.3] relative shrink-0 text-center text-white tracking-[-0.21px] w-[320px] whitespace-pre-wrap text-[23px]"
        style={{
          fontVariationSettings: "'ital' 0, 'opsz' 72",
          fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06'",
        }}
      >
        Plug into Orderly’s shared orderbook via SDK or white-label
        (OrderlyOne).
      </p>
    </div>
  );
}

function FeatureIcon1() {
  return (
    <div
      className="bg-[#6700ce] content-stretch flex flex-col items-center justify-center px-[24px] py-[5px] relative rounded-[40px] shrink-0 size-[80px]"
      data-name="Feature Icon"
    >
      <p className="font-['Atyp_BL:Semibold',sans-serif] h-[67px] leading-[1.2] not-italic relative shrink-0 text-[50px] text-center text-white w-[32px] whitespace-pre-wrap">
        2
      </p>
    </div>
  );
}

function FeatureItem1() {
  return (
    <div
      className="content-stretch flex flex-col gap-[39px] items-center relative shrink-0 w-[312.726px]"
      data-name="Feature Item"
    >
      <FeatureIcon1 />
      <p
        className="font-['Atyp_BL:Display_-_Bold',sans-serif] font-bold leading-[1.2] min-w-full relative shrink-0 text-[48px] text-center text-white w-[min-content] whitespace-pre-wrap"
        style={{ fontVariationSettings: "'ital' 0, 'opsz' 72" }}
      >
        Customize
      </p>
      <p
        className="font-['Atyp_BL:Display_-_Medium',sans-serif] font-[507] leading-[1.3] relative shrink-0 text-center text-white tracking-[-0.3125px] w-[315px] whitespace-pre-wrap text-[23px]"
        style={{
          fontVariationSettings: "'ital' 0, 'opsz' 72",
          fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06'",
        }}
      >
        Brand it, set fees, choose your chain. Your exchange, your rules.
      </p>
    </div>
  );
}

function FeatureIcon2() {
  return (
    <div
      className="bg-[#6700ce] content-stretch flex flex-col items-center justify-center px-[24px] py-[5px] relative rounded-[40px] shrink-0 size-[80px]"
      data-name="Feature Icon"
    >
      <p className="font-['Atyp_BL:Semibold',sans-serif] h-[65px] leading-[1.2] not-italic relative shrink-0 text-[50px] text-center text-white w-[29px] whitespace-pre-wrap">
        3
      </p>
    </div>
  );
}

function FeatureItem2() {
  return (
    <div
      className="content-stretch flex flex-col gap-[39px] items-center relative shrink-0 w-[312.726px]"
      data-name="Feature Item"
    >
      <FeatureIcon2 />
      <p
        className="font-['Atyp_BL:Display_-_Bold',sans-serif] font-bold leading-[1.2] min-w-full relative shrink-0 text-[48px] text-center text-white w-[min-content] whitespace-pre-wrap"
        style={{ fontVariationSettings: "'ital' 0, 'opsz' 72" }}
      >
        Earn
      </p>
      <p
        className="font-['Atyp_BL:Display_-_Medium',sans-serif] font-[507] leading-[1.3] relative shrink-0 text-center text-white tracking-[-0.3125px] w-[315px] whitespace-pre-wrap text-[20px] text-[23px]"
        style={{
          fontVariationSettings: "'ital' 0, 'opsz' 72",
          fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06'",
        }}
      >
        Every trade on your frontend = revenue to you. Day one.
      </p>
    </div>
  );
}

function FeaturesList() {
  return (
    <div
      className="content-stretch flex items-start justify-between relative shrink-0 w-full"
      data-name="Features List"
    >
      <FeatureItem />
      <FeatureItem1 />
      <FeatureItem2 />
    </div>
  );
}

function FeaturesContainer() {
  return (
    <div
      className="col-1 content-stretch flex flex-col items-start ml-0 mt-0 relative row-1 w-[1302.014px]"
      data-name="Features Container"
    >
      <FeaturesList />
    </div>
  );
}

function FeaturesSection() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
      data-name="Features Section"
    >
      <div
        className="col-1 flex h-[1.805px] items-center justify-center ml-[143.01px] mt-[40.02px] relative row-1 w-[1016.028px]"
        style={
          {
            "--transform-inner-width": "1200",
            "--transform-inner-height": "19",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-[0.1deg]">
          <div className="h-0 relative w-[1016.03px]">
            <div className="absolute inset-[-2px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1016.03 2"
              >
                <line
                  id="Line 11"
                  stroke="var(--stroke-0, #6700CE)"
                  strokeDasharray="5 5"
                  strokeWidth="2"
                  x2="1016.03"
                  y1="1"
                  y2="1"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <FeaturesContainer />
    </div>
  );
}

function HeroSection() {
  return (
    <div
      className="absolute content-stretch flex flex-col gap-[56px] items-start left-[69.63px] top-[1686.89px] w-[1305.014px]"
      data-name="Hero Section"
    >
      <p
        className="font-['Atyp_BL:Bold',sans-serif] h-[70px] leading-[1.1] not-italic relative shrink-0 text-[56px] text-center text-white w-full whitespace-pre-wrap"
        style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
      >
        From zero to live DEX in one integration
      </p>
      <FeaturesSection />
    </div>
  );
}

export default function Frame7() {
  const [modalOpen, setModalOpen] = useState(false);
  const [partnershipModalOpen, setPartnershipModalOpen] = useState(false);

  // Animation configuration for sequential section reveals
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const transition = {
    duration: 0.7,
    ease: [0.22, 0.61, 0.36, 1] as const,
  };

  return (
    <div className="bg-black relative size-full">
      {/* Background decorative elements - no animation */}
      <div className="absolute flex top-[785.79px] left-[1111.86px] items-center justify-center">
        <div className="flex-none h-[411.123px] rotate-45 w-[410.8px]">
          <BackgroundVector />
        </div>
      </div>
      <div className="absolute flex top-[539.94px] left-[106.3px] items-center justify-center">
        <div className="-rotate-30 flex-none h-[268.859px] w-[268.648px]">
          <BackgroundVector1 />
        </div>
      </div>
      <div
        className="absolute flex h-[433.837px] items-center justify-center left-[-143.68px] top-[858.06px] w-[573.173px]"
        style={
          {
            "--transform-inner-width": "1200",
            "--transform-inner-height": "19",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-[24.52deg]">
          <div className="h-[239.242px] relative w-[520.857px]">
            <svg
              className="absolute block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 520.857 239.242"
            >
              <ellipse
                cx="260.429"
                cy="119.621"
                fill="var(--fill-0, #3F0086)"
                id="Ellipse 6007"
                rx="260.429"
                ry="119.621"
              />
            </svg>
          </div>
        </div>
      </div>
      <div
        className="absolute flex h-[78.336px] items-center justify-center left-[40.75px] top-[787.05px] w-[78.297px]"
        style={
          {
            "--transform-inner-width": "1200",
            "--transform-inner-height": "19",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-[24.52deg]">
          <div className="h-[59.153px] relative w-[59.075px]">
            <svg
              className="absolute block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 59.0751 59.153"
            >
              <ellipse
                cx="29.5376"
                cy="29.5765"
                fill="var(--fill-0, #6700CE)"
                id="Ellipse 6008"
                rx="29.5376"
                ry="29.5765"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute h-[374.798px] left-[1019.16px] top-[409px] w-[336.94px]">
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 336.94 374.798"
        >
          <path
            d={svgPaths.p21fe2280}
            fill="var(--fill-0, #9C75FF)"
            id="Vector 7"
          />
        </svg>
      </div>
      <MacbookVideo className="-translate-x-1/2 absolute h-[670.158px] left-[calc(50%-0.1px)] top-[655.33px] w-[900.323px]" />

      {/* Nav - appears immediately on load */}
      {/* Header is rendered outside ScaledFrame in Home.tsx */}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={transition}
      >
        <Frame
          onOpenModal={() => setModalOpen(true)}
          onOpenPartnershipModal={() => setPartnershipModalOpen(true)}
        />
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ ...transition, delay: 0.1 }}
      >
        <HeroSection />
      </motion.div>

      {/* Feature Tags */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ ...transition, delay: 0.2 }}
      >
        <FeatureTag />
        <FeatureTag1 />
        <FeatureTag2 />
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ ...transition, delay: 0.3 }}
      >
        <StatsSection />
      </motion.div>

      {/* Build Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ ...transition, delay: 0.4 }}
      >
        <BuildSection />
      </motion.div>

      {/* Why Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        transition={{ ...transition, delay: 0.5 }}
      >
        <WhySection />
      </motion.div>

      {/* QuickStart → Footer: unified flow layout for consistent section spacing */}
      <div className="absolute left-0 top-[3876px] flex flex-col gap-[120px] w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ ...transition, delay: 0.6 }}
        >
          <QuickStartSection />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ ...transition, delay: 0.7 }}
        >
          <TrustedSection />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ ...transition, delay: 0.8 }}
        >
          <div className="flex flex-col gap-[80px]">
            <Frame1
              onOpenPartnershipModal={() => setPartnershipModalOpen(true)}
            />
            <Frame12 />
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ ...transition, delay: 0.9 }}
          style={{ marginTop: -120 }}
        >
          <FooterSection />
          <div className="flex items-center justify-between px-[68.89px] mt-[40px] pb-[48px]">
            <p
              className="font-['Atyp_BL:Semibold',sans-serif] leading-[1.2] not-italic text-[12px] text-white tracking-[0.12px] whitespace-pre-wrap"
              style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}
            >
              © 2026 Orderly Network
            </p>
            <div className="flex gap-[40px]">
              <a
                href="https://orderly.network/docs/introduction/terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
                className="font-['Atyp_BL:Regular',sans-serif] leading-[1.2] not-italic text-[12px] text-white tracking-[0.12px] whitespace-nowrap no-underline hover:opacity-80 transition-opacity"
              >
                Terms of Service
              </a>
              <a
                href="https://orderly.network/docs/introduction/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-['Atyp_BL:Regular',sans-serif] leading-[1.2] not-italic text-[12px] text-white tracking-[0.12px] whitespace-nowrap no-underline hover:opacity-80 transition-opacity"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Partnership Form Modal */}
      {partnershipModalOpen && (
        <PartnershipFormModal onClose={() => setPartnershipModalOpen(false)} />
      )}
    </div>
  );
}

// ─── NavCanvas: exact 1440×200 slice containing the Figma Default nav ────────
export function NavCanvas() {
  return (
    <div style={{ position: "relative", width: 1440, height: 200 }}>
      <div
        className="absolute backdrop-blur-[8.65px] content-stretch flex gap-[58px] h-[100px] items-center left-[81.9px] p-[40px] rounded-[130px] top-[50px] w-[1278px] z-[100]"
        data-name="Default"
      >
        <HeaderLogoContainer />
        <HeaderMenu />
      </div>
    </div>
  );
}

// ─── Shared footer: same inner components, normal-flow wrapper ────────────────
export function SiteFooter() {
  const [buyOrderOpen, setBuyOrderOpen] = useState(false);

  return (
    <footer style={{ background: "#000", paddingTop: 60 }}>
      {/* Purple footer card */}
      <div style={{ maxWidth: 1302, margin: "0 auto", padding: "0 24px 24px" }}>
        <div
          style={{
            background: "#6700ce",
            borderRadius: 30,
            overflow: "hidden",
          }}
        >
          {/* Top: ORDER price + link columns */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              padding: "60px 60px 60px",
              gap: 40,
            }}
          >
            <StatusMessageContainer />
            <Frame8 />
          </div>
          {/* Bottom bar: all systems + social icons */}
          <Frame10 />
          <div style={{ height: 24 }} />
        </div>

        {/* Copyright row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 0",
          }}
        >
          <p
            style={{
              fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
              fontVariationSettings: "'wght' 600",
              fontSize: 12,
              color: "white",
              letterSpacing: "0.12px",
              margin: 0,
            }}
          >
            © 2026 Orderly Network
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            <a
              href="https://orderly.network/docs/introduction/terms-of-service"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                fontSize: 12,
                color: "white",
                letterSpacing: "0.12px",
                textDecoration: "none",
                opacity: 0.8,
              }}
            >
              Terms of Service
            </a>
            <a
              href="https://orderly.network/docs/introduction/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                fontSize: 12,
                color: "white",
                letterSpacing: "0.12px",
                textDecoration: "none",
                opacity: 0.8,
              }}
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      {buyOrderOpen && <BuyOrderModal onClose={() => setBuyOrderOpen(false)} />}
    </footer>
  );
}
