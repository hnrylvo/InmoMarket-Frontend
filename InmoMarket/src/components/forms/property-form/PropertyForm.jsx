import React from "react";
import TextField from "../../inputs/TextField";
import FormDDMenu from "../../dropdown-menus/FormDDMenu";
import NextButton from "../../buttons/NextButton";

export default function PropertyForm({ 
  propertyType, 
  departaments, 
  municipality, 
  setMunicipality, 
  neighborhood, 
  setNeighborhood,
  onNext,
  selectedPropertyType,
  setSelectedPropertyType,
  selectedDepartment,
  setSelectedDepartment
}) {
  const handleNext = () => {
    // Validar que los campos requeridos estén completos
    if (!selectedPropertyType || !selectedDepartment || !municipality || !neighborhood) {
      alert("Please fill in all required fields");
      return;
    }
    onNext();
  };

  return (
    <div className="flex lg:w-1/2 lg:h-4/5 flex-col py-8 px-14 gap-12 bg-background-color rounded-2xl">
      <h3 className="text-text-color text-2xl font-medium text-center">
        Tell us about your property
      </h3>
      <div>
        <p className="text-text-color text-xl font-medium py-5">
          Property Type <span className="text-red-500">*</span>
        </p>
        <FormDDMenu 
          options={propertyType} 
          placeholder="Select property type" 
          value={selectedPropertyType}
          onChange={(value) => setSelectedPropertyType(value)}
        />
      </div>
      <div>
        <p className="text-text-color text-xl font-medium py-5">
          Department <span className="text-red-500">*</span>
        </p>
        <FormDDMenu 
          options={departaments} 
          placeholder="Select department"
          value={selectedDepartment}
          onChange={(value) => setSelectedDepartment(value)}
        />
      </div>
      <div>
        <p className="text-text-color text-xl font-medium py-5">
          Municipality <span className="text-red-500">*</span>
        </p>
        <TextField
          value={municipality}
          onChange={(e) => setMunicipality(e.target.value)}
          placeholder="Enter municipality"
        />
      </div>
      <div>
        <p className="text-text-color text-xl font-medium py-5">
          Address <span className="text-red-500">*</span>
        </p>
        <TextField
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
          placeholder="Enter address"
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <NextButton onClick={handleNext} />
      </div>
    </div>
  );
}