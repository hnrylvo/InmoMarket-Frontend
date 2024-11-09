import React from "react";
import NextButton from "../../buttons/NextButton";
import PrevButton from "../../buttons/PrevButton";

export default function PropertyImportantInfo({ onNext, onPrev }) {
    const handleNext = () => {
        onNext();
      };
    
      const handlePrev = () => {
        onPrev();
      };
  return (
    <div className="flex lg:w-1/2 lg:h-4/5 flex-col py-8 px-14 gap-12 bg-background-color rounded-2xl">
      <h3 className="text-text-color text-2xl font-medium text-center">
        Important Details
      </h3>
      <div>
        <p>Price</p>
        <input 
            type="number" 
            className="w-32 bg-background-color border-2 border-secondary-green rounded-2xl py-2 px-3"
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <PrevButton onClick={handlePrev} />
        <NextButton onClick={handleNext} />
      </div>
    </div>
  );
}
