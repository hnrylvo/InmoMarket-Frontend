import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};


const defaultCenter = {
  lat: 13.6808,
  lng: -89.2359,
};

function MyGoogleMap({ lat, lng, setLat, setLng }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyABMNUwc5cuygx0VAN9TX6SVbp-JXeJ_S4",
  });

  const [map, setMap] = useState(null);

  const onLoad = React.useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  const handleMapClick = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setLat(newLat); 
    setLng(newLng);
  };

  return isLoaded ? (
    <div className="h-full rounded-xl border-2 border-green-500 overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat, lng }} 
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick} 
      >
        <Marker position={{ lat, lng }} /> 
      </GoogleMap>
    </div>
  ) : (
    <div className="h-[500px] rounded-xl border-2 border-green-500">
      Cargando mapa...
    </div>
  );
}

export default React.memo(MyGoogleMap);
