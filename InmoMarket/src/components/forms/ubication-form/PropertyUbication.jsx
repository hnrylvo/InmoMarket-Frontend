import React from "react";
import TextField from "../../inputs/TextField";
import MyGoogleMap from "../../maps/MyGoogleMap";
import NextButton from "../../buttons/NextButton";
import PrevButton from "../../buttons/PrevButton";

export default function PropertyUbication({ 
  propertyAddress, 
  setPropertyAdress, 
  latitude, 
  longitude,
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
    <div className="flex lg:w-1/2 lg:h-4/5 w-full h-screen flex-col py-4 px-6 lg:py-8 lg:px-14 lg:gap-12 lg:bg-background-color rounded-2xl">
      <h3 className="text-text-color text-lg lg:text-2xl font-medium text-center">
        where is your property located?
      </h3>
      <div>
        <p className="text-text-color text-base lg:text-xl font-medium py-5">Address</p>
        <TextField
          value={propertyAddress}
          onChange={(e) => setPropertyAdress(e.target.value)}
          placeholder="Address"
        />
      </div>
      <div className="h-1/2 w-full">
        <p className="text-text-color text-base lg:text-xl font-medium py-5">Location</p>
        <MyGoogleMap 
          lat={latitude} 
          lng={longitude}
          setLat={setLat}
          setLng={setLng}
        />
      </div>
      <div className="w-full flex items-center justify-between mt-auto">
        <PrevButton onClick={handlePrev} />
        <NextButton onClick={handleNext} />
      </div>
    </div>
  );
}