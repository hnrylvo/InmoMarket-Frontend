// PropertyDetails.jsx
import React, { useState } from "react";
import MainInfo from "../../components/property-info/MainInfo";
import GoogleMapToShow from "../../components/maps/GoogleMapToShow";
import ScheduleModal from "../../components/modals/ScheduleModal";
import GoBackButton from "../../components/buttons/GoBackButton";
import { FaRegUserCircle } from "react-icons/fa";

// Datos compartidos para horarios y días
const scheduleData = {
  days: ["Lun", "Vie", "Sáb", "Dom"],
  hours: ["7:00", "8:00", "13:00", "17:00"],
  defaultSelectedDay: "Lun",
  defaultSelectedHour: "13:00",
};

const PropertyDetails = ({ property }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(
    scheduleData.defaultSelectedDay
  );
  const [selectedHour, setSelectedHour] = useState(
    scheduleData.defaultSelectedHour
  );

  return (
    <>
      <div className="relative w-full min-h-screen p-4 md:p-7 lg:p-10 flex flex-col gap-6 lg:gap-9 pb-20 lg:pb-10">
        <div className="absolute top-8 left-8 z-10">
          <GoBackButton />
        </div>

        <MainInfo />

        {/* Sección de precio y agenda - visible solo en desktop */}
        <div className="hidden lg:flex flex-col lg:flex-row w-full lg:h-1/2 gap-6 lg:gap-10">
          <div className="w-full lg:w-1/2 text-text-color px-2 lg:px-5 flex flex-col gap-4 lg:gap-6">
            <div>
              <p className="text-lg">Price</p>
              <p className="text-3xl font-bold tracking-widest">$777777</p>
            </div>
            <div className="flex flex-col">
              <p className="text-xl py-6">Viewing Schedule</p>
              {/* Schedule Viewing para Desktop */}
              <div className="flex items-center justify-center gap-5">
                {scheduleData.days.map((day) => (
                  <div
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`w-16 h-24 border-2 flex items-center justify-center rounded-3xl cursor-pointer transition-colors
                      ${
                        selectedDay === day
                          ? "border-secondary-green bg-secondary-green bg-opacity-10"
                          : "border-secondary-green border-opacity-50"
                      }`}
                  >
                    <p className="text-lg font-semibold">{day}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-5 py-5">
                {scheduleData.hours.map((hour) => (
                  <div
                    key={hour}
                    onClick={() => setSelectedHour(hour)}
                    className={`w-20 p-1 flex items-center justify-center rounded-3xl cursor-pointer transition-colors
                      ${
                        selectedHour === hour
                          ? "bg-secondary-green"
                          : "bg-secondary-green bg-opacity-50"
                      }`}
                  >
                    <p className="text-lg font-semibold text-background-color tracking-wider">
                      {hour}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-xl py-6">Owner info</p>
              <div className="w-2/3 p-2 flex items-center gap-8 bg-white shadow-md rounded-2xl place-self-center">
                <FaRegUserCircle className="w-10 h-10" />
                <div>
                  <p className="text-xl font-semibold">Martin Hernandez</p>
                  <p className="font-light">owner</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-12 py-4 bg-secondary-green rounded-xl flex place-self-center mt-6"
              >
                <p className="text-background-color font-bold">
                  Agendar visita
                </p>
              </button>
            </div>
          </div>

          {/* Sección de dirección y mapa */}
          <div className="w-full lg:w-1/2 text-text-color">
            <div className="py-5">
              <p className="text-xl font-semibold">Adress</p>
              <p className="text-lg">
                Colonia La Sultana casa 2 poligono E, Antiguo Cuscatlan, La
                Libertad.
              </p>
            </div>
            <div className="w-full h-4/5">
              <GoogleMapToShow lat={13.6808} lng={-89.2359} />
            </div>
          </div>
        </div>

        {/* Sección de dirección y mapa para móvil */}
        <div className="flex lg:hidden flex-col w-full gap-6">
          <div className="text-text-color">
            <div className="py-3">
              <p className="text-lg font-semibold">Adress</p>
              <p className="text-xs lg:text-base">
                Colonia La Sultana casa 2 poligono E, Antiguo Cuscatlan, La
                Libertad.
              </p>
            </div>
            <div className="w-full h-64">
              <GoogleMapToShow lat={13.6808} lng={-89.2359} />
            </div>
          </div>

          {/* Información del propietario para móvil */}
          <div className="w-full px-2">
            <p className="text-lg font-semibold py-4">Owner info</p>
            <div className="w-full p-3 flex items-center gap-4 bg-white shadow-md rounded-xl">
              <FaRegUserCircle className="w-8 h-8" />
              <div>
                <p className="text-lg font-semibold">Martin Hernandez</p>
                <p className="text-sm font-light">owner</p>
              </div>
            </div>
          </div>
        </div>

        {/* Botón fijo en la parte inferior para móvil */}
        <div className="fixed bottom-0 left-0 right-0 lg:hidden">
          <div className="flex items-center justify-between bg-white px-4 py-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div>
              <p className="text-sm text-gray-600">Price</p>
              <p className="text-xl font-bold">$777777</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-secondary-green px-6 py-2 rounded-lg"
            >
              <p className="text-background-color font-semibold">
                Agendar visita
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Modal de agenda */}
      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        scheduleData={scheduleData}
        selectedDay={selectedDay}
        selectedHour={selectedHour}
        onDaySelect={setSelectedDay}
        onHourSelect={setSelectedHour}
      />
    </>
  );
};

export default PropertyDetails;
