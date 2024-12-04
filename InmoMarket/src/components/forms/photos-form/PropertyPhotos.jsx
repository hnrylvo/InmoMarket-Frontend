import React, { useState } from 'react';
import PhotoPicker from '../../pickers/PhotoPicker';
import NextButton from '../../buttons/NextButton';
import PrevButton from '../../buttons/PrevButton';

const PropertyPhotos = ({ onPrev, onSubmit }) => {
  const [photos, setPhotos] = useState([]);

  const handlePhotoUpload = (newPhotos) => {
    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const handleRemovePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit(photos);
  };

  return (
    <div className="flex lg:w-1/2 lg:h-4/5 w-full h-screen flex-col py-4 px-6 lg:py-8 lg:px-14 lg:gap-12 lg:bg-background-color rounded-2xl">
      <h3 className="text-text-color text-lg lg:text-2xl font-medium text-center">
        Property Photos
      </h3>
      <div className="h-1/2 rounded-lg p-6 my-4 flex flex-col items-center">
        <PhotoPicker onUpload={handlePhotoUpload} />
        <p className="mt-4 text-sm text-green-700">
          Al menos 3 fotos - Escoja la foto principal primero
        </p>
      </div>


      <div className="mt-4">
        <h3 className="text-green-900 font-semibold mb-2">Fotos a publicar</h3>
        <div className="flex flex-nowrap justify-center gap-4">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative w-20 h-20 border rounded-md bg-gray-200 flex items-center justify-center"
            >
              <img
                src={URL.createObjectURL(photo)}
                alt={`Foto ${index + 1}`}
                className="w-full h-full object-cover rounded-md"
              />
              <button
                onClick={() => handleRemovePhoto(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="w-full flex items-center justify-between mt-auto">
        <PrevButton onClick={onPrev} />
        <NextButton onClick={handleSubmit} text="Publicar" />
      </div>
    </div>
  );
};

export default PropertyPhotos;