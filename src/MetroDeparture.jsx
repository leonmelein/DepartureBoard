import PropTypes from 'prop-types';
import './MetroDeparture.css'
import Metro from './assets/metro.svg'

function Item({line="51", destination="Centraal Station", time="1 min"}){
    let lineNumString = `M${line}`;
    const expectedDeparture = new Date(time);
    const currentTime = new Date();
    // Calculate the difference in milliseconds
    const diffInMs = expectedDeparture - currentTime;

    // Convert milliseconds to minutes
    const diffInMinutes = Math.round(diffInMs / (1000 * 60));

    if (diffInMinutes < 1 || line == "55") {
        return (
            <div className='departure'>
                <div className={`lineNumber m${line}`}>
                    <p>{lineNumString}</p>
                </div>
                <div className='destination'>{destination}</div>
                <div className='timeLeft departureImminent'>
                    <img src={Metro} className={'departing'}/>
                    <img src={Metro} className={'departing'} />
                    <img src={Metro} className={'departing'} />
                    <img src={Metro} className={'departing'} />
                </div>
            </div>
        )   
    }

    return (
        <div className='departure'>
            <div className={`lineNumber m${line}`}>
                <p>{lineNumString}</p>
            </div>
            <div className='destination'>{destination}</div>
            <div className='timeLeft'>{`${diffInMinutes} min`}</div> 
        </div>
    )
}

Item.propTypes = {
    line: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired
}

export default Item