import './style.scss';
// import Countdown from 'react-countdown';
import { useCountDown } from 'ahooks'

function Timer({ endDate, color = 'orange' }) {       
    const [countdown, formattedRes] = useCountDown({ leftTime: endDate });
    
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
          // Render a completed state
          return '';
        } else {
          // Render a countdown
          return (
            <div className={`Timer__row`}>
                <div className='Timer__row--item'>
                    <div className='Timer__row--item__value'>{days >= 10 ? days : `0${days}`}</div>
                    <div className='Timer__row--item__label'>days</div>
                </div>
                <div className='Timer__dots'>
                    :
                </div>
                <div className='Timer__row--item'>
                    <div className='Timer__row--item__value'>{hours >= 10 ? hours : `0${hours}`}</div>
                    <div className='Timer__row--item__label'>hours</div>
                </div>
                <div className='Timer__dots'>
                    :
                </div>
                <div className='Timer__row--item'>
                    <div className='Timer__row--item__value'>{minutes >= 10 ? minutes : `0${minutes}`}</div>
                    <div className='Timer__row--item__label'>minutes</div>
                </div>
                <div className='Timer__dots'>
                    :
                </div>
                <div className='Timer__row--item'>
                    <div className='Timer__row--item__value'>{seconds >= 10 ? seconds : `0${seconds}`}</div>
                    <div className='Timer__row--item__label'>seconds</div>
                </div>
            </div>
          );
        }
      };

    // const renderTimer = () => {
    //     return <Countdown date={Number(endDate) * 1000} renderer={renderer} />;
    // };

    return (
        <div className={`Timer ${color}`}>
            {/* {renderTimer()} */}
            {renderer(formattedRes)}
        </div>
    );
}

export default Timer;
