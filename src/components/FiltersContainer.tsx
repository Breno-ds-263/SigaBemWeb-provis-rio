import React from "react";

// Definições de Tipo para Simulação
type ActiveFormType = "people" | "stops"; 
type CityKey = keyof typeof neighborhoodsByCity | "all"; 

const neighborhoodsByCity = {
  "Abreu e Lima": [
    "Alto da Bela Vista", "Alto São Miguel", "Caetés", "Caetés I", "Caetés II", "Caetés III", 
    "Caiana", "Centro", "Desterro", "Engenho Novo", "Fosfato", "Inhamã", "Matinha", 
    "Pitangas", "Planalto", "São Bento", "Timbó",
  ],
  Araçoiaba: [
    "Centro", "Loteamento Bom Jesus", "Loteamento Esperança", "Loteamento Flores", 
    "Nova Araçoiaba", "Quinze", "Vila Itapipiré",
  ],
  "Cabo de Santo Agostinho": [
    "Alto da Bela Vista", "Banda Baixa", "Bom Conselho", "Centro", "Charneca", 
    "Charnequinha", "Cohab", "Destilaria", "Distrito Industrial Diper", 
    "Distrito Industrial Santo Estevão", "Enseada dos Corais", "Engenho Ilha", 
    "Gaibu", "Garapu", "Itapuama", "Jardim Santo Inácio", "Malaquias", 
    "Mercês", "Paiva", "Pirapama", "Ponte dos Carvalhos", "Pontezinha", 
    "Rosário", "São Francisco", "Santo Agostinho", "Suape", "Vila Pirapama", 
    "Vila Roca", "Vila Social Contra Mocambo",
  ],
  Camaragibe: [
    "Alberto Maia", "Aldeia de Baixo", "Aldeia dos Camarás", "Alto da Boa Vista", 
    "Alto Santo Antonio", "Areeiro", "Bairro dos Estados", "Bairro Novo do Carmelo", 
    "Borralho", "Céu Azul", "Celeiro das Alegrias Futuras", "Estação Nova", 
    "João Paulo II", "Jardim Primavera", "Nazaré", "Oitenta", "Santa Mônica", 
    "Santa Tereza", "Santana", "São João e São Paulo", "São Paulo", "São Pedro", 
    "Tabatinga", "Timbí", "Vale das Pedreiras", "Vera Cruz", "Viana", 
    "Vila da Fábrica", "Vila da Inabi",
  ],
  Igarassu: [
    "Agamenon Magalhães", "Alto do Céu", "Ana de Albuquerque", "Área Rural de Igarassu", 
    "Bela Vista", "Bonfim", "Campina de Feira", "Centro", "Cruz do Rebouças", 
    "Encanto Igarassu", "Inhamã", "Jabacó", "Jardim Boa Sorte", "Monjope", 
    "Pancó", "Posto de Monta", "Rubina", "Santa Luzia", "Santa Rita", 
    "Santo Antônio", "Saramandaia", "Sítio dos Marcos", "Tabatinga", 
    "Triunfo", "Umbura", "Vila Rural",
  ],
  "Ilha de Itamaracá": ["Baixa Verde"],
  Ipojuca: [
    "Camela", "Centro", "Distrito de Camela", "Nossa Senhora do Ó", 
    "Porto de Galinhas", "Suape",
  ],
  Itapissuma: ["Centro"],
  "Jaboatão dos Guararapes": [
    "Área Rural de Jaboatão dos Guararapes", "Barra de Jangada", "Bulhões", 
    "Cajueiro Seco", "Candeias", "Cavaleiro", "Centro", "Comportas", 
    "Curado", "Dois Carneiros", "Engenho Velho", "Floriano", "Guararapes", 
    "Jardim Jordão", "Manassu", "Marcos Freire", "Muribeca", "Muribeca dos Guararapes", 
    "Muribequinha", "Piedade", "Prazeres", "Santana", "Santo Aleixo", 
    "Socorro", "Sucupira", "Vargem Fria", "Vila Rica", "Vista Alegre", 
    "Zumbi do Pacheco",
  ],
  Moreno: ["Centro"],
  Olinda: [
    "Águas Compridas", "Aguazinha", "Alto da Bondade", "Alto da Conquista", 
    "Alto da Nação", "Alto Sol Nascente", "Amaro Branco", "Amparo", 
    "Área Rural de Olinda", "Bairro Novo", "Bonsucesso", "Bultrins", 
    "Caixa D'Água", "Carmo", "Casa Caiada", "Fragoso", "Guadalupe", 
    "Jardim Atlântico", "Jardim Brasil", "Monte", "Ouro Preto", "Passarinho", 
    "Peixinhos", "Rio Doce", "Salgadinho", "Santa Tereza", "São Benedito", 
    "Sapucaia", "Sítio Novo", "Tabajara", "Umuarama", "Varadouro", 
    "Vila Popular",
  ],
  Paulista: [
    "Área Rural de Paulista", "Arthur Lundgren I", "Arthur Lundgren II", 
    "Centro", "Engenho Maranguape", "Fragoso", "Jaguarana", "Jaguaribe", 
    "Janga", "Jardim Maranguape", "Jardim Paulista", "Maranguape I", 
    "Maranguape II", "Maria Farinha", "Mirueira", "Nobre", "Nossa Senhora da Conceição", 
    "Nossa Senhora do Ó", "Paratibe", "Pau Amarelo", "Poty", "Tabajara", 
    "Vila Torres Galvão",
  ],
  Recife: [
    "Aflitos", "Afogados", "Água Fria", "Alto José Bonifácio", "Alto José do Pinho", 
    "Alto Santa Terezinha", "Alto do Mandu", "Apipucos", "Área Rural de Recife", 
    "Areias", "Arruda", "Barro", "Beberibe", "Boa Viagem", "Boa Vista", 
    "Bomba do Hemetério", "Bongi", "Brasília Teimosa", "Brejo da Guabiraba", 
    "Brejo de Beberibe", "Cabanga", "Caçote", "Cajueiro", "Campina do Barreto", 
    "Campo Grande", "Casa Amarela", "Casa Forte", "Caxangá", "Cidade Universitária", 
    "Coelhos", "COHAB", "Coqueiral", "Cordeiro", "Córrego do Jenipapo", 
    "Curado", "Derby", "Dois Irmãos", "Dois Unidos", "Encruzilhada", 
    "Engenho do Meio", "Espinheiro", "Estância", "Fundão", "Graças", 
    "Guabiraba", "Hipódromo", "Ibura", "Ilha Joana Bezerra", "Ilha do Leite", 
    "Ilha do Retiro", "Imbiribeira", "Ipsep", "Iputinga", "Jaqueira", 
    "Jardim São Paulo", "Jiquiá", "Jordão", "Linha do Tiro", "Macaxeira", 
    "Madalena", "Mangabeira", "Mangueira", "Monteiro", "Morro da Conceição", 
    "Mustardinha", "Nova Descoberta", "Paissandu", "Parnamirim", "Passarinho", 
    "Peixinhos", "Pina", "Poço", "Ponto de Parada", "Porto da Madeira", 
    "Prado", "Recife", "Rosarinho", "San Martin", "Sancho", "Santana", 
    "Santo Amaro", "Santo Antônio", "São José", "Sítio dos Pintos", 
    "Soledade", "Tamarineira", "Tejipió", "Torre", "Torreão", "Torrões", 
    "Totó", "Várzea", "Vasco da Gama", "Zumbi",
  ],
  "São Lourenço da Mata": [
    "Área Rural de São Lourenço da Mata", "Capibaribe", "Centro", 
    "Chã da Tábua", "Muribara", "Nova Tiúma", "Parque Capibaribe", 
    "Penedo", "Pixete", "Tiúma",
  ],
  all: ["Todos"],
} as const;



