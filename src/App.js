import './App.css';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import Pin from './pin';
import React, { useState, useMemo, } from 'react'
import CITIES from './Cities.json';
const TOKEN = "pk.eyJ1IjoicnNoZXluIiwiYSI6ImNsMHNuaTM3ODAydzUzZG9hcDNwOGY0c3oifQ.Z20_U1zofS15910rvoip8w"



function App() {

  const [popupInfo, setPopupInfo] = useState();

  const pins = useMemo
    (() =>
      CITIES.map((city, index) =>
        <>
          <div
            onMouseEnter={() => setPopupInfo(city)}
            onMouseLeave={() => setPopupInfo()}
          >
            <Marker
              key={`marker-${index}`}
              longitude={city.longitude}
              latitude={city.latitude}
              anchor="bottom"
              onClick={(e) => {
                console.log(popupInfo)
                /* setPopupInfo(city) */
              }}
            >
              <Pin
              /* onClick={() => setPopupInfo(city)} */
              />
            </Marker>
          </div>
        </>
      ), []
    );

  const [map, setMap] = useState({
    viewport: {
      longitude: -94,
      latitude: 41,
      zoom: 4,
      bearing: 0,
      pitch: 0
    },
  });

  return (
    <div >
      <ReactMapGL
        onViewportChange={(viewport) => setMap(...viewport)}
        initialViewState={map.viewport}
        style={{ width: '100%', height: '750px' }}
        mapboxAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {pins}
        {popupInfo &&
          <div >
            <Popup
              longitude={Number(popupInfo.longitude)}
              latitude={Number(popupInfo.latitude)}
              closeButton={false}
              closeOnClick={false}
              anchor="top"
              dynamicPosition={false}
              offset={5} >
              <p>
                <p>Population: {(popupInfo.population)}</p>
                <br />
                <img src={popupInfo.image} alt="imgage not found" width={150} height={150} />
              </p>
            </Popup>
          </div>
        }
      </ReactMapGL>

    </div >
  );
}

export default App;
