import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function GoBackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/home");
  };
  return (
    <button
      className="bg-slate-200 p-2 lg:p-3 rounded-full mr-2 lg:mr-6"
      onClick={goBack}
    >
      <FaAngleLeft className="text-text-color text-l lg:text-2xl" />
    </button>
  );
}
