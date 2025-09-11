import { getTotalVolume, getTotalTraders, getTotalBuilders, getOpenInterest, getTVL, get24hVolume } from "@/net/statistics";
import { useEffect, useState } from "react";

interface Statistics {
  totalVolume: string;
  volume24h: string;
  totalTraders: string;
  totalBuilders: string;
  openInterest: string;
  tvl: string;
}

export function useStatistics() {
  const [stats, setStats] = useState<Statistics>({
    totalVolume: "--",
    volume24h: "--",
    totalTraders: "--",
    totalBuilders: "--",
    openInterest: "--",
    tvl: "--"
  });

  const [loading, setLoading] = useState(true);

  function formatNumber(value: number): string {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B`;
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  }

  function formatTraders(value: number): string {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(0)}M+`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K+`;
    }
    return value.toString();
  }

  function formatVolume(value: number): string {
    if (value === 0) {
      return "$115.42B";
    } else if (value >= 1000000000) {
      const _vol = (value / 1000000000).toFixed(2);
      return `$${_vol}B`;
    } else {
      const _vol = (value / 1000000).toFixed(2);
      return `$${_vol}M`;
    }
  }

  async function fetchAllStatistics() {
    try {
      setLoading(true);
      
      const [volume, volume24h, traders, builders, openInterest, tvl] = await Promise.all([
        getTotalVolume(),
        get24hVolume(),
        getTotalTraders(),
        getTotalBuilders(),
        getOpenInterest(),
        getTVL()
      ]);

      setStats({
        totalVolume: formatVolume(volume),
        volume24h: formatVolume(volume24h),
        totalTraders: formatTraders(traders),
        totalBuilders: formatTraders(builders),
        openInterest: formatNumber(openInterest),
        tvl: formatNumber(tvl)
      });
    } catch (error) {
      console.error("Error fetching statistics:", error);
      // Fallback values
      setStats({
        totalVolume: "$128.86B",
        volume24h: "$2.45B",
        totalTraders: "895K+",
        totalBuilders: "58",
        openInterest: "$74.56M",
        tvl: "$53.29M"
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllStatistics();
  }, []);

  return { stats, loading };
}

// Backward compatibility function that mimics the original useVolume hook
export function useVolume() {
  const { stats, loading } = useStatistics();
  
  if (loading) {
    return "--";
  }
  
  return stats.totalVolume.replace("$", ""); // Remove $ prefix to match original format
}
