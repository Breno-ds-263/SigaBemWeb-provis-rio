import { neighborhoodsByCity } from "../../../../../constants/neighborhoods";
import type { CityKey, Neighborhood } from "../../../../../types/map";

type NeighborhoodFieldProps = {
  cityPeople: CityKey;
  selectedNeighborhood: Neighborhood | "Todos";
  setSelectedNeighborhood: React.Dispatch<React.SetStateAction<Neighborhood | "Todos">>;
}

export default function NeighborhoodField({ cityPeople, selectedNeighborhood, setSelectedNeighborhood }: NeighborhoodFieldProps) {
  const isDisabled = cityPeople === "all";

  const neighborhoods: readonly string[] =
    neighborhoodsByCity[cityPeople] ?? [];

  return (
      <select
        disabled={isDisabled}
        value={selectedNeighborhood}
        onChange={(e) =>
          setSelectedNeighborhood(e.target.value as Neighborhood | "Todos")
        }
        className={` text-center w-full h-full text-lg
            ${isDisabled ? "bg-gray-200" : ""}
          `}
      >
        <option value="Todos">Todos os Bairros</option>
        {neighborhoods.map((neighborhood) => (
          <option key={neighborhood} value={neighborhood}>
            {neighborhood}
          </option>
        ))}
      </select>
  );
}