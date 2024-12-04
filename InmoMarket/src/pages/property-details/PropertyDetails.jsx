import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainInfo from "../../components/property-info/MainInfo";
import GoogleMapToShow from "../../components/maps/GoogleMapToShow";
import ScheduleModal from "../../components/modals/ScheduleModal";
import GoBackButton from "../../components/buttons/GoBackButton";
import { getPublicationById, reportPublication } from "../../services/api";

const PropertyDetails = () => {
  const [publication, setPublication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [reportReason, setReportReason] = useState("");
  const [reportError, setReportError] = useState(null);
  const [reportSuccess, setReportSuccess] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchPublicationDetails = async () => {
      try {
        const fetchedPublication = await getPublicationById(id);
        setPublication(fetchedPublication);

        setSelectedDay(fetchedPublication.selectedDays?.[0]);
        setSelectedHour(fetchedPublication.selectedTimes?.[0]);

        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchPublicationDetails();
  }, [id]);

  const handleReportSubmit = async () => {
    if (!reportReason.trim()) {
      setReportError("Por favor, proporcione un motivo para denunciar");
      return;
    }

    try {
      await reportPublication(id, { reason: reportReason });
      setReportSuccess(true);
      setReportError(null);
      setTimeout(() => {
        setIsReportModalOpen(false);
        setReportSuccess(false);
      }, 2000);
    } catch (err) {
      setReportError(
        err.response?.data?.message || "Error al enviar la denuncia"
      );
    }
  };

  const ReportButton = ({ className }) => (
    <button
      onClick={() => setIsReportModalOpen(true)}
      className={`flex items-center gap-2 text-red-500 hover:bg-red-50 rounded-lg p-2 transition-colors ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
        <line x1="12" y1="22" x2="12" y2="11"></line>
      </svg>
      <span className="font-semibold">Denunciar</span>
    </button>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Cargando detalles de la publicación...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error al cargar los detalles de la publicación
      </div>
    );
  }

  if (!publication) {
    return null;
  }

  return (
    <>
      <div className="relative w-full min-h-screen p-4 md:p-7 lg:p-10 flex flex-col gap-6 lg:gap-9 pb-20 lg:pb-10">
        <div className="absolute top-8 left-8 z-10 flex items-center gap-4">
          <GoBackButton />
          <div className="lg:hidden">
            <ReportButton />
          </div>
        </div>

        <MainInfo publication={publication} />

        {/* Sección de precio y agenda - visible solo en desktop */}
        <div className="hidden lg:flex flex-col lg:flex-row w-full lg:h-1/2 gap-6 lg:gap-10">
          <div className="w-full lg:w-1/2 text-text-color px-2 lg:px-5 flex flex-col gap-4 lg:gap-6">
            {/* Price section */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg">Precio</p>
                <p className="text-3xl font-bold tracking-widest">
                  ${publication.propertyPrice.toLocaleString()}
                </p>
              </div>
              <div className="hidden lg:block">
                <ReportButton />
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-xl py-6">Horario de visita</p>
              <div className="flex items-center justify-center gap-5">
                {publication?.selectedDays.map((day) => (
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
                {publication?.selectedTimes.map((hour) => (
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
              <p className="text-xl py-6">Información del propietario</p>
              <div className="w-2/3 p-3 flex items-center gap-8 bg-white shadow-md rounded-2xl place-self-center">
                <div>
                  <p className="text-xl font-semibold">
                    {publication.seller.name}
                  </p>
                  <p className="font-light">propietario</p>
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
              <p className="text-xl font-semibold">Dirección</p>
              <p className="text-lg">
                {publication.propertyAddress}, {publication.neighborhood},{" "}
                {publication.municipality}, {publication.department}
              </p>
            </div>
            <div className="w-full h-4/5">
              <GoogleMapToShow
                lat={publication.latitude}
                lng={publication.longitude}
              />
            </div>
          </div>
        </div>

        {/* Sección de dirección y mapa para móvil */}
        <div className="flex lg:hidden flex-col w-full gap-6">
          <div className="text-text-color">
            <div className="py-3">
              <p className="text-lg font-semibold">Dirección</p>
              <p className="text-xs lg:text-base">
                {publication.propertyAddress}, {publication.neighborhood},{" "}
                {publication.municipality}, {publication.department}
              </p>
            </div>
            <div className="w-full h-64">
              <GoogleMapToShow
                lat={publication.latitude}
                lng={publication.longitude}
              />
            </div>
          </div>

          {/* Información del propietario para móvil */}
          <div className="w-full px-2">
            <p className="text-lg font-semibold py-4">
              Información del propietario
            </p>
            <div className="w-full p-3 flex items-center gap-4 bg-white shadow-md rounded-xl">
              <div>
                <p className="text-lg font-semibold">
                  {publication.seller.name}
                </p>
                <p className="text-sm font-light">propietario</p>
              </div>
            </div>
          </div>
        </div>

        {/* Botón fijo en la parte inferior para móvil */}
        <div className="fixed bottom-0 left-0 right-0 lg:hidden">
          <div className="flex items-center justify-between bg-white px-4 py-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div>
              <p className="text-sm text-gray-600">Precio</p>
              <p className="text-xl font-bold">
                ${publication.propertyPrice.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <ReportButton />
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
      </div>

      {/* Schedule Modal */}
      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        scheduleData={{
          days: publication.selectedDays,
          hours: publication.selectedTimes,
        }}
        selectedDay={selectedDay}
        selectedHour={selectedHour}
        onDaySelect={setSelectedDay}
        onHourSelect={setSelectedHour}
        phoneNumber={publication.phoneNumber}
        neighborhood={publication.neighborhood}
      />

      {/* Report Modal */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center 
        ${isReportModalOpen ? "visible" : "invisible"}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsReportModalOpen(false);
            setReportError(null);
          }
        }}
      >
        <div
          className={`bg-white rounded-2xl p-6 w-96 max-w-full transform transition-all duration-300
          ${
            isReportModalOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold mb-4">Denunciar Publicación</h2>
          <textarea
            className="w-full h-32 border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-secondary-green"
            placeholder="Por favor, proporcione un motivo para denunciar esta publicación"
            value={reportReason}
            onChange={(e) => {
              setReportReason(e.target.value);
              setReportError(null);
            }}
          />
          {reportError && (
            <p className="text-red-500 text-sm mb-4">{reportError}</p>
          )}
          {reportSuccess && (
            <p className="text-green-500 text-sm mb-4">
              ¡Denuncia enviada con éxito!
            </p>
          )}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => {
                setIsReportModalOpen(false);
                setReportReason("");
                setReportError(null);
              }}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancelar
            </button>
            <button
              onClick={handleReportSubmit}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Enviar Denuncia
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetails;