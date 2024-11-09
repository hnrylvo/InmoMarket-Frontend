import React from "react";

export default function NextButton({ onClick, text = "Next" }) {
  return (
    <button
      onClick={onClick}
      className="bg-primary-color w-1/3 mt-8 rounded-xl hover:scale-[1.01] active:scale-[0.99]"
    >
      <p className="text-white-color text-xl font-bold py-4">Next</p>
    </button>
  );
}
