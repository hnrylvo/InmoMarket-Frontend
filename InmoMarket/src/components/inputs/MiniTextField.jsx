import React from "react";

export default function MiniTextField({
  textFieldIcon: Icon,
  placeholder,
  value,
  onChange,
  type = "number",
  min = 0,
  max,
}) {
  const handleChange = (e) => {
    const newValue = e.target.value;

    // Si está vacío, permitir borrar el campo
    if (newValue === "") {
      onChange({ target: { value: "" } });
      return;
    }

    // Validar que sea un número
    const numValue = Number(newValue);
    if (isNaN(numValue)) return;

    // Validar límites
    if (min !== undefined && numValue < min) return;
    if (max !== undefined && numValue > max) return;

    onChange({ target: { value: numValue } });
  };

  return (
    <div className="flex items-center gap-2">
      {Icon && <Icon className="text-primary-color w-4 h-4 lg:w-5 lg:h-5" />}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        className="w-20 lg:w-32 bg-background-color border-2 border-secondary-green rounded-xl lg:rounded-2xl py-2 px-3 text-xs lg:text-base "
      />
    </div>
  );
}
