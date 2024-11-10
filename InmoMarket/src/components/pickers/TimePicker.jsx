import React, { useState } from "react";

const TimePicker = ({ selectedTimes, setSelectedTimes }) => {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");

  const handleAddTime = () => {
    const newTime = `${hours}:${minutes}`;
    if (!selectedTimes.includes(newTime)) {
      const newTimes = [...selectedTimes, newTime].sort((a, b) => {
        const [hoursA, minutesA] = a.split(":").map(Number);
        const [hoursB, minutesB] = b.split(":").map(Number);
        return hoursA * 60 + minutesA - (hoursB * 60 + minutesB);
      });
      setSelectedTimes(newTimes);
    }
  };

  const handleRemoveTime = (timeToRemove) => {
    setSelectedTimes(selectedTimes.filter((time) => time !== timeToRemove));
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-3 lg:px-6">
      <h2 className="text-gray-600 mb-6 text-sm lg:text-base">Enter viewing hours</h2>

      <div className="flex items-center justify-center gap-2 mb-8">
        <input
          type="number"
          min="0"
          max="23"
          value={hours}
          onChange={(e) => {
            const value = e.target.value.padStart(2, "0");
            if (Number(value) < 24) {
              setHours(value.slice(-2));
            }
          }}
          className="w-16 lg:w-20 p-1 lg:p-2 text-lg lg:text-xl text-center border-2 border-secondary-green border-opacity-50 rounded-xl focus:outline-none focus:ring-1 focus:ring-secondary-green"
        />
        <span className="text-4xl font-medium text-text-color">:</span>
        <input
          type="number"
          min="0"
          max="59"
          value={minutes}
          onChange={(e) => {
            const value = e.target.value.padStart(2, "0");
            if (Number(value) < 60) {
              setMinutes(value.slice(-2));
            }
          }}
          className="w-16 lg:w-20 p-1 lg:p-2 text-lg lg:text-xl text-center border-2 border-secondary-green border-opacity-50 rounded-xl focus:outline-none focus:ring-1 focus:ring-secondary-green"
        />
      </div>

      <div className="flex flex-wrap overflow-x-scroll gap-4 px-4 pb-2 lg:pb-5">
      <div className="flex flex-row flex-nowrap gap-4 w-full justify-evenly">
        {selectedTimes.map((time) => (
          <div
            key={time}
            className="relative inline-flex items-center bg-secondary-green bg-opacity-50 text-white text-sm lg:text-base px-2 py-1 lg:px-4 lg:py-2 rounded-full"
          >
            <span className="text-base font-semibold">{time}</span>
            <button
              onClick={() => handleRemoveTime(time)}
              className="ml-2 w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center bg-red-500 text-white font-bold rounded-full hover:bg-red-600 focus:outline-none"
            >
              X
            </button>
          </div>
        ))}
      </div>
      </div>

      <div className="mt-2 lg:mt-4 flex justify-center">
        <button
          onClick={handleAddTime}
          className="px-4 lg:px-6 py-2 text-sm lg:text-base mt-5 bg-secondary-green text-white font-semibold rounded-full hover:bg-opacity-90 focus:outline-none"
        >
          Add Time
        </button>
      </div>
    </div>
  );
};

export default TimePicker;
