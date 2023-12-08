import './style.scss';


function Trade({params, image, link}) {
 
  return (
    <div className="Trade">
        <div className='Trade__header'>
          <div>
            <img src={image} />
          </div>
          <a href={link} target="_blank">
          <div className='Trade__header--link'>
            <span>TRADE</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
              <path d="M17.0837 11.4003V17.2336C17.0837 17.4638 16.8971 17.6503 16.667 17.6503H3.33366C3.10354 17.6503 2.91699 17.4638 2.91699 17.2336V3.90031C2.91699 3.67019 3.10354 3.48364 3.33366 3.48364H9.16699" stroke="white" strokeOpacity="0.98" strokeWidth="2"/>
              <path d="M8.25488 12.3055L16.6203 3.9397" stroke="white" strokeOpacity="0.98" strokeWidth="2"/>
              <path d="M17.0832 8.90031L17.0834 3.48364H11.667" stroke="white" strokeOpacity="0.98" strokeWidth="2"/>
            </svg>
          </div>
          </a>
        </div>
        <div className="Trade__footer">
          <div className="Trade__footer--left">
            <div className="Trade__footer--left__title">
              Trading Volume
            </div>
            <div className="Trade__footer--left__value">
              {params.volume > 0 ? Number(params.volume).toLocaleString('en-US') : '--'} USDC
            </div>
          </div>
          <div className="Trade__footer--right">
          <div className="Trade__footer--right__title">
              Traders
            </div>
            <div className="Trade__footer--right__value">
              {params.user_count > 0 ? params.user_count : '--'}
            </div>
          </div>
        </div>
        
    </div>
  );
}

export default Trade;
