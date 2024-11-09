import React from "react";
import NextButton from "../../buttons/NextButton";
import PrevButton from "../../buttons/PrevButton";
import MiniTextField from "../../inputs/MiniTextField";
import {
  FaRuler,
  FaBed,
  FaBath,
  FaCar,
  FaGopuram,
  FaCouch,
} from "react-icons/fa";
import MiniDDMenu from "../../dropdown-menus/MiniDDMenu";

export default function PropertySpecs({
  rooms,
  setRooms,
  bathrooms,
  setBathrooms,
  parking,
  setParking,
  area,
  setArea,
  floors,
  setFloors,
  furnished,
  setFurnished,
  description,
  setDescription,
  onPrev,
  onNext,
  //onSubmit
}) {
  const handlePrev = () => {
    onPrev();
  };

  const handleNext = () => {
    onNext();
  };

//   const handleSubmit = () => {
//     // Validación básica antes de enviar
//     if (
//       !area ||
//       !rooms ||
//       !bathrooms ||
//       !parking ||
//       !floors ||
//       furnished === undefined ||
//       !description.trim()
//     ) {
//       alert("Please fill in all fields");
//       return;
//     }

//     if (onSubmit) {
//       onSubmit();
//     }
//   };

  return (
    <div className="flex lg:w-1/2 lg:h-4/5 flex-col py-8 px-14 gap-12 bg-background-color rounded-2xl">
      <h3 className="text-text-color text-2xl font-medium text-center">
        Property Specifications
      </h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center justify-center">
          <p className="text-text-color text-xl font-medium py-3">Area</p>
          <MiniTextField
            textFieldIcon={FaRuler}
            placeholder="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            min={1}
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-text-color text-xl font-medium py-3">Rooms</p>
          <MiniTextField
            textFieldIcon={FaBed}
            placeholder="rooms"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            min={1}
            max={20}
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-text-color text-xl font-medium py-3">Bathrooms</p>
          <MiniTextField
            textFieldIcon={FaBath}
            placeholder="bathrooms"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            min={1}
            max={10}
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-text-color text-xl font-medium py-3">Parking</p>
          <MiniTextField
            textFieldIcon={FaCar}
            placeholder="parking"
            value={parking}
            onChange={(e) => setParking(e.target.value)}
            min={0}
            max={10}
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-text-color text-xl font-medium py-3">Floors</p>
          <MiniTextField
            textFieldIcon={FaGopuram}
            placeholder="floors"
            value={floors}
            onChange={(e) => setFloors(e.target.value)}
            min={1}
            max={50}
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-text-color text-xl font-medium py-3">Furnished</p>
          <MiniDDMenu
            textFieldIcon={FaCouch}
            value={furnished}
            onChange={setFurnished}
          />
        </div>
      </div>
      <hr />
      <div className="h-2/5">
        <p className="text-text-color text-xl font-medium py-3">Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-full bg-background-color border-2 border-secondary-green rounded-2xl p-4 resize-none"
          placeholder="Description"
        ></textarea>
      </div>
      <div className="w-full flex items-center justify-between mt-6">
        <PrevButton onClick={handlePrev} />
        <NextButton onClick={handleNext} />
      </div>
    </div>
  );
}