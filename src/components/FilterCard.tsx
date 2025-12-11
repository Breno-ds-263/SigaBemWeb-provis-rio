import type { DisabilityType, NotificationType } from '../types';

interface FilterCardProps {
  title: string;
  filterType: 'disability' | 'notification';
  selectedValue: DisabilityType | NotificationType | 'all';
  onFilterChange: (value: string) => void;
  onApplyFilter: () => void;
  onClearFilter: () => void;
}

const FilterCard = ({
  title,
  filterType,
  selectedValue,
  onFilterChange,
  onApplyFilter,
  onClearFilter
}: FilterCardProps) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md w-[300px]">
      <h3 className="mb-4">{title}</h3>
      {filterType === 'disability' ? (
        <>
          <label htmlFor="disabilitySelect" className="block mb-1 font-medium">
            Tipo de Deficiência:
          </label>
          <select
            id="disabilitySelect"
            className="w-full p-2 rounded-md border border-gray-300 mb-2"
            value={selectedValue}
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="FISICA">Física</option>
            <option value="VISUAL">Visual</option>
            <option value="AUDITIVA">Auditiva</option>
            <option value="INTELECTUAL">Intelectual</option>
            <option value="MULTIPLA">Múltipla</option>
          </select>
        </>
      ) : (
        <>
          <label htmlFor="notificationTypeSelect" className="block mb-1 font-medium">
            Tipo:
          </label>
          <select
            id="notificationTypeSelect"
            className="w-full p-2 rounded-md border border-gray-300 mb-2"
            value={selectedValue}
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="mudanca">Mudança de Paradas</option>
            <option value="itinerario">Itinerário</option>
            <option value="aviso">Aviso</option>
            <option value="educativa">Campanha Educativa</option>
          </select>
        </>
      )}
      <div className="flex gap-2 mt-2">
        <button 
          className="px-4 py-2 border-none rounded-md text-sm font-semibold cursor-pointer transition-all hover:opacity-85 bg-blue-500 text-white"
          onClick={onApplyFilter}
        >
          Filtrar
        </button>
        <button 
          className="px-4 py-2 border-none rounded-md text-sm font-semibold cursor-pointer transition-all hover:opacity-85 bg-red-600 text-white"
          onClick={onClearFilter}
        >
          Limpar
        </button>
      </div>
    </div>
  );
};

export default FilterCard;
