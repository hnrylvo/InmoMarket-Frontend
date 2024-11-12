import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const GoogleMapComponent = ({ lat, lng }) => {
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

  return isLoaded ? (
    <div className="h-full rounded-xl border-2 overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat, lng }}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={{ lat, lng }} />
      </GoogleMap>
    </div>
  ) : (
    <div className="h-[500px] rounded-xl border-2 border-green-500">
      Cargando mapa...
    </div>
  );
};

export default React.memo(GoogleMapComponent);