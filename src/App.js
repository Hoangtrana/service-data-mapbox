import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as servicePoint from "./data/service-data.json";
import './index.css';
import Footer from "./Footer";


export default function App() {

  // Set viewport for Mapbox with equirectangular view
  const [viewport, setViewport] = useState({
    latitude: 48.4211,
    longitude: 45.4211,
    width: "100vw",
    height: "60vh",
    zoom: 1.0,
          center:[0,1],
          projection:{
            name:"equirectangular",
            center:[0,30],
            parallels:[30,30],
          },
  });
  const [selectedpoint, setSelectedpoint] = useState(null);

//click service data, show up info and close automatially when click another 
  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedpoint(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  //Conditional pulse style for different serice data state
  const pulseStyles = {
    okPulse:{
      background : "linear-gradient(#46e24e, #8dcca2)",
    },
    alarmPulse:{
      background: "linear-gradient(#ffc300, #fdca40)",
    },
    failurePulse:{
      background: "linear-gradient(#d20000, #9c0000)",
    }
  };

  return (
    <div className="mapApp">
     <div className="header figure">
      <h1 className="animate-charcter">Service Data</h1>
     </div>
     
      <div className="mapContainer">
        <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MYMAP_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {servicePoint.features.map(point => (
          <Marker
            key={point.properties.SERVICE_ID}
            latitude={point.geometry.coordinates[1]}
            longitude={point.geometry.coordinates[0]}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedpoint(point);
              }}
            >
              {<div className="pulse" 
              style = {
                point.properties.STATE === "ALARM" ? pulseStyles.alarmPulse : (point.properties.STATE === "FAILURE" ? pulseStyles.failurePulse: pulseStyles.okPulse)}>
              </div>
            }
              
            </button>
          </Marker>
        ))}

        {selectedpoint ? (
          <Popup
            latitude={selectedpoint.geometry.coordinates[1]}
            longitude={selectedpoint.geometry.coordinates[0]}
            onClose={() => {
              setSelectedpoint(null);
            }}
          >
            <div>
              <h3>{selectedpoint.properties.NAME}</h3>
              <p>{selectedpoint.properties.UPDATED}</p>
              <p>{selectedpoint.properties.AWS_REGION}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
    
    <div className="figure">
     
     <div className="figure-dot" style= {pulseStyles.okPulse}></div> 
     <p>Ok</p> &emsp;
     <div className="figure-dot" style= {pulseStyles.alarmPulse}></div> 
     <p>Alarm</p>&emsp;
     <div className="figure-dot" style= {pulseStyles.failurePulse}></div> 
     <p>Failure</p>
    
    </div>
    <Footer/>

  </div>
    
  );
}
