import "./App.scss";
import "./index.scss";
import Phase1Element1 from "./components/Phase1Element1";
import Phase1Element2 from "./components/Phase1Element2";
import { useEffect, useState } from "react";
import Timer from "./components/Timer";
import QuestNFT from "./components/QuestNFT";
import MysteryBox from "./components/MysteryBox";
import Partners from "./components/Partners";
import VenueToTrade from "./components/VenueToTrade";
import Leaderbord from "./components/Leaderbord";
import axios from "axios";
import week1 from "./assets/nft1.png";
import week2 from "./assets/nft2.jpg";
import week3 from "./assets/ntf3.jpg";
import week4 from "./assets/ntf4.jpg";
import week5 from "./assets/ntf5.jpg";
import week6 from "./assets/ntf6.jpg";
import week7 from "./assets/ntf7.jpg";

const response = {
  data: {
    rows: [
      {
        id: 1,
        name: "campaign_20230807",
        start_time: Number(
          (new Date("2023-10-23T01:00:00.000Z").getTime() / 1000).toFixed(0)
        ),
        end_time: Number(
          (new Date("2023-12-25T01:00:00.000Z").getTime() / 1000).toFixed(0)
        ),
      },
      //     {
      //       "id": 1,
      //       "name": "campaign_20230807",
      //       "start_time": Number((new Date().getTime() / 1000).toFixed(0)) + 0.1 * 60,
      //       "end_time": Number((new Date().getTime() / 1000).toFixed(0)) + 20 * 60

      //   },
      //   {
      //     "id": 2,
      //     "name": "campaign_20230806",
      //     "start_time":  Number((new Date().getTime() / 1000).toFixed(0)) + 20 * 60,
      //     "end_time": Number((new Date().getTime() / 1000).toFixed(0)) + 30 * 60
      // },
      {
        id: 2,
        name: "campaign_20230806",
        start_time: Number(
          (new Date("2023-12-25T01:00:00.000Z").getTime() / 1000).toFixed(0)
        ),
        end_time: Number(
          (new Date("2023-12-25T01:00:00.000Z").getTime() / 1000).toFixed(0)
        ),
      },
    ],
  },
};

const quests = [
  {
    name: "Week 1",
    ongoing: true,
    company1: "Orderly Network & HERE Wallet",
    externalLink: "https://galxe.com/orderlynetwork/campaign/GCicnUMBfC",
    img: week1.src,
  },
  {
    name: "Week 2",
    ongoing: true,
    company1: "Orderly Network & Sender",
    externalLink: "https://galxe.com/orderlynetwork/campaign/GCuukUnc4j",
    img: week2.src,
  },
  {
    name: "Week 3",
    ongoing: true,
    company1: "Orderly Network & Hooked",
    externalLink: "https://galxe.com/orderlynetwork/campaign/GCA1yUnMmv",
    img: week3.src,
  },
  {
    name: "Week 4",
    ongoing: true,
    company1: "Orderly Network & Keystone",
    externalLink: "https://galxe.com/orderlynetwork/campaign/GC3C4tUGY8",
    img: week4.src,
  },
  {
    name: "Week 5",
    ongoing: true,
    company1: "Orderly Network & LearnWeb3",
    externalLink: "https://galxe.com/orderlynetwork/campaign/GCjiYtUvAU",
    img: week5.src,
  },
  {
    name: "Week 6",
    ongoing: true,
    company1: "Orderly Network & WOOFi",
    externalLink: "https://galxe.com/orderlynetwork/campaign/GC3UDtUCLh",
    img: week6.src,
  },
  {
    name: "Week 7",
    ongoing: true,
    company1: "Orderly Network & BTSE",
    externalLink: "https://galxe.com/orderlynetwork/campaign/GCuy2tUciC",
    img: week7.src,
  },
  {
    name: "Week 8",
    ongoing: false,
    company1: "Orderly Network & Ref finance",
    externalLink: "/",
  },
];

