import React from 'react';

const PhotoPicker = ({ onUpload }) => {
  const handleFileChange = (e) => {
    if (onUpload) {
      onUpload(Array.from(e.target.files));
    }
  };

  const handleClick = () => {
    document.getElementById('file-input').click();
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center border-2 border-secondary-green rounded-xl bg-white">
      {/* Input file oculto */}
      <input
        id="file-input"
        type="file"
        multiple
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />
      {/* Botón personalizado */}
      <button
        type="button"
        onClick={handleClick}
        className="w-16 h-16 flex items-center justify-center border-2 border-secondary-green rounded-xl bg-white text-secondary-green text-4xl font-bold"
      >
        +
      </button>
    </div>
  );
};

export default PhotoPicker;
