import React from "react";

export default function TextField({
  type = "text",
  placeholder = "Escribe aquí...",
  value,
  onChange,
  textCenter = false,
}) {
  return (
    <div className="relative inline-block w-full ">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-3 lg:p-4 text-sm lg:text-base border border-secondary-green rounded-lg lg:rounded-xl cursor-pointer focus:outline-none focus:ring-1 focus:ring-secondary-green ${
          textCenter && "text-center text-lg lg:text-xl"
        }`}
      />
    </div>
  );
}
