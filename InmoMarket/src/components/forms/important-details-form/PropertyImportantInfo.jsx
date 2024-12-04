import React from "react";
import NextButton from "../../buttons/NextButton";
import PrevButton from "../../buttons/PrevButton";
import TextField from "../../inputs/TextField";
import DayPicker from "../../pickers/DayPicker";
import TimePicker from "../../pickers/TimePicker";

export default function PropertyImportantInfo({
  onNext,
  onPrev,
  propertyPrice,
  setPropertyPrice,
  phoneNumber,
  setPhoneNumber,
  selectedDays,
  setSelectedDays,
  onDaysChange,
  selectedTimes,
  setSelectedTimes,
}) {
  const handleNext = () => {
    if (!propertyPrice || !phoneNumber || selectedDays.length === 0) {
      alert("Please fill in all required fields");
      return;
    }
    onNext();
  };

  const handlePrev = () => {
    onPrev();
  };

  return (
    <div className="flex lg:w-1/2 lg:h-4/5 w-full h-screen flex-col py-4 px-6 lg:py-8 lg:px-14 lg:gap-12 lg:bg-background-color rounded-2xl">
      <h3 className="text-text-color text-lg lg:text-2xl font-medium text-center">
        Important Details
      </h3>

        <div className="w-full flex flex-row justify-between">
        <div>
        <p className="text-text-color text-base lg:text-lg font-medium py-3">
          Property price
        </p>
        <TextField
          type="number"
          placeholder="$ 00000"
          min={0}
          value={propertyPrice}
          onChange={(e) => setPropertyPrice(e.target.value)}
          textCenter={true}
        />
        </div>
        <div>
        <p className="text-text-color text-base lg:text-lg font-medium py-3">
          Phone number
        </p>
        <TextField
          type="tel"
          placeholder="0000-0000"
          min={0}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          textCenter={true}
        />
        </div>
        </div>

      <DayPicker
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
        onDaysChange={onDaysChange}
      />
      <TimePicker
        selectedTimes={selectedTimes}
        setSelectedTimes={setSelectedTimes}
      />
      <div className="w-full flex items-center justify-between mt-auto">
        <PrevButton onClick={handlePrev} />
        <NextButton onClick={handleNext} />
      </div>
    </div>
  );
}
