import React from "react";
import TextField from "../../inputs/TextField";
import MyGoogleMap from "../../maps/MyGoogleMap";
import NextButton from "../../buttons/NextButton";
import PrevButton from "../../buttons/PrevButton";

export default function PropertyUbication({ 
  address, 
  setAdress, 
  lat, 
  lng,
  onNext,
  onPrev,
  setLat,
  setLng
}) {
  const handleNext = () => {
    onNext();
  };

  const handlePrev = () => {
    onPrev();
  };

  return (
    <div className="flex lg:w-1/2 lg:h-4/5 flex-col py-8 px-14 gap-12 bg-background-color rounded-2xl">
      <h3 className="text-text-color text-2xl font-medium text-center">
        where is your property located?
      </h3>
      <div>
        <p className="text-text-color text-xl font-medium py-3">Address</p>
        <TextField
          value={address}
          onChange={(e) => setAdress(e.target.value)}
          placeholder="Address"
        />
      </div>
      <div>
        <p className="text-text-color text-xl font-medium py-5">Location</p>
        <MyGoogleMap 
          lat={lat} 
          lng={lng}
          setLat={setLat}
          setLng={setLng}
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <PrevButton onClick={handlePrev} />
        <NextButton onClick={handleNext} />
      </div>
    </div>
  );
}