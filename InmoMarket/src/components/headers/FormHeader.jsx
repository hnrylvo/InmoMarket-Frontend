import React from "react";
import GoBackButton from "../buttons/GoBackButton";

export default function FormHeader() {
  return (
    <div className="flex items-center w-full lg:w-1/2 px-4 py-2 mb-16">
      <GoBackButton />
      <h2 className="flex-grow text-text-color text-xl lg:text-3xl font-bold text-center">
        Create a new property listing
      </h2>
    </div>
  );
}
