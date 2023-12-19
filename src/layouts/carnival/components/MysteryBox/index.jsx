import "./style.scss";
import mysteryImg from "../../assets/mysterybox.png";

function MysteryBox() {
  return (
    <section className="MysteryBox">
      <h2>Mystery Box</h2>
      <div className="QuestNFT__label">Complete Week 1-8 to claim</div>
      <div className="MysteryBox__content">
        <div className="MysteryBox__content--left">
          <img src={mysteryImg.src} />
        </div>
        <div className="MysteryBox__content--right">
          <p>
            After the mystery box is opened, you will get the Carnival NFT- a
            unique digital asset minted in limited quantities for this special
            event. This is no ordinary NFT; it is a mark of your journey through
            the social quests and a token of your exceptional dedication and
            participation. Its rarity is what sets it apart, as it's only
            available to those who have completed the adventure and collected
            all the required NFTs.
          </p>
          <p>
            The best part: you still get the chance to win random USDC rewards.
          </p>
         
            <a className="MysteryBox__content--right__button" target="_blank"
            href="https://galxe.com/orderlynetwork/campaign/GC136ttQPJ">
              CLAIM
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="interactive-button/Launch">
                  <g id="Vector">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.91696 4.18896H9.16696V2.18896H3.33363C2.55122 2.18896 1.91696 2.82323 1.91696 3.60563V16.939C1.91696 17.7214 2.55123 18.3556 3.33363 18.3556H16.667C17.4494 18.3556 18.0836 17.7214 18.0836 16.939V11.1056H16.0836V16.3556H3.91696V4.18896Z"
                      fill="white"
                      fillOpacity="0.98"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.91696 4.18896H9.16696V2.18896H3.33363C2.55122 2.18896 1.91696 2.82323 1.91696 3.60563V16.939C1.91696 17.7214 2.55123 18.3556 3.33363 18.3556H16.667C17.4494 18.3556 18.0836 17.7214 18.0836 16.939V11.1056H16.0836V16.3556H3.91696V4.18896Z"
                      fill="url(#paint0_linear_1444_80)"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.3274 4.35199L8.96198 12.7178L7.54773 11.3036L15.9131 2.93781L17.3274 4.35199Z"
                      fill="white"
                      fillOpacity="0.98"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.3274 4.35199L8.96198 12.7178L7.54773 11.3036L15.9131 2.93781L17.3274 4.35199Z"
                      fill="url(#paint1_linear_1444_80)"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.667 2.18909H18.0834L18.0832 8.60579L16.0832 8.60572L16.0833 4.18909H11.667V2.18909Z"
                      fill="white"
                      fillOpacity="0.98"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.667 2.18909H18.0834L18.0832 8.60579L16.0832 8.60572L16.0833 4.18909H11.667V2.18909Z"
                      fill="url(#paint2_linear_1444_80)"
                    />
                  </g>
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_1444_80"
                    x1="34.5158"
                    y1="16.7838"
                    x2="-65.9683"
                    y2="16.3787"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FF9B3F" />
                    <stop offset="0.859375" stopColor="#933EFF" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_1444_80"
                    x1="34.5158"
                    y1="16.7838"
                    x2="-65.9683"
                    y2="16.3787"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FF9B3F" />
                    <stop offset="0.859375" stopColor="#933EFF" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_1444_80"
                    x1="34.5158"
                    y1="16.7838"
                    x2="-65.9683"
                    y2="16.3787"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FF9B3F" />
                    <stop offset="0.859375" stopColor="#933EFF" />
                  </linearGradient>
                </defs>
              </svg>
            </a>
        </div>
      </div>
    </section>
  );
}

export default MysteryBox;
