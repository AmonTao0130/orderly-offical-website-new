import { useEffect, useState } from "react";

const FALLBACK_TOTAL = 24_000;

type SeasonsResponse = {
  success?: boolean;
  data?: {
    prize_pool?: {
      total?: number | string;
    };
  };
};

export function useCompetitionPrizePoolTotal(): {
  total: number;
  ready: boolean;
} {
  const [total, setTotal] = useState<number>(FALLBACK_TOTAL);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchPrizePoolTotal() {
      try {
        const res = await fetch(
          "https://api-evm.orderly.org/v1/public/competition/seasons?season_id=1",
          { signal }
        );
        const json = (await res.json()) as SeasonsResponse;
        if (!json?.success) return;

        const raw = json.data?.prize_pool?.total;
        const next = typeof raw === "number" ? raw : Number(raw);
        if (!Number.isFinite(next)) return;

        setTotal(next);
      } catch {
        // Keep fallback on any error (including abort)
      } finally {
        // Only show banner once request has succeeded or failed.
        // If component unmounts, setState is ignored by React.
        setReady(true);
      }
    }

    fetchPrizePoolTotal();
    return () => controller.abort();
  }, []);

  return { total, ready };
}
