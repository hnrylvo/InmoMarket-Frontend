import React from "react";
import {
  FaRuler,
  FaBed,
  FaBath,
  FaCar,
  FaGopuram,
  FaCouch,
  FaRegHeart,
} from "react-icons/fa";

const MainInfo = ({ publication }) => {
  // Use the first image from propertyImages or a default placeholder
  const mainImage = publication.propertyImages && publication.propertyImages.length > 0 
    ? publication.propertyImages[0].secure_url 
    : '';

  return (
    <div className="flex flex-col lg:flex-row lg:gap-10">
      {/* Imagen principal */}
      <div className="w-full lg:w-1/2 h-64 lg:h-auto lg:px-5 mb-4 lg:mb-0">
        <img
          src={mainImage}
          alt="Property"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      {/* Información principal */}
      <div className="w-full lg:w-1/2 flex flex-col gap-2 lg:gap-4 text-text-color px-2 lg:px-0">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-xl lg:text-2xl font-bold">{publication.neighborhood}</h2>
            <p className="text-base lg:text-lg font-light">{publication.propertyType}</p>
          </div>
          <FaRegHeart className="w-6 lg:w-9 h-6 lg:h-9 text-text-color cursor-pointer" />
        </div>
        {/* Características */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2 lg:gap-4 py-2 lg:py-4">
          {[
            { icon: FaRuler, text: `${publication.propertySize} m2` },
            { icon: FaBed, text: `${publication.propertyBedrooms} hab.` },
            { icon: FaBath, text: `${publication.propertyBathrooms} baños` },
            { icon: FaCar, text: `${publication.propertyParking} parqueos` },
            { icon: FaGopuram, text: `${publication.propertyFloors} pisos` },
            { icon: FaCouch, text: publication.propertyFurnished ? "Amueblada" : "No amueblada" },
          ].map(({ icon: Icon, text }, index) => (
            <div key={index} className="flex items-center gap-2 lg:gap-4 p-2 lg:p-3">
              <Icon className="w-5 h-5 lg:w-7 lg:h-7" />
              <p className="text-sm lg:text-lg font-light">{text}</p>
            </div>
          ))}
        </div>
        {/* Descripción */}
        <div className="flex flex-col gap-3 lg:gap-4 flex-grow">
          <p className="text-lg lg:text-xl font-semibold">Description</p>
          <textarea
            value={publication.propertyDescription}
            readOnly
            className="w-full h-32 lg:h-full bg-background-color border-2 border-secondary-green rounded-xl lg:rounded-2xl p-3 lg:p-4 resize-none text-sm lg:text-base pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export default MainInfo;