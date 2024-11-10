import React from "react";

export default function NextButton({ onClick, text = "Next" }) {
  return (
    <button
      onClick={onClick}
      className="bg-primary-color w-1/3 rounded-xl hover:scale-[1.01] active:scale-[0.99]"
    >
      <p className="text-white-color text-base lg:text-xl font-bold py-3 lg:py-4">{text}</p>
    </button>
  );
}
