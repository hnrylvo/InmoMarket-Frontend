import React from "react";

const DayPicker = ({ onDaysChange, selectedDays, setSelectedDays }) => {
  const weekDays = [
    { id: "Lun", label: "Lun" },
    { id: "Mar", label: "Mar" },
    { id: "Mie", label: "Mie" },
    { id: "Jue", label: "Jue" },
    { id: "Vie", label: "Vie" },
    { id: "Sab", label: "Sáb" },
    { id: "Dom", label: "Dom" },
  ];

  const handleDayClick = (dayId) => {
    // Removemos la validación que podría estar causando problemas
    const newSelection = selectedDays.includes(dayId)
      ? selectedDays.filter((id) => id !== dayId)
      : [...selectedDays, dayId];

    // Ordenamos los días
    newSelection.sort((a, b) => {
      const dayOrder = weekDays.map((d) => d.id);
      return dayOrder.indexOf(a) - dayOrder.indexOf(b);
    });

    setSelectedDays(newSelection);
    onDaysChange?.(newSelection);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-3 lg:p-6">
      <h2 className="text-text-color text-lg lg:text-2xl font-medium text-center">
        Property viewing schedule
      </h2>

      <div className="my-4">
        <p className="text-gray-600 mb-4 text-sm lg:text-base">Select the days</p>

        <div className="flex flex-nowrap justify-center gap-2">
          {weekDays.map((day) => (
            <button
              key={day.id}
              onClick={() => handleDayClick(day.id)}
              className={`
                w-9 lg:w-14 py-4 lg:py-7 lg:px-2 text-center font-medium rounded-xl lg:rounded-2xl border-2 transition-colors duration-200 text-xs lg:text-base
                ${
                  selectedDays && selectedDays.includes(day.id)
                    ? "bg-secondary-green bg-opacity-50 border-secondary-green border-opacity-50 text-white scale-[0.95]"
                    : "bg-white border-secondary-green border-opacity-50 text-text-color hover:bg-secondary-green hover:bg-opacity-50"
                }
              `}
            >
              {day.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayPicker;