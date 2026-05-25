import { useState, useCallback, useMemo } from "react";
import { neighborhoodsByCity } from "../../../constants/neighborhoods";
import type { CityKey, Neighborhood } from "../../../types/map";
import type { DisabilityType, Gender } from "../../../types/common";

export function useMapFilters() {
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(100);
  const [gender, setGender] = useState<Gender>("M");
  const [disability, setDisability] = useState<DisabilityType>("MULTIPLA");
  const [cityPeople, setCityPeople] = useState<CityKey>("Recife");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<Neighborhood | "Todos">("Todos");

  const availableCities = useMemo(() => Object.keys(neighborhoodsByCity) as CityKey[], []);
  const peopleNeighborhoods = useMemo(() => neighborhoodsByCity[cityPeople] || [], [cityPeople]);

  const resetFilters = useCallback(() => {
    setMinAge(0);
    setMaxAge(100);
    setGender("M");
    setDisability("MULTIPLA");
    setCityPeople("Recife");
    setSelectedNeighborhood("Todos");
  }, []);

  return {
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
    resetFilters,
  };
}
