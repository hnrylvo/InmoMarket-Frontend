import React from "react";

export default function PrevButton({ onClick }) {
    return (
        <button
        onClick={onClick}
        className="bg-primary-color w-1/3 mt-8 rounded-xl hover:scale-[1.01] active:scale-[0.99]"
        >
        <p className="text-white-color text-xl font-bold py-4">Previous</p>
        </button>
    );
    }