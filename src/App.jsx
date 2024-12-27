import { useState, useEffect } from 'react'
import MetroDeparture from './MetroDeparture'

import './App.css'
import TrainDeparture from './TrainDeparture';

function App() {
    const [departures, setDepartures] = useState([]);
    const [trainDepartures, setTrainDepartures] = useState([]);

    function loadMetroDepartures(){
        console.info("Pulling latest metro departures...")
        const stop = "https://gvb.nl/api/gvb-shared-services/travelinformation/api/v1/DepartureTimes/GetVisits?stopCodes=9504322&stopType=Cluster&previewInterval=15&passageType=Departure"
        fetch(stop)
        .then((data) => data.json())
        .then((data) => {
                var sortedData = data.sort((function (a, b) {
                    return new Date(b.date) - new Date(a.date)
                }));
                setDepartures(sortedData)
            }
        )
    }

    function loadTrainDepartures(){
        console.info("Pulling latest train departures...")
        const myHeaders = new Headers();
        myHeaders.append("Ocp-Apim-Subscription-Key", "4968448052684fe39623df3626c1d985");
        
        const stop = "https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/departures?lang=nl&station=ASDL&maxJourneys=5"
        const request = new Request(stop, {
            headers: myHeaders
        });

        fetch(request)
            .then((data) => data.json())
            .then((data) => {
                console.log(data.payload.departures);
                setTrainDepartures(data.payload.departures);
            }
        )
    }

    useEffect(() => {
        loadMetroDepartures();
        loadTrainDepartures();

        const timeoutId = setInterval(
            () => {
                loadMetroDepartures();
                loadTrainDepartures();
            }, 
            10000
        );
        return () => clearInterval(timeoutId);
    }, []);

  return (
    <>
        <h1 className='header'>Metro</h1>
        <div className='itemList'>
            {departures.map(item =>
            { return <MetroDeparture key={item.journeyNumber} line={item.publishedLineNumber} destination={item.destinationName} time={item.departureGroup.expectedDateTime} /> }
            )}
        </div>
        <h1 className='header'>Trein</h1>
        <div className='itemList'>
              {trainDepartures.map(item => { return <TrainDeparture key={item.name} formula={item.product.categoryCode} destination={item.direction} time={item.actualDateTime} track={item.actualTrack} /> }
            )}
        </div>
    </>
  )
}

export default App
