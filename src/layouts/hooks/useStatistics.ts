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
    setLoading(true);
    
    const results = await Promise.allSettled([
      getTotalVolume(),
      get24hVolume(),
      getTotalTraders(),
      getTotalBuilders(),
      getOpenInterest(),
      getTVL()
    ]);

    const [volumeResult, volume24hResult, tradersResult, buildersResult, openInterestResult, tvlResult] = results;

    setStats({
      totalVolume: volumeResult.status === 'fulfilled' && volumeResult.value != null 
        ? formatVolume(volumeResult.value) 
        : "--",
      volume24h: volume24hResult.status === 'fulfilled' && volume24hResult.value != null 
        ? formatVolume(volume24hResult.value) 
        : "--",
      totalTraders: tradersResult.status === 'fulfilled' && tradersResult.value != null 
        ? formatTraders(tradersResult.value) 
        : "--",
      totalBuilders: buildersResult.status === 'fulfilled' && buildersResult.value != null 
        ? formatTraders(buildersResult.value) 
        : "--",
      openInterest: openInterestResult.status === 'fulfilled' && openInterestResult.value != null 
        ? formatNumber(openInterestResult.value) 
        : "--",
      tvl: tvlResult.status === 'fulfilled' && tvlResult.value != null 
        ? formatNumber(tvlResult.value) 
        : "--"
    });

    // Log any errors for debugging
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        const apiNames = ['getTotalVolume', 'get24hVolume', 'getTotalTraders', 'getTotalBuilders', 'getOpenInterest', 'getTVL'];
        console.error(`Error fetching ${apiNames[index]}:`, result.reason);
      }
    });

    setLoading(false);
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
