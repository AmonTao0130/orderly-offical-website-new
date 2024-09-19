import axios from "axios";

// perp_volume_ltd
export async function getEvmVolumeLtd() {
  const res = await axios.get(
    "https://api-evm.orderly.org/v1/public/volume/stats"
  );
  return res?.data?.data?.perp_volume_ltd || 0;
}

// spot_volume_ltd + perp_volume_ltd
export async function getNearVolumeLtd() {
  const res = await axios.get("https://api.orderly.org/v1/public/volume/stats");
  const { spot_volume_ltd = 0, perp_volume_ltd = 0 } = res?.data?.data || {};
  return spot_volume_ltd + perp_volume_ltd;
}

// Total trading volume = EVM (perp_volume_ltd) + NEAR (spot_volume_ltd + perp_volume_ltd)
export async function getTotalVolume() {
  return getEvmVolumeLtd().then((evmVolume) => {
    return evmVolume || 0;
  });
  // remove near volume for now
  // return Promise.all([getEvmVolumeLtd(), getNearVolumeLtd()]).then((res) => {
  //   const [evmVolume, nearVolume] = res || [0, 0];
  //   return evmVolume + nearVolume;
  // });
  // const evmVolume = await getEvmVolumeLtd();
  // const nearVolume = await getNearVolumeLtd();
  // return evmVolume + nearVolume;
}
