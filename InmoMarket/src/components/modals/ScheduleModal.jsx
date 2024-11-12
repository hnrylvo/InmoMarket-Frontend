import React from "react";
import { IoClose } from "react-icons/io5";

// Función para crear el enlace de WhatsApp
const createWhatsAppLink = (phoneNumber, day, hour) => {
  // Eliminar cualquier caracter no numérico del número de teléfono
  const cleanNumber = phoneNumber.replace(/\D/g, "");
  // Crear el mensaje
  const message = encodeURIComponent(
    `Estoy interesado en visitar su propiedad el día: ${day} a la hora: ${hour}`
  );
  // Retornar el enlace completo
  return `https://wa.me/${cleanNumber}?text=${message}`;
};

const ScheduleModal = ({
  isOpen,
  onClose,
  scheduleData,
  selectedDay,
  selectedHour,
  onDaySelect,
  onHourSelect,
}) => {
  if (!isOpen) return null;

  const handleScheduleVisit = () => {
    // Reemplaza "1234567890" con el número de WhatsApp al que quieres enviar el mensaje
    const whatsappNumber = "50374152678"; // Ejemplo: "50370123456"
    window.open(createWhatsAppLink(whatsappNumber, selectedDay, selectedHour), '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-md bg-[#1B4640] rounded-2xl p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          <IoClose size={24} />
        </button>

        <h2 className="text-white text-xl font-bold mb-8">Agenda tu visita</h2>

        <div className="flex justify-between mb-8">
          {scheduleData.days.map((day) => (
            <button
              key={day}
              onClick={() => onDaySelect(day)}
              className={`w-16 h-16 rounded-xl flex items-center justify-center text-lg font-medium transition-colors
                  ${
                    selectedDay === day
                      ? "bg-[#82AE8F] text-white"
                      : "bg-white text-[#1B4640]"
                  }`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-2 mb-8">
          {scheduleData.hours.map((hour) => (
            <button
              key={hour}
              onClick={() => onHourSelect(hour)}
              className={`py-2 px-3 rounded-full text-sm font-medium transition-colors
                  ${
                    selectedHour === hour
                      ? "bg-[#82AE8F] text-white"
                      : "bg-gray-400 bg-opacity-50 text-white"
                  }`}
            >
              {hour}
            </button>
          ))}
        </div>

        <button 
        onClick={handleScheduleVisit}
        className="w-full bg-white text-[#1B4640] py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Programar visita
        </button>
      </div>
    </div>
  );
};

export default ScheduleModal;
