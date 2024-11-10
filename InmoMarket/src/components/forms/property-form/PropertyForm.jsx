import React from "react";
import TextField from "../../inputs/TextField";
import FormDDMenu from "../../dropdown-menus/FormDDMenu";
import NextButton from "../../buttons/NextButton";

export default function PropertyForm({ 
  propertyTypeOptions, 
  departamentsOptions, 
  municipality, 
  setMunicipality, 
  neighborhood, 
  setNeighborhood,
  onNext,
  propertyType,
  setPropertyType,
  department,
  setDepartment
}) {
  const handleNext = () => {
    // Validar que los campos requeridos estén completos
    if (!propertyType || !department || !municipality || !neighborhood) {
      alert("Please fill in all required fields");
      return;
    }
    onNext();
  };

  return (
    <div className="flex lg:w-1/2 lg:h-4/5 w-full h-screen flex-col py-4 px-6 lg:py-8 lg:px-14 lg:gap-12 lg:bg-background-color rounded-2xl">
      <h3 className="text-text-color text-lg lg:text-2xl font-medium text-center">
        Tell us about your property
      </h3>
      <div>
        <p className="text-text-color text-base lg:text-xl font-medium py-5">
          Property Type <span className="text-red-500">*</span>
        </p>
        <FormDDMenu 
          options={propertyTypeOptions} 
          placeholder="Select property type" 
          value={propertyType}
          onChange={(value) => setPropertyType(value)}
        />
      </div>
      <div>
        <p className="text-text-color text-base lg:text-xl font-medium py-5">
          Department <span className="text-red-500">*</span>
        </p>
        <FormDDMenu 
          options={departamentsOptions} 
          placeholder="Select department"
          value={department}
          onChange={(value) => setDepartment(value)}
        />
      </div>
      <div>
        <p className="text-text-color text-base lg:text-xl font-medium py-5">
          Municipality <span className="text-red-500">*</span>
        </p>
        <TextField
          value={municipality}
          onChange={(e) => setMunicipality(e.target.value)}
          placeholder="Enter municipality"
        />
      </div>
      <div>
        <p className="text-text-color text-base lg:text-xl font-medium py-5">
          Address <span className="text-red-500">*</span>
        </p>
        <TextField
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
          placeholder="Enter address"
        />
      </div>
      <div className="w-full flex items-center justify-center mt-auto">
        <NextButton onClick={handleNext} />
      </div>
    </div>
  );
}