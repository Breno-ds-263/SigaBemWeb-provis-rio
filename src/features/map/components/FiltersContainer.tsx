import React from "react";
import type { CityKey, Neighborhood } from "../../../types/map";
import type { DisabilityType } from "../../../types/common";
import PeopleForm from "./PeopleForm";
import StopsForm from "./StopsForm";
import { useMapFilters } from "../hooks/useMapFilters";

type FiltersContainerProps = {
  activeForm: "stops" | "people";
  onSubmitDados: (
    dados: { 
      minAge: number, 
      maxAge: number, 
      gender: string, 
      disability: DisabilityType, 
      cityPeople: string, 
      city: CityKey, 
      neighborhood: Neighborhood
    }
  ) => void;
};

export default function FiltersContainer({ onSubmitDados, activeForm }: FiltersContainerProps) {
  const {
    minAge,
    setMinAge,
    maxAge,
    setMaxAge,
    gender,
    setGender,
    disability,
    setDisability,
    cityPeople,
    setCityPeople,
    selectedNeighborhood,
    setSelectedNeighborhood,
    availableCities,
    peopleNeighborhoods,
  } = useMapFilters();

  const enviarDados = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitDados({ 
        minAge, 
        maxAge, 
        gender, 
        disability, 
        cityPeople, 
        city: cityPeople, 
        neighborhood: selectedNeighborhood as Neighborhood
      }
    ); 
    console.log("dados enviados");
  };
 
  return (
    <section className="flex flex-col items-center w-full border border-gray-300 rounded-lg p-3 bg-gray-50 
                        h-full overflow-y-hidden">
      {/* Formulário de Filtrar Pessoas */}
      {activeForm === "people" && (
        <PeopleForm 
          sendData={enviarDados}
          availableCities={availableCities}
          minAge={minAge}
          setMinAge={setMinAge}
          maxAge={maxAge}
          setMaxAge={setMaxAge}
          gender={gender}
          setGender={setGender}
          disability={disability}
          setDisability={setDisability}
          cityPeople={cityPeople}
          setCityPeople={setCityPeople}
          selectedNeighborhood={selectedNeighborhood}
          setSelectedNeighborhood={setSelectedNeighborhood}
        />
      )}

      {/* Formulário de Filtrar Paradas */}
      {activeForm === "stops" && (
        <StopsForm
          cityPeople={cityPeople}
          availableCities={availableCities}
          peopleNeighborhoods={peopleNeighborhoods}
        />
      )}
    </section>
  );
}
