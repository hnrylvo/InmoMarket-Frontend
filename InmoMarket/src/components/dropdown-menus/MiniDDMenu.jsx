import React from "react";

export default function MiniDDMenu({ textFieldIcon: Icon, value, onChange }) {
  const handleChange = (e) => {
    // Convertir el valor a booleano
    const boolValue = e.target.value === "true";
    onChange(boolValue);
  };

  return (
    <div className="flex items-center gap-2">
      {Icon && <Icon className="text-primary-color w-5 h-5" />}
      <select
        value={String(value)}
        onChange={handleChange}
        className="w-32 bg-background-color border-2 border-secondary-green rounded-2xl py-2 px-3"
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </div>
  );
}
