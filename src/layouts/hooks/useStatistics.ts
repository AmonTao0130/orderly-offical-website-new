import { getTotalVolume, getTotalTraders, getTotalBuilders, getOpenInterest, getTVL } from "@/net/statistics";
import { useEffect, useState } from "react";

interface Statistics {
  totalVolume: string;
  totalTraders: string;
  totalBuilders: string;
  openInterest: string;
  tvl: string;
}

export function useStatistics() {
  const [stats, setStats] = useState<Statistics>({
    totalVolume: "--",
    totalTraders: "--",
    totalBuilders: "--",
    openInterest: "--",
    tvl: "--"
  });

  const [loading, setLoading] = useState(true);

  function formatNumber(value: number): string {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B+`;
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M+`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K+`;
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
      return "$115.42B+";
    } else {
      const _vol = (value / 1000000000).toFixed(2);
      return `$${_vol}B+`;
    }
  }

  async function fetchAllStatistics() {
    try {
      setLoading(true);
      
      const [volume, traders, builders, openInterest, tvl] = await Promise.all([
        getTotalVolume(),
        getTotalTraders(),
        getTotalBuilders(),
        getOpenInterest(),
        getTVL()
      ]);

      setStats({
        totalVolume: formatVolume(volume),
        totalTraders: formatTraders(traders),
        totalBuilders: formatTraders(builders),
        openInterest: formatNumber(openInterest),
        tvl: formatNumber(tvl)
      });
    } catch (error) {
      console.error("Error fetching statistics:", error);
      // Fallback values
      setStats({
        totalVolume: "$115.42B+",
        totalTraders: "700K+",
        totalBuilders: "12K+",
        openInterest: "$8.37B+",
        tvl: "$5.92B+"
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
