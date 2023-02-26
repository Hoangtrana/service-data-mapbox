import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import servicedata from "./servicedata.json";
import Map, {
  Marker,
  NavigationControl,
  Popup,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import { useState, useEffect } from "react";
function App() {
  const [lng, setLng] = useState(59.053714);
  const [lat, setLat] = useState(43.110968);
  const [selectedPoint, setSelectedPoint] = useState(null);
  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPoint(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);
  return (
    <div className="banner--mapbox">

      <h1 className="animate-charcter" id="service--data">SERVICE DATA</h1>
      <Map
        mapboxAccessToken="pk.eyJ1IjoiaG9hbmd0cmFuODgiLCJhIjoiY2xlaGh4OHBrMGZuMDNvbXd0d3d6ZThkZCJ9.JTkjWlKdQaxjrBGgzP0o4A"
        style={{
          width: "2000px",
          height: "500px",
          borderRadius: "0px",
          
        }}
        initialViewState={{
          longitude: lng,
          latitude: lat,
        }}
        mapStyle="mapbox://styles/mapbox/light-v11"
      >


<Marker longitude={-119.417931} latitude={36.778259}/>


<Marker longitude={139.839478} latitude={35.652832} />
<Marker longitude={53,350140} latitude={-6.266155} />
        <NavigationControl position="bottom-right" />
        <FullscreenControl />

        <GeolocateControl />
      </Map>
      {servicedata.features.map(point=>(
          <div className="service--info">
            
        {point.properties.name}<span>&ensp;</span>
         
         {point.properties.state} <span>&ensp;</span>
         {point.properties.updated} <span>&ensp;</span>
         {point.properties.aws_region}</div>
          
           
          
        ))}
    </div>
  );
}

export default App;
