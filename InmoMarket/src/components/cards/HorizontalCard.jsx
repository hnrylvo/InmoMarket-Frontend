import React from "react";
import { FaRuler, FaBed, FaBath } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function HorizontalCard({ publication }) {
  const navigate = useNavigate();

  const handlePropertyClick = () => {
    navigate(`/property-details/${publication._id}`);
  }

  // Use first image from propertyImages or a default placeholder
  const propertyImage = publication.propertyImages && publication.propertyImages.length > 0 
    ? publication.propertyImages[0].secure_url 
    : '';

  return (
    <div 
    onClick={handlePropertyClick}
    className="flex w-full gap-3 py-3 mt-7 items-center border-b border-gray-200 shadow-sm active:scale-[.99] transition-all hover:scale-[1.01] cursor-pointer">
      <img
        className="w-16 h-16 lg:w-24 lg:h-24 rounded-lg object-cover bg-gray-200"
        src={propertyImage}
        alt="Property Image"
      />
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between">
          <p className="lg:text-xl font-bold text-text-color">${publication.propertyPrice.toLocaleString()}</p>
          <div className="flex items-center justify-between gap-5 text-sm lg:text-base text-primary-color">
            <div className="flex items-center gap-1">
              <FaRuler className="w-3 h-3" />
              <span>{publication.propertySize} m²</span>
            </div>
            <div className="flex items-center gap-1">
              <FaBed className="w-3 h-3" />
              <span>{publication.propertyBedrooms} hab.</span>
            </div>
            <div className="hidden lg:flex items-center gap-1">
              <FaBath className="w-3 h-3" />
              <span>{publication.propertyBathrooms} baños</span>
            </div>
          </div>
        </div>
        <div className="mt-1">
          <span className="text-sm lg:text-base font-medium text-gray-500">
            {publication.propertyType}
          </span>
          <p className="text-base lg:text-lg text-gray-700">
            {`${publication.neighborhood}, ${publication.municipality}`}
          </p>
        </div>
      </div>
    </div>
  );
}