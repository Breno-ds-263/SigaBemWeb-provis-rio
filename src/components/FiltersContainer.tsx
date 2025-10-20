import { useState } from "react";

export default function FiltersContainer() {
  const [activeForm, setActiveForm] = useState<"people" | "stops">("people");

  return (
    <section className="flex flex-col items-center w-full my-2 border border-gray-300 rounded-lg p-3 bg-gray-50">
      {/* Botões de alternância */}
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
        <form className="flex flex-col items-center w-full">
          {/* Faixa Etária */}
          <fieldset className="flex flex-col items-center border-2 border-black rounded-lg w-full max-w-[250px] p-3 mb-3">
            <legend className="font-semibold">Faixa Etária</legend>
            <div className="flex justify-center gap-3 mb-2">
              <label htmlFor="minAge">Mínima:</label>
              <input
                type="number"
                id="minAge"
                className="border border-gray-300 rounded px-2 w-[70px]"
                min={0}
              />
            </div>
            <div className="flex justify-center gap-3">
              <label htmlFor="maxAge">Máxima:</label>
              <input
                type="number"
                id="maxAge"
                className="border border-gray-300 rounded px-2 w-[70px]"
                min={0}
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
                <input type="radio" id="maleGender" name="gender" value="M" />
                <input type="radio" id="femaleGender" name="gender" value="F" />
                <input type="radio" id="allGender" name="gender" value="all" />
              </div>
            </div>
          </fieldset>

          {/* Deficiência */}
          <fieldset className="flex flex-col items-center border-2 border-black rounded-lg w-full max-w-[250px] p-3 mb-3">
            <legend className="font-semibold">Deficiência</legend>
            <select
              id="disability"
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
              id="city-select-people"
              className="w-full border border-gray-300 rounded px-2 py-1"
            >
              <option value="Abreu e Lima">Abreu e Lima</option>
              <option value="Araçoiaba">Araçoiaba</option>
              <option value="Recife">Recife</option>
              <option value="Olinda">Olinda</option>
              <option value="Paulista">Paulista</option>
              <option value="Igarassu">Igarassu</option>
              <option value="Camaragibe">Camaragibe</option>
              <option value="Jaboatão dos Guararapes">
                Jaboatão dos Guararapes
              </option>
              <option value="all">Todos</option>
            </select>
          </fieldset>

          {/* Bairro */}
          <fieldset className="flex flex-col items-center border-2 border-black rounded-lg w-full max-w-[250px] p-3 mb-3">
            <legend className="font-semibold">Bairro</legend>
            <select className="w-full border border-gray-300 rounded px-2 py-1">
              <option value="">Selecione um bairro</option>
            </select>
          </fieldset>

          {/* Botões */}
          <div className="flex flex-col w-full max-w-[250px] p-3">
            <button type="submit" className="bg-green-500 text-white rounded-lg h-[40px] my-1">
              Buscar
            </button>
            <button
              type="button"
              className="bg-gray-300 rounded-lg h-[40px] my-1 hover:bg-gray-400"
            >
              Limpar Filtros
            </button>
          </div>
        </form>
      )}

      {/* FORM PARADAS */}
      {activeForm === "stops" && (
        <form className="flex flex-col items-center w-full">
          <fieldset className="flex flex-col items-center border-2 border-black rounded-lg w-full max-w-[250px] p-3 mb-3">
            <legend className="font-semibold">Cidade</legend>
            <select
              id="city-select-stop"
              className="w-full border border-gray-300 rounded px-2 py-1"
            >
              <option value="Recife">Recife</option>
              <option value="Olinda">Olinda</option>
              <option value="Paulista">Paulista</option>
              <option value="Jaboatão dos Guararapes">
                Jaboatão dos Guararapes
              </option>
              <option value="all">Todos</option>
            </select>
          </fieldset>

          <fieldset className="flex flex-col items-center border-2 border-black rounded-lg w-full max-w-[250px] p-3 mb-3">
            <legend className="font-semibold">Bairro</legend>
            <select className="w-full border border-gray-300 rounded px-2 py-1">
              <option value="">Selecione um bairro</option>
            </select>
          </fieldset>

          <div className="flex flex-col w-full max-w-[250px] p-3">
            <button type="submit" className="bg-green-500 text-white rounded-lg h-[40px] my-1">
              Buscar
            </button>
            <button
              type="button"
              className="bg-gray-300 rounded-lg h-[40px] my-1 hover:bg-gray-400"
            >
              Limpar Filtros
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
