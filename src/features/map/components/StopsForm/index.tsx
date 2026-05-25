import type { CityKey } from "../../../../types/map";
import FilterField from "../FilterField";
import CityField from "../PeopleForm/Fields/CityField";

type StopsFormProps = {
  cityPeople: CityKey;
  availableCities: CityKey[];
  peopleNeighborhoods: readonly string[];
}

export default function StopsForm({ cityPeople, availableCities, peopleNeighborhoods }: StopsFormProps) {
 return (
   <form className="flex flex-col items-center w-full gap-2">
    {/* Cidade - Paradas */}
    
      <FilterField title="Cidade">
        <CityField 
          cityPeople={cityPeople} 
          availableCities={availableCities} 
          setCityPeople={() => {}} 
        />
      </FilterField>
    
    {/* Bairro - Paradas */}
      <FilterField title="Bairro">
        <select
          disabled={cityPeople === "all"}
          className={`w-full rounded px-2 py-1 h-full${
            cityPeople === "all" ? "bg-gray-200" : ""
          }`}
        >
          <option value="">Todos os Bairros</option>
          {peopleNeighborhoods.map((neigh) => (
            <option key={neigh} value={neigh}>
              {neigh}
            </option>
          ))}
        </select>
      </FilterField>
    
    <button
      type="submit"
      className="bg-brand-green text-white rounded-lg h-[40px] my-1 w-full"
    >
      Buscar 
    </button>
  </form>
 );
}