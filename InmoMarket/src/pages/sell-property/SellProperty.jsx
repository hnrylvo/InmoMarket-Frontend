import React, { useState, useEffect } from "react";
import FormHeader from "../../components/headers/FormHeader";
import PropertyForm from "../../components/forms/property-form/PropertyForm";
import PropertyUbication from "../../components/forms/ubication-form/PropertyUbication";
import PropertySpecs from "../../components/forms/specs-form/PropertySpecs";
import PropertyImportantInfo from "../../components/forms/important-details-form/PropertyImportantInfo";

export default function SellProperty() {
  const propertyType = ["House", "Apartment", "Beach House"];
  const departaments = [
    "Ahuachapán", "Santa Ana", "Sonsonate", "Chalatenango",
    "La Libertad", "San Salvador", "Cuscatlán", "La Paz",
    "Cabañas", "San Vicente", "Usulután", "San Miguel",
    "Morazán", "La Unión",
  ];

  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem('currentStep');
    return savedStep ? Number(savedStep) : 0;
  });

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('propertyFormData');
    return savedData ? JSON.parse(savedData) : {
      propertyType: '',
      department: '',
      municipality: '',
      neighborhood: '',
      propertyAddress: '',
      latitude: 13.6808,
      longitude: -89.2359,
      propertyBedrooms: '',
      propertyBathrooms: '',
      propertyParking: '',
      propertySize: '',
      propertyFloors: '',
      propertyFurnished: '',
      propertyDescription: '',
      propertyPrice: '',
    };
  });

  useEffect(() => {
    localStorage.setItem('propertyFormData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('currentStep', currentStep);
  }, [currentStep]);

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    // Aquí puedes implementar la lógica para enviar los datos a tu API
    try {
      console.log('Datos a enviar:', formData);
      // const response = await api.post('/property', formData);
      // if (response.ok) {
      //   // Limpiar el formulario y localStorage
      //   localStorage.removeItem('propertyFormData');
      //   localStorage.removeItem('currentStep');
      //   // Redireccionar o mostrar mensaje de éxito
      // }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PropertyForm
            propertyType={propertyType}
            departaments={departaments}
            municipality={formData.municipality}
            setMunicipality={(value) => updateFormData('municipality', value)}
            neighborhood={formData.neighborhood}
            setNeighborhood={(value) => updateFormData('neighborhood', value)}
            selectedPropertyType={formData.selectedPropertyType}
            setSelectedPropertyType={(value) => updateFormData('selectedPropertyType', value)}
            selectedDepartment={formData.selectedDepartment}
            setSelectedDepartment={(value) => updateFormData('selectedDepartment', value)}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <PropertyUbication
            address={formData.address}
            setAdress={(value) => updateFormData('address', value)}
            lat={formData.lat}
            lng={formData.lng}
            setLat={(value) => updateFormData('lat', value)}
            setLng={(value) => updateFormData('lng', value)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 2:
        return (
          <PropertySpecs
            rooms={formData.rooms}
            setRooms={(value) => updateFormData('rooms', value)}
            bathrooms={formData.bathrooms}
            setBathrooms={(value) => updateFormData('bathrooms', value)}
            parking={formData.garages}
            setParking={(value) => updateFormData('garages', value)}
            area={formData.area}
            setArea={(value) => updateFormData('area', value)}
            floors={formData.floor}
            setFloors={(value) => updateFormData('floor', value)}
            furnished={formData.furnished}
            setFurnished={(value) => updateFormData('furnished', value)}
            description={formData.description}
            setDescription={(value) => updateFormData('description', value)}
            onPrev={handlePrev}
            onNext={handleNext}
            //onSubmit={handleSubmit}
          />
        );
        case 3:
          return (
            <PropertyImportantInfo />
          )
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-white">
      <FormHeader />
      {renderStep()}
    </div>
  );
}