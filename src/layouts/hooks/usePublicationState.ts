import type { PublicationStateEnum } from "@/strapi/type";
import { getPublicationState } from "@/utils";
import { useEffect, useState } from "react";

export function usePublicationState() {
  const [publicationState, setPublicationState] =
    useState<PublicationStateEnum | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const publicationState = getPublicationState(window.location?.hostname);
    setPublicationState(publicationState);
  }, []);

  return publicationState;
}