function AppCarnival() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [activeTab, setActiveTab] = useState(1);
  const [isListCollapsed, setIsListCollapsed] = useState(true);

  const firstEventStart = response.data.rows.find(
    (item) => item.id === 1
  ).start_time;
  const firstEventEnd = response.data.rows.find(
    (item) => item.id === 1
  ).end_time;
  const secondEventStart = response.data.rows.find(
    (item) => item.id === 2
  ).start_time;

  const [latestCampaign, setLatestCampaign] = useState(1);

  useEffect(() => {
    setIsListCollapsed(true);
  }, [activeTab]);

  const getCampaign = async () => {
    const {
      data: {
        data: { rows: response },
      },
    } = await axios.get(
      `https://qa-api.orderly.org/v1/public/campaigns?only_show_alive=false`
    );
    setLatestCampaign(response[0].id);
  };

  useEffect(() => {
    getCampaign();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (Number((Date.now() / 1000).toFixed(0)) >= firstEventStart) {
        setCurrentPhase(1);
      }
    }, 1000); // Check every second (1000 milliseconds)

    // Clean up the interval when the component unmounts or when the dependency array changes.
    return () => {
      clearInterval(intervalId);
    };
  }, [firstEventStart]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`AppCarnival ${currentPhase === 0 ? "zeroPhase" : ""}`}>     
      
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        {/* <Navigation className="fixed" /> */}
        <div className="firstImg"></div>
        <div className="restBg">
          {currentPhase === 0 && (
            <>
              <Phase1Element1 phase1StartTime={firstEventStart} />
              <Phase1Element2 />
            </>
          )}
          {currentPhase === 1 && (
            <>
              <div className="padding"></div>
              {/* <div className='ChooseTab'>
                <button onClick={() => setActiveTab(1)} className={activeTab === 1 ? 'active': ''}>
                  Social Quest
                </button>
                <button onClick={() => setActiveTab(2)} className={activeTab === 2 ? 'active': ''}>
                  Trading Competition
                </button>
              </div> */}
              <section className="Phase2Element1 container">
                <div className="Phase2Element1__left">
                  <div className="Phase2Element1__left--label">
                    {activeTab === 1 ? "Event ends in" : "Coming soon"}
                  </div>
                  {activeTab === 1 && (
                    <Timer
                      endDate={
                        activeTab === 1 ? firstEventEnd : secondEventStart
                      }
                      color={activeTab === 1 ? "purple" : "orange"}
                    />
                  )}
                </div>
                <div className="Phase2Element1__right">
                  {activeTab === 1 ? (
                    <>
                      <p>
                        In collaboration with our partners at Orderly, we are
                        embarking on a thrilling series of social media
                        quests/challenges. Each week ushers in the launch of a
                        fresh exploration odyssey. All you have to do is trail
                        our path, participate in engaging social media quests,
                        and earn an exclusive Social NFT with each completed
                        quests/challenge.
                      </p>
                      <p>
                        The excitement doesn't stop there! Complete all
                        challenges, collect all NFTs, and you unlock the
                        opportunity to crack open the enigmatic mystery box with
                        a chance to get random USDC rewards.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        Welcome to Orderly Trading Carnival, the ultimate
                        trading competition that combines the excitement of
                        crypto trading with the festive atmosphere of a
                        carnival! Get ready to immerse yourself in a world of
                        thrilling trades, exhilarating challenges, and
                        incredible prizes.
                      </p>
                      <p>
                        So, grab your trading gear, put on your carnival hat,
                        and join us at the Trading ground. Get ready to journey
                        with a vibrant community of traders and receive valuable
                        insights. The carnival is set to commence—let the
                        trading games begin!
                      </p>
                    </>
                  )}
                </div>
              </section>
              {activeTab === 1 && (
                <>
                  <QuestNFT quests={quests} />
                  <MysteryBox />
                  <Partners />
                </>
              )}
              {activeTab === 2 && (
                <>
                  <VenueToTrade campaignId={latestCampaign} />
                  <Leaderbord campaignId={latestCampaign} />
                </>
              )}
              <section className={`Rules container`}>
                <h2>{activeTab === 1 ? "Quest Rules" : "Trading Rules"}</h2>
                <div>
                  {/* <ul className={`${isListCollapsed ? 'collapsed' : 'uncollapsed'}`}> */}
                  {activeTab === 1 ? (
                    <>
                      <ul className={`uncollapsed questRules`}>
                        <li>
                          Each week will have a dedicated exclusive NFT
                          allocated to it.
                        </li>
                        <li>
                          Each week’s NFT can be earned by conquering the given
                          quests on the Social quest platform.
                        </li>
                        <li>
                          Users who successfully claimed all NFTs will be
                          entitled to open an Orderly Carnival Mystery Box to
                          get the Orderly Carnival NFT.
                        </li>
                        <li>
                          Note: Ensure to use the same wallet address across all
                          quests/challenges you’re participating in.
                        </li>
                        <li>
                          The Orderly Carnival NFT will be activated 3 working
                          days after the end of all social quests. This is when
                          you'll be allowed to open your Orderly Carnival NFT.
                        </li>
                        <li>
                          Orderly reserves the right, in its sole and absolute
                          discretion, to alter these Activity Terms without
                          prior notice at any time. This includes, but is not
                          limited to, modifying, extending, terminating, or
                          suspending the Activity, changing its eligibility
                          terms and criteria, and the selection and number of
                          winners, as well as the timing of any act. All users
                          are obliged to adhere to these amendments.
                        </li>
                      </ul>
                    </>
                  ) : (
                    <div
                      className={`${
                        isListCollapsed ? "collapsed" : "uncollapsed"
                      }`}
                    >
                      <ul>
                        <li>
                          1. During the competition, the value of all
                          transactions by users on Ref and BTSE via HERE Wallet
                          will be calculated into the total value.
                        </li>
                        <li>
                          2. Users must trade with their Near wallet on Orderly
                          within the event period to be eligible to participate
                          in the event and receive rewards.
                        </li>
                        <li>
                          3. Kindly fill up the address accurately, Orderly will
                          not be held accountable for any incorrect information
                          submitted
                        </li>
                        <li>
                          4. The promotion and reward is limited to only one
                          entry per user
                        </li>
                        <li>
                          5. Rewards: Total amount of allocated $150k USDC
                        </li>
                        {!isListCollapsed && (
                          <li>
                            <div>
                              <div class="table-container">
                                <table class="custom-table">
                                  <thead>
                                    <tr>
                                      <th>Ranking</th>
                                      <th>Prize</th>
                                      <th>Minimum Trading Volume</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>1</td>
                                      <td>$30K</td>
                                      <td>30M</td>
                                    </tr>
                                    <tr>
                                      <td>2</td>
                                      <td>$20K</td>
                                      <td>20M</td>
                                    </tr>
                                    <tr>
                                      <td>3</td>
                                      <td>$10K</td>
                                      <td>10M</td>
                                    </tr>
                                    <tr>
                                      <td>4</td>
                                      <td>$8K</td>
                                      <td>8M</td>
                                    </tr>
                                    <tr>
                                      <td>5</td>
                                      <td>$5K</td>
                                      <td>5M</td>
                                    </tr>
                                    <tr>
                                      <td>6-10</td>
                                      <td>$20K</td>
                                      <td>1M</td>
                                    </tr>
                                    <tr>
                                      <td>11-50</td>
                                      <td>$20K</td>
                                      <td>400K</td>
                                    </tr>
                                    <tr>
                                      <td>51-100</td>
                                      <td>$17K</td>
                                      <td>100K</td>
                                    </tr>
                                    <tr>
                                      <td>101-500</td>
                                      <td>$20K</td>
                                      <td>20K</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className="distributed">
                              Rewards will be distributed to the users’ address
                              within 14 business days after the end of the
                              semi-finals.
                            </div>
                          </li>
                        )}
                        <li>
                          6. Orderly reserves the right to disqualify trades
                          that are deemed to be wash trades, displaying
                          attributes of market manipulation, bulk-account
                          registrations to farm additional bonuses or any other
                          attempts at fraud.
                        </li>
                        <li>
                          7. Orderly reserves the right to cancel or amend any
                          Activity or Activity Rules at our sole discretion.
                        </li>
                        <li>
                          8. Orderly reserves the right of final interpretation
                          of this activity.
                        </li>
                      </ul>
                      <div className="riskWarning">
                        Risk Warning: Crypto futures trading carries a
                        substantial risk. All trading activities are done at
                        your discretion and at your own risk. The information
                        here should not be regarded as financial or investment
                        advice from Orderly. Orderly will not be liable for any
                        loss that might arise from your use of Orderly.
                      </div>
                    </div>
                  )}
                  {activeTab !== 1 && (
                    <div
                      className="Rules__button"
                      style={{ bottom: isListCollapsed ? "25px" : "-40px" }}
                      onClick={() => setIsListCollapsed(!isListCollapsed)}
                    >
                      {!isListCollapsed ? "Fold Details" : "Expand Details"}
                    </div>
                  )}
                </div>
              </section>
            </>
          )}
         
        </div>
      </div>
    </div>
  );
}

export default AppCarnival;
