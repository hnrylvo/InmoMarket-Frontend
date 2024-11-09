import React from "react";
import { useEffect, useRef } from "react";
import { FaAngleDown } from "react-icons/fa";

export default function FormDDMenu({
  options = [],
  placeholder = "Select an option",
  value = "",
  onChange
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = useRef(null);

  // Abre o cierra el menú
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Cierra el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Maneja la selección de una opción
  const handleOptionClick = (option) => {
    onChange(option); // Usa la función onChange proporcionada por las props
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full" ref={menuRef}>
      <input
        type="text"
        readOnly
        value={value || placeholder}
        onClick={toggleMenu}
        className="w-full p-4 border border-secondary-green rounded-xl cursor-pointer focus:outline-none focus:ring-1 focus:ring-secondary-green"
        placeholder={placeholder}
      />
      <FaAngleDown
        className="text-text-color absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
        onClick={toggleMenu}
      />

      {isOpen && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded shadow-lg mt-1 z-10 max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 ${
                value === option ? 'bg-gray-100' : ''
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}