import './style.scss';
import Timer from '../Timer';

function Phase1Element1({ phase1StartTime }) {
  // console.log('phase1StartTime',phase1StartTime);
  return (
    <section className="Phase1Element1">
        <div>
            <div className="Phase1Element1__title">Event BEGINs IN</div>
            <Timer endDate={phase1StartTime} />
        </div>
    </section>
  );
}

export default Phase1Element1;
