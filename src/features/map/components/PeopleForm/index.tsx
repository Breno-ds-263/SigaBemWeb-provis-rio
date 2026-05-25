import FilterField from "../FilterField";
import AgeRangeField from "./Fields/AgeRangeField";
import GenderField from "./Fields/GenderField";
import DisabilityField from "./Fields/DisabilityField";
import CityField from "./Fields/CityField";
import NeighborhoodField from "./Fields/NeighborhoodField";

import type { CityKey, Neighborhood } from "../../../../types/map";
import type { DisabilityType, Gender } from "../../../../types/common";

type PeopleFormProps = {
  // Age
  minAge: number;
  maxAge: number;
  setMinAge: React.Dispatch<React.SetStateAction<number>>;
  setMaxAge: React.Dispatch<React.SetStateAction<number>>;
  // Gender
  gender: Gender;
  setGender: React.Dispatch<React.SetStateAction<Gender>>;
  // Disability
  disability: DisabilityType;
  setDisability: React.Dispatch<React.SetStateAction<DisabilityType>>;
  // City & Neighborhood
  availableCities: CityKey[];
  cityPeople: CityKey;
  setCityPeople: React.Dispatch<React.SetStateAction<CityKey>>;
  selectedNeighborhood: Neighborhood | "Todos";
  setSelectedNeighborhood: React.Dispatch<React.SetStateAction<Neighborhood | "Todos">>;
  // Submit
  sendData: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function PeopleForm({
  minAge,
  maxAge,
  setMinAge,
  setMaxAge,
  setGender,
  disability,
  setDisability,
  cityPeople,
  availableCities,
  setCityPeople,
  selectedNeighborhood,
  setSelectedNeighborhood,
  sendData,
}: PeopleFormProps) {
  return (
    <form
      className="flex flex-col gap-4 w-full h-6/10"
      onSubmit={sendData}
    >
      {/* Age Range */}
      <FilterField 
        title="Faixa Etária" 
      >
        <AgeRangeField
          minAge={minAge}
          maxAge={maxAge}
          setMinAge={setMinAge}
          setMaxAge={setMaxAge}
        />
      </FilterField>
      {/* Gender */}
      <FilterField
        title="Gênero"
      >
        <GenderField setGender={setGender} />
      </FilterField>
      {/* Disability */}
      <FilterField
        title="Deficiência"
      >
        <DisabilityField 
          disability={disability} 
          setDisability={setDisability} 
        />
      </FilterField>
      {/* City */}
      <FilterField
        title="Cidade"
      >
        <CityField
          cityPeople={cityPeople}
          availableCities={availableCities}
          setCityPeople={setCityPeople}
        />
      </FilterField>
      {/* Neighborhood */}
      <FilterField
        title="Bairro"
      >
        <NeighborhoodField
          cityPeople={cityPeople}
          selectedNeighborhood={selectedNeighborhood}
          setSelectedNeighborhood={setSelectedNeighborhood}
        />
      </FilterField>


      <button
        type="submit"
        className="bg-brand-green text-white rounded-lg p-3 w-full cursor-pointer 
                   hover:bg-brand-dark-green transition-all font-semibold"
      >
        Buscar
      </button>
    </form>
  );
}