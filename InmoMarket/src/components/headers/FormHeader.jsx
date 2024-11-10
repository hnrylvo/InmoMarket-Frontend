import React from "react";
import GoBackButton from "../buttons/GoBackButton";

export default function FormHeader() {
  return (
    <div className="flex items-center w-full lg:w-1/2 px-4 py-4 lg:py-10 mb-auto lg:mb-14">
      <GoBackButton />
      <h2 className="flex-grow text-text-color text-lg lg:text-3xl font-bold text-center">
        Create a new property listing
      </h2>
    </div>
  );
}
