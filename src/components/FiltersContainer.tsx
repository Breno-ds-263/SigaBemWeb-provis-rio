import { useState } from "react";

interface PeopleFilters {
  minAge: number;
  maxAge: number;
  gender: string;
  disability: string;
  city: string;
  neigh: string;
}

interface StopFilters {
  city: string;
  neigh: string;
}

interface FiltersContainerProps {
  onSearchPeople: (filters: PeopleFilters) => void;
  onSearchStops: (filters: StopFilters) => void;
}

export default function FiltersContainer({
  onSearchPeople,
  onSearchStops,
}: FiltersContainerProps) {
  const [activeForm, setActiveForm] = useState<"people" | "stops">("people");

  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(100);
  const [gender, setGender] = useState("all");
  const [disability, setDisability] = useState("all");
  const [cityPeople, setCityPeople] = useState("Recife");
  const [neighPeople, setNeighPeople] = useState("");

  const [cityStop, setCityStop] = useState("Recife");
  const [neighStop, setNeighStop] = useState("");
  const [filterLine, setfilterLine] = useState("");

  const handleSubmitPeople = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchPeople({
      minAge,
      maxAge,
      gender,
      disability,
      city: cityPeople,
      neigh: neighPeople,
    });
  };

  const handleSubmitStops = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchStops({ city: cityStop, neigh: neighStop });
  };

  return (
    <section className="flex flex-col items-center w-full my-2 border border-gray-300 rounded-lg p-3 bg-gray-50">
      <div className="flex justify-center gap-2 w-full h-[60px] mb-4">
        <button
          type="button"
          onClick={() => setActiveForm("people")}
          className={`flex-1 border border-green-800 rounded-lg text-sm h-[50px] transition-all ${
            activeForm === "people"
              ? "bg-green-500 text-white border-green-700"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Filtrar Pessoas
        </button>
        <button
          type="button"
          onClick={() => setActiveForm("stops")}
          className={`flex-1 border border-green-800 rounded-lg text-sm h-[50px] transition-all ${
            activeForm === "stops"
              ? "bg-green-500 text-white border-green-700"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Filtrar Paradas
        </button>
      </div>

      {/* FORM PESSOAS */}
      {activeForm === "people" && (
        <form
          onSubmit={handleSubmitPeople}
          className="flex flex-col items-center w-full"
        >
          {/* Faixa Etária */}
          <fieldset className="flex flex-col items-center border-2 border-black rounded-lg w-full max-w-[250px] p-3 mb-3">
            <legend className="font-semibold">Faixa Etária</legend>
            <div className="flex justify-center gap-3 mb-2">
              <label>Mínima:</label>
              <input
                type="number"
                min={0}
                value={minAge}
                onChange={(e) => setMinAge(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 w-[70px]"
              />
            </div>
            <div className="flex justify-center gap-3">
              <label>Máxima:</label>
              <input
                type="number"
                min={0}
                value={maxAge}
                onChange={(e) => setMaxAge(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 w-[70px]"
              />
            </div>
          </fieldset>

          {/* Gênero */}
          <fieldset className="flex flex-col items-center border-2 border-black rounded-lg w-full max-w-[250px] p-3 mb-3">
            <legend className="font-semibold">Gênero</legend>
            <div className="flex w-full justify-around">
              <div className="flex flex-col items-start">
                <label htmlFor="maleGender">Masculino</label>
                <label htmlFor="femaleGender">Feminino</label>
                <label htmlFor="allGender">Todos</label>
              </div>
              <div className="flex flex-col">
                <input
                  type="radio"
                  id="maleGender"
                  name="gender"
                  value="M"
                  checked={gender === "M"}
                  onChange={() => setGender("M")}
                />
                <input
                  type="radio"
                  id="femaleGender"
                  name="gender"
                  value="F"
                  checked={gender === "F"}
                  onChange={() => setGender("F")}
                />
                <input
                  type="radio"
                  id="allGender"
                  name="gender"
                  value="all"
                  checked={gender === "all"}
                  onChange={() => setGender("all")}
                />
              </div>
            </div>
          </fieldset>

          {/* Deficiência */}
          <fieldset className="flex flex-col items-center border-2 border-black rounded-lg w-full max-w-[250px] p-3 mb-3">
            <legend className="font-semibold">Deficiência</legend>
            <select
              value={disability}
              onChange={(e) => setDisability(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            >
              <option value="FISICA">Física</option>
              <option value="VISUAL">Visual</option>
              <option value="AUDITIVA">Auditiva</option>
              <option value="INTELECTUAL">Intelectual</option>
              <option value="MULTIPLA">Múltipla</option>
              <option value="all">Todos</option>
            </select>
          </fieldset>

          {/* Cidade */}
          <fieldset className="flex flex-col items-center border-2 border-black rounded-lg w-full max-w-[250px] p-3 mb-3">
            <legend className="font-semibold">Cidade</legend>
            <select
              value={cityPeople}
              onChange={(e) => setCityPeople(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            >
              <option value="Recife">Recife</option>
              <option value="Olinda">Olinda</option>
              <option value="Paulista">Paulista</option>
              <option value="all">Todos</option>
            </select>
          </fieldset>

          {/* Bairro */}
          <fieldset className="flex flex-col items-center border-2 border-black rounded-lg w-full max-w-[250px] p-3 mb-3">
            <legend className="font-semibold">Bairro</legend>
            <input
              type="text"
              value={neighPeople}
              onChange={(e) => setNeighPeople(e.target.value)}
              placeholder="Digite o bairro"
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </fieldset>

          <button
            type="submit"
            className="bg-green-500 text-white rounded-lg h-[40px] my-1 w-full"
          >
            Buscar
          </button>
        </form>
      )}

      {/* FORM PARADAS */}
      {activeForm === "stops" && (
        <form
          onSubmit={handleSubmitStops}
          className="flex flex-col items-center w-full"
        >
          <fieldset className="flex flex-col items-center border-2 border-black rounded-lg w-full max-w-[250px] p-3 mb-3">
            <legend className="font-semibold">Cidade</legend>
            <select
              value={cityStop}
              onChange={(e) => setCityStop(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            >
              <option value="Recife">Recife</option>
              <option value="Olinda">Olinda</option>
              <option value="Paulista">Paulista</option>
              <option value="all">Todos</option>
            </select>
          </fieldset>

          <fieldset className="flex flex-col items-center border-2 border-black rounded-lg w-full max-w-[250px] p-3 mb-3">
            <legend className="font-semibold">Bairro</legend>
            <input
              type="text"
              value={neighStop}
              onChange={(e) => setNeighStop(e.target.value)}
              placeholder="Digite o bairro"
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </fieldset>

          <button
            type="submit"
            className="bg-green-500 text-white rounded-lg h-[40px] my-1 w-full"
          >
            Buscar
          </button>
        </form>
      )}
    </section>
  );
}
