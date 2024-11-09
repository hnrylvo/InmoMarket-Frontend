import React from "react";

export default function TextField({
  placeholder = "Escribe aquí...",
  value,
  onChange,
}) {
  return (
    <div className="relative inline-block w-full">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-4 border border-secondary-green rounded-xl cursor-pointer focus:outline-none focus:ring-1 focus:ring-secondary-green"
      />
    </div>
  );
}
