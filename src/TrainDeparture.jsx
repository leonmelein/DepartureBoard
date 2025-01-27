import PropTypes from 'prop-types';
import './TrainDeparture.css'
import Metro from './assets/metro.svg'

function TrainDeparture({time="17:01", destination="Amersfoort Vathorst", formula="SPR", track="1"}){
    // let lineNumString = `M${line}`;
    const expectedDeparture = new Date(time);
    console.log(expectedDeparture);
    const currentTime = new Date();
    console.log(currentTime);
    // Calculate the difference in milliseconds
    const diffInMs = expectedDeparture - currentTime;
    console.log(diffInMs);

    // Convert milliseconds to minutes
    const diffInMinutes = Math.round(diffInMs / (1000 * 60));

    if (diffInMinutes < 1) {
        return (
            <div className='trainDeparture'>
                <div className={`lineNumber train`}>
                    <p>{formula}</p>
                </div>
                <div className='destination'>{destination}</div>
                <div className='track'>{track}</div>
                <div className='timeLeft'>{'< 1 min'}</div>
            </div>
        )   
    }

    return (
        <div className='trainDeparture'>
            <div className={`lineNumber train`}>
                <p>{formula}</p>
            </div>
            <div className='destination'>{destination}</div>
            <div className='track'>{track}&nbsp;</div>
            <div className='timeLeft'>{`${diffInMinutes} min`}</div> 
        </div>
    )
}

TrainDeparture.propTypes = {
    time: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    formula: PropTypes.string.isRequired,
    track: PropTypes.number.isRequired
}

export default TrainDeparture