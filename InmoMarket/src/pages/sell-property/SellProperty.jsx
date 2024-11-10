import React, { useState, useEffect } from "react";
import FormHeader from "../../components/headers/FormHeader";
import PropertyForm from "../../components/forms/property-form/PropertyForm";
import PropertyUbication from "../../components/forms/ubication-form/PropertyUbication";
import PropertySpecs from "../../components/forms/specs-form/PropertySpecs";
import PropertyImportantInfo from "../../components/forms/important-details-form/PropertyImportantInfo";
import { useNavigate } from "react-router-dom";

export default function SellProperty() {
  const propertyTypeOptions = ["House", "Apartment", "Beach House"];
  const departamentsOptions = [
    "Ahuachapán",
    "Santa Ana",
    "Sonsonate",
    "Chalatenango",
    "La Libertad",
    "San Salvador",
    "Cuscatlán",
    "La Paz",
    "Cabañas",
    "San Vicente",
    "Usulután",
    "San Miguel",
    "Morazán",
    "La Unión",
  ];

  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem("currentStep");
    return savedStep ? Number(savedStep) : 0;
  });

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("propertyFormData");
    return savedData
      ? JSON.parse(savedData)
      : {
          propertyType: "",
          department: "",
          municipality: "",
          neighborhood: "",
          propertyAddress: "",
          latitude: 13.6808,
          longitude: -89.2359,
          propertyBedrooms: "",
          propertyBathrooms: "",
          propertyParking: "",
          propertySize: "",
          propertyFloors: "",
          propertyFurnished: "",
          propertyDescription: "",
          propertyPrice: "",
          selectedDays: [],
          selectedTimes: [],
        };
  });

  useEffect(() => {
    localStorage.setItem("propertyFormData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("currentStep", currentStep);
  }, [currentStep]);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  
  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      console.log("Datos a enviar:", formData);
      // const response = await api.post('/property', formData);
      // if (response.ok) {
      //   // Limpiar el formulario y localStorage
      localStorage.removeItem('propertyFormData');
      localStorage.removeItem('currentStep');
      //   // Redireccionar o mostrar mensaje de éxito
      navigate('/home');
      // }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PropertyForm
            propertyTypeOptions={propertyTypeOptions}
            departamentsOptions={departamentsOptions}
            municipality={formData.municipality}
            setMunicipality={(value) => updateFormData("municipality", value)}
            neighborhood={formData.neighborhood}
            setNeighborhood={(value) => updateFormData("neighborhood", value)}
            propertyType={formData.propertyType}
            setPropertyType={(value) =>
              updateFormData("propertyType", value)
            }
            department={formData.department}
            setDepartment={(value) =>
              updateFormData("department", value)
            }
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <PropertyUbication
            propertyAddress={formData.propertyAddress}
            setPropertyAdress={(value) => updateFormData("propertyAddress", value)}
            latitude={formData.latitude}
            longitude={formData.longitude}
            setLat={(value) => updateFormData("latitude", value)}
            setLng={(value) => updateFormData("longitude", value)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 2:
        return (
          <PropertySpecs
            rooms={formData.propertyBedrooms}
            setRooms={(value) => updateFormData("propertyBedrooms", value)}
            bathrooms={formData.propertyBathrooms}
            setBathrooms={(value) => updateFormData("propertyBathrooms", value)}
            parking={formData.propertyParking}
            setParking={(value) => updateFormData("propertyParking", value)}
            area={formData.propertySize}
            setArea={(value) => updateFormData("propertySize", value)}
            floors={formData.propertyFloors}
            setFloors={(value) => updateFormData("propertyFloors", value)}
            furnished={formData.propertyFurnished}
            setFurnished={(value) => updateFormData("propertyFurnished", value)}
            description={formData.propertyDescription}
            setDescription={(value) => updateFormData("propertyDescription", value)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <PropertyImportantInfo
            propertyPrice={formData.propertyPrice}
            setPropertyPrice={(value) => updateFormData("propertyPrice", value)}
            selectedDays={formData.selectedDays || []}
            setSelectedDays={(value) => updateFormData("selectedDays", value)}
            onDaysChange={(days) => updateFormData("selectedDays", days)}
            selectedTimes={formData.selectedTimes || []}
            setSelectedTimes={(value) => updateFormData("selectedTimes", value)}
            onPrev={handlePrev}
            //onNext={handleSubmit}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen  bg-white">
      <FormHeader />
      {renderStep()}
    </div>
  );
}
