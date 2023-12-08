import "./style.scss";
import questImgLocked from "../../assets/nft1loocked.png";

function SingleQuest({ params }) {
  return (
    <div className={`SingleQuest ${params.ongoing ? "ongoing" : "soon"}`}>
      <div className="SingleQuest__header">
        <div className="SingleQuest__header--name">{params.name}</div>
        <div className="SingleQuest__header--status">
          {params.ongoing ? "Ongoing" : "Starting soon"}
        </div>
      </div>
      <div>
        <img className="coverImg" src={params.img || questImgLocked.src} />
      </div>
      <div className="SingleQuest__footer">
        <div className="SingleQuest__footer--name">
          <span>{params.company1}</span>
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.58605 10.2728L3.4006 5.08731L4.81482 3.6731L10.0003 8.85854L15.1857 3.6731L16.5999 5.08731L11.4145 10.2728L16.5999 15.4582L15.1857 16.8724L10.0003 11.687L4.81482 16.8724L3.4006 15.4582L8.58605 10.2728Z" fill="white" fillOpacity="0.6"/>
            </svg>
            <span>{params.company2}</span> */}
        </div>
        <a href={params.externalLink} target="_blank">
          <div className="SingleQuest__footer--link">
            JOIN
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
          </div>
        </a>
      </div>
    </div>
  );
}

export default SingleQuest;
