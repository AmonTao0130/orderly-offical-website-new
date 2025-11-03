import axios from "axios";

// perp_volume_ltd
export async function getEvmVolumeLtd() {
  const res = await axios.get(
    "https://api-evm.orderly.org/v1/public/volume/stats"
  );
  console.log("res", res);
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

// 24h volume from futures API
export async function get24hVolume() {
  try {
    const res = await axios.get("https://api.orderly.org/v1/public/futures");
    const futures = res?.data?.data?.rows || [];
    if (Array.isArray(futures)) {
      const total24hVolume = futures.reduce((total, contract) => {
        const amount24h = parseFloat(contract["24h_amount"] || 0);
        return total + amount24h;
      }, 0);
      return total24hVolume;
    }
    return 0;
  } catch (error) {
    console.error("Error fetching 24h volume:", error);
    throw error;
  }
}

// Get total traders count (hardcoded for now as per requirement)
export async function getTotalTraders() {
  // TODO: Implement actual API call when endpoint becomes available
  return 895000;
}

export async function getTotalBuilders() {
  try {
    const res = await axios.get("https://api.orderly.org/v1/public/broker/name");
    const brokers = res?.data?.data?.rows || [];
    
    // Exclude specific brokers from the count
    const excludedBrokers = [
      'root',
      'blofin',
      'flagiris',
      'flagiris2',
      'ibx',
      'orderly',
      'test-test',
      'test123',
      'alphanaut',
      'ask_jimmy',
      'denx',
      'dvx',
      'galar_fin',
      'involio',
      'luma',
      'one_bow',
      'orderoo',
      'pinde',
      'satuca'
    ];
    
    // Filter out excluded brokers and count the remaining
    const filteredBrokers = brokers.filter(
      (broker: any) => !excludedBrokers.includes(broker.broker_id || broker.name)
    );
    
    return filteredBrokers.length;
  } catch (error) {
    console.error("Error fetching builders count:", error);
    throw error;
  }
}

export async function getOpenInterest() {
  try {
    const res = await axios.get("https://api.orderly.org/v1/public/futures");
    const futures = res?.data?.data?.rows || [];
    if (Array.isArray(futures)) {
      const totalOI = futures.reduce((total, contract) => {
        const oi = parseFloat(contract.open_interest || 0);
        const indexPrice = parseFloat(contract.index_price || 0);
        return total + (oi * indexPrice);
      }, 0);
      return totalOI;
    }
    return 0;
  } catch (error) {
    console.error("Error fetching open interest:", error);
    throw error;
  }
}

export async function getTVL() {
  try {
    const res = await axios.get("https://api.orderly.org/v1/public/balance/stats");
    return res?.data?.data?.total_holding || 0;
  } catch (error) {
    console.error("Error fetching TVL:", error);
    throw error;
  }
}
