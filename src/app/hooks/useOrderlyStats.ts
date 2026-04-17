import { useState, useEffect } from "react";

interface OrderlyStats {
  tvl: number;
  tradingVolume: number;
  liveBuilders: number;
  chains: number;
  totalVolume: number;
  openInterest: number;
}

const FALLBACK: OrderlyStats = {
  tvl: 21390000,
  tradingVolume: 42500000,
  liveBuilders: 261,
  chains: 17,
  totalVolume: 5_000_000_000,
  openInterest: 250_000_000,
};

export function useOrderlyStats(): OrderlyStats {
  const [stats, setStats] = useState<OrderlyStats>(FALLBACK);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchStats() {
      const [
        tvlRes,
        volumeRes,
        buildersRes,
        chainsRes,
        statsRes,
        volumeStatsRes,
      ] = await Promise.allSettled([
        fetch("https://api.orderly.org/v1/public/balance/stats", {
          signal,
        }).then((r) => r.json()),
        fetch("https://api.orderly.org/v1/public/futures", {
          signal,
        }).then((r) => r.json()),
        fetch("https://api.orderly.org/v1/public/broker/name", {
          signal,
        }).then((r) => r.json()),
        fetch("https://api.orderly.org/v1/public/chain_info", {
          signal,
        }).then((r) => r.json()),
        fetch("https://api.orderly.org/v1/public/stats", {
          signal,
        }).then((r) => r.json()),
        fetch("https://api.orderly.org/v1/public/volume/stats", {
          signal,
        }).then((r) => r.json()),
      ]);

      const statsData =
        statsRes.status === "fulfilled" && statsRes.value?.success
          ? statsRes.value.data
          : null;

      const volumeStatsData =
        volumeStatsRes.status === "fulfilled" && volumeStatsRes.value?.success
          ? volumeStatsRes.value.data
          : null;

      setStats({
        tvl:
          tvlRes.status === "fulfilled" && tvlRes.value?.success
            ? tvlRes.value.data.total_holding
            : FALLBACK.tvl,
        tradingVolume:
          volumeRes.status === "fulfilled" && volumeRes.value?.success
            ? volumeRes.value.data.rows.reduce(
                (sum: number, row: { "24h_amount": number }) => sum + row["24h_amount"],
                0
              )
            : FALLBACK.tradingVolume,
        liveBuilders:
          buildersRes.status === "fulfilled" && buildersRes.value?.success
            ? buildersRes.value.data.rows.length
            : FALLBACK.liveBuilders,
        chains:
          chainsRes.status === "fulfilled" && chainsRes.value?.success
            ? chainsRes.value.data.rows.length
            : FALLBACK.chains,
        totalVolume:
          // Prefer perp lifetime trading volume from the dedicated volume stats API
          volumeStatsData?.perp_volume_ltd ??
          statsData?.total_volume ??
          statsData?.cumulative_volume ??
          FALLBACK.totalVolume,
        openInterest:
          volumeRes.status === "fulfilled" && volumeRes.value?.success
            ? volumeRes.value.data.rows.reduce(
                (sum: number, row: { open_interest: number; mark_price: number }) =>
                  sum + (row.open_interest || 0) * (row.mark_price || 0),
                0
              )
            : FALLBACK.openInterest,
      });
    }

    fetchStats();
    return () => controller.abort();
  }, []);

  return stats;
}

export function formatLargeNumber(value: number): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  }
  return `$${(value / 1_000_000).toFixed(2)}M`;
}

export function formatCount(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${Math.round(value / 1_000)}K`;
  return `${Math.round(value)}`;
}
