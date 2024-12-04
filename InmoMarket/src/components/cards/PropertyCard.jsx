import React from "react";
import { FaRuler, FaBed, FaBath } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PropertyCard({ publication }) {
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
    className="w-80 h-auto max-w-xs rounded-lg shadow-lg overflow-hidden bg-primary-color active:scale-[.99] transition-all hover:scale-[1.01] cursor-pointer">
      <div className="relative">
        <img
          className="w-full h-40 object-cover"
          src={propertyImage}
          alt="Property Image"
        />
      </div>
      <div className="p-3 text-background-color">
        <h3 className="text-xs">{publication.propertyType}</h3>
        <p className="text-2xl font-bold my-3">${publication.propertyPrice.toLocaleString()}</p>
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{publication.neighborhood}</span>
          <span className="text-xs">{`${publication.municipality}, ${publication.department}`}</span>
        </div>
        <div className="mt-6 flex items-center justify-between text-xs text-background-color">
          <div className="flex justify-evenly gap-2">
            <FaRuler className="w-4 h-4" />
            <span>{publication.propertySize} m²</span>
          </div>
          <div className="flex justify-evenly gap-2">
            <FaBed className="w-4 h-4" />
            <span>{publication.propertyBedrooms} hab.</span>
          </div>
          <div className="flex justify-evenly gap-2">
            <FaBath className="w-4 h-4" />
            <span>{publication.propertyBathrooms} baños</span>
          </div>
        </div>
      </div>
    </div>
  );
}