let activeFormMock: ActiveFormType = "people"; 
let cityPeopleMock: CityKey = "Recife"; 
let cityStopMock: CityKey = "Recife"; 
let genderMock = "all"; 

const availableCities = Object.keys(neighborhoodsByCity) as CityKey[];
const peopleNeighborhoods = neighborhoodsByCity[cityPeopleMock as keyof typeof neighborhoodsByCity] || [];
const stopNeighborhoods = neighborhoodsByCity[cityStopMock as keyof typeof neighborhoodsByCity] || [];


export default function FiltersContainerVisual() {
  return (
    <section className="flex flex-col items-center w-full my-2 border border-gray-300 rounded-lg p-3 bg-gray-50">
      
   
      <div className="flex justify-center gap-2 w-full h-[60px] mb-4">
        <button
          type="button"
          className={`flex-1 border border-green-800 rounded-lg text-sm h-[50px] transition-all ${
            activeFormMock === "people" 
              ? "bg-green-500 text-white border-green-700" 
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Filtrar Pessoas 
        </button>
        <button
          type="button"
          // Comparação agora funciona sem erro
          className={`flex-1 border border-green-800 rounded-lg text-sm h-[50px] transition-all ${
            activeFormMock === "stops" 
              ? "bg-green-500 text-white border-green-700" 
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Filtrar Paradas 
        </button>
      </div>

      {/* Formulário de Filtrar Pessoas */}
      {activeFormMock === "people" && (
        // Eventos de formulário e handlers de mudança removidos
        <form className="flex flex-col items-center w-full">
          
          {/* Faixa Etária */}
          <fieldset className="flex flex-col items-center border-2 border-black rounded-lg w-full max-w-[250px] p-3 mb-3">
            <legend className="font-semibold">Faixa Etária</legend>
            <div className="flex justify-center gap-3 mb-2">
              <label>Mínima:</label>
              <input
                type="number"
                min={0}
                defaultValue={0} 
                className="border border-gray-300 rounded px-2 w-[70px]"
              />
            </div>
            <div className="flex justify-center gap-3">
              <label>Máxima:</label>
              <input
                type="number"
                min={0}
                defaultValue={100} 
                className="border border-gray-300 rounded px-2 w-[70px]"
              />
            </div>
          </fieldset>
          
          {/* Gênero */}
          <fieldset className="flex flex-col items-center border-2 border-black rounded-lg w-full max-w-[250px] p-3 mb-3">
            <legend className="font-semibold">Gênero</legend>
            <div className="flex w-full justify-around">
              <div className="flex flex-col items-start">
                <label htmlFor="maleGender">Masculino:</label>
                <label htmlFor="femaleGender">Feminino:</label>
                <label htmlFor="allGender">Todos:</label>
              </div>
              <div className="flex flex-col space-y-4">
                <input
                  type="radio"
                  id="maleGender"
                  name="gender"
                  value="M"
                  defaultChecked={genderMock === "M"}
                />
                <input
                  type="radio"
                  id="femaleGender"
                  name="gender"
                  value="F"
                  defaultChecked={genderMock === "F"}
                />
                <input
                  type="radio"
                  id="allGender"
                  name="gender"
                  value="all"
                  defaultChecked={genderMock === "all"}
                />
              </div>
            </div>
          </fieldset>
          
          {/* Deficiência */}
          <fieldset className="flex flex-col items-center border-2 border-black rounded-lg w-full max-w-[250px] p-3 mb-3">
            <legend className="font-semibold">Deficiência</legend> 
            <select
              defaultValue="all" 
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
          
          {/* Cidade - Pessoas */}
          <fieldset className="flex flex-col items-center border-2 border-black rounded-lg w-full max-w-[250px] p-3 mb-3">
            <legend className="font-semibold">Cidade</legend>
            <select
              defaultValue={cityPeopleMock} 
              className="w-full border border-gray-300 rounded px-2 py-1"
            >
              {availableCities.map((city) => (
                <option key={city} value={city}>
                  {city === "all" ? "Todas" : city}
                </option>
              ))}
            </select>
          </fieldset>
          
          {/* Bairro - Pessoas */}
          <fieldset className="flex flex-col items-center border-2 border-black rounded-lg w-full max-w-[250px] p-3 mb-3">
            <legend className="font-semibold">Bairro</legend>
            <select
              // Comparação agora funciona sem erro
              disabled={cityPeopleMock === "all"}
              className={`w-full border border-gray-300 rounded px-2 py-1 ${
                cityPeopleMock === "all" ? "bg-gray-200" : ""
              }`}
            >
              <option value="">Todos os Bairros</option>
              {peopleNeighborhoods.map((neigh) => (
                <option key={neigh} value={neigh}>
                  {neigh}
                </option>
              ))}
            </select>
          </fieldset>
          
          <button
            type="submit"
            className="bg-green-500 text-white rounded-lg h-[40px] my-1 w-full"
          >
            Buscar
          </button>
        </form>
      )}

      {/* Formulário de Filtrar Paradas */}
      {activeFormMock === "stops" && (
        <form className="flex flex-col items-center w-full">
          
          {/* Cidade - Paradas */}
          <fieldset className="flex flex-col items-center border-2 border-black rounded-lg w-full max-w-[250px] p-3 mb-3">
            <legend className="font-semibold">Cidade</legend>
            <select
              defaultValue={cityStopMock} 
              className="w-full border border-gray-300 rounded px-2 py-1"
            >
              {availableCities.map((city) => (
                <option key={city} value={city}>
                  {city === "all" ? "Todas" : city}
                </option>
              ))}
            </select>
          </fieldset>
          
          {/* Bairro - Paradas */}
          <fieldset className="flex flex-col items-center border-2 border-black rounded-lg w-full max-w-[250px] p-3 mb-3">
            <legend className="font-semibold">Bairro</legend>
            <select
              // Comparação agora funciona sem erro
              disabled={cityStopMock === "all"}
              className={`w-full border border-gray-300 rounded px-2 py-1 ${
                cityStopMock === "all" ? "bg-gray-200" : ""
              }`}
            >
              <option value="">Todos os Bairros</option>
              {stopNeighborhoods.map((neigh) => (
                <option key={neigh} value={neigh}>
                  {neigh}
                </option>
              ))}
            </select>
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