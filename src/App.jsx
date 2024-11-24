import { useState, useEffect } from 'react'
import Item from './DepartureItem'

import './App.css'

function App() {
    const [departures, setDepartures] = useState([]);

    function loadData(){
        console.info("Pulling latest departures...")
        const stop = "https://gvb.nl/api/gvb-shared-services/travelinformation/api/v1/DepartureTimes/GetVisits?stopCodes=9504322&stopType=Cluster&previewInterval=15&passageType=Departure"
        fetch(stop)
        .then((data) => data.json())
        .then((data) => {
                setDepartures(data)
            }
        )
    }

    useEffect(() => {
        const timeoutId = setInterval(
            () => loadData(), 
            10000
        );
        return () => clearInterval(timeoutId);
    }, []);

  return (
    <>
      <div className='itemList'>
        {departures.map(item =>
        { return <Item key={item.journeyNumber} line={item.publishedLineNumber} destination={item.destinationName} time={item.departureGroup.expectedDateTime} /> }
        )}
      </div>
    </>
  )
}

export default App
