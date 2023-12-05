import { atom } from "nanostores";
import type { Categorg } from "@/strapi/type";

export const bannerVisible = atom(true);
export const bannerHeight = atom(50);
export const navigationExpanded = atom(false);
export const whyChooseOrderlyExpandKey = atom("");
export const useCasesExpandKey = atom(0);
export const blogExpandKey = atom("");
export const blogTabData = atom<Categorg[]>([]);
