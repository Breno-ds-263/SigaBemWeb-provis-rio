import type { CityKey } from "../../../../../types/map";

type cityFieldProps = {
  cityPeople: CityKey;
  availableCities: CityKey[];
  setCityPeople: React.Dispatch<React.SetStateAction<CityKey>>;
}

export default function CityField({ cityPeople, availableCities, setCityPeople }: cityFieldProps) {
  return (
    <select
      value={cityPeople}
      onChange={(e) => setCityPeople(e.target.value as CityKey)}
      className="text-center w-full h-full text-lg"
    >
      {availableCities.map((city) => (
        <option key={city} value={city}>
          {city === "all" ? "Todas" : city}
        </option>
      ))}
    </select>
  );
}