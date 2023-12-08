import './style.scss';
import { useEffect, useState } from 'react';
import WooDexIcon from '../../assets/woodex.png';
import RefFinanceIcon from '../../assets/reffinance.png';
import ZexeIcon from '../../assets/zexe.png';
import BtseIcon from '../../assets/btsedex.png';

import Trade from '../Trade';

const images = {
  "woofi_dex": WooDexIcon.src,
  "ref_dex": RefFinanceIcon.src,
  "zexe_dex": ZexeIcon.src,
  "btse_dex": BtseIcon.src,
  "null": RefFinanceIcon.src,
  "rkqa": ZexeIcon.src,
}

const links = {
  "ref_dex": "https://app.ref.finance/#near|token.v2.ref-finance.near",
  "btse_dex": "https://dex.btse.com/trade/PERP_BTC_USDC",
  "woofi_dex": "https://dex.btse.com/trade/PERP_BTC_USDC"
}

const hardcode = {
  "success": true,
  "data": {
      "rows": [
      {
        "broker_id": "ref_dex",
          "volume": 0,
          "user_count": 0
      },
      {
        "broker_id": "btse_dex",
          "volume": 0,
          "user_count": 0
      },
  ],
      "updated_time": 1688371971550
  },
  "timestamp": 1688371971557
}

function VenueToTrade({campaignId}) {
  const [data, setData] = useState(null);

  const getTrades = async () => {
  // FOR NOW USE HARDCODE
  //  const response = await axios.get(`https://qa-api.orderly.org/v1/public/campaign/stats/details?campaign_id=${campaignId}&group_by=BROKER`);
  //  setData(response.data.data.rows)
  setData(hardcode.data.rows)
  //  console.log(response)
  }

  useEffect(() => {
    getTrades()
  }, [])

  // const campaign = 
  return (
    <section className="VenueToTrade container">
        <h2>Select a venue to trade</h2>
        <div className='VenueToTrade__content'>
          {data && (
            data.map(item => {
              return (
                <Trade params={item} image={images[item.broker_id]} link={links[item.broker_id]} />
              )
            })
          )}
        </div>
    </section>
  );
}

export default VenueToTrade;
