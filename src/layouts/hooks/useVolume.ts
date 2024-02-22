import { getTotalVolume } from "@/net/volume";
import { useEffect, useState } from "react";

export function useVolume() {
  const [volume, setVolume] = useState("--");

  async function getData() {
    const data = (await getTotalVolume()) as number;
    if (data === 0) {
      setVolume("3.00B+");
    } else {
      const _vol = (data / 1000000000).toFixed(2);
      setVolume(`${_vol}B+`);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return volume;
}
