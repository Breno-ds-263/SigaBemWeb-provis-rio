import type { NotificationType } from '../types/notifications';
import type { DisabilityType } from '../types/common';

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
    <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-brand-green w-full">
      <h3 className="text-xl font-bold mb-4 text-brand-dark-green border-b pb-2">{title}</h3>
      
      <div className="space-y-4">
        {filterType === 'disability' ? (
          <div>
            <label htmlFor="disabilitySelect" className="block text-sm font-bold text-gray-700 mb-1">
              Tipo de Deficiência
            </label>
            <select
              id="disabilitySelect"
              className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none bg-gray-50 transition-all cursor-pointer"
              value={selectedValue}
              onChange={(e) => onFilterChange(e.target.value)}
            >
              <option value="all">Todas as Deficiências</option>
              <option value="FISICA">Física</option>
              <option value="VISUAL">Visual</option>
              <option value="AUDITIVA">Auditiva</option>
              <option value="INTELECTUAL">Intelectual</option>
              <option value="MULTIPLA">Múltipla</option>
            </select>
          </div>
        ) : (
          <div>
            <label htmlFor="notificationTypeSelect" className="block text-sm font-bold text-gray-700 mb-1">
              Tipo de Notificação
            </label>
            <select
              id="notificationTypeSelect"
              className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 transition-all cursor-pointer"
              value={selectedValue}
              onChange={(e) => onFilterChange(e.target.value)}
            >
              <option value="all">Todos os Tipos</option>
              <option value="mudanca">Mudança de Paradas</option>
              <option value="itinerario">Itinerário</option>
              <option value="aviso">Aviso</option>
              <option value="educativa">Campanha Educativa</option>
            </select>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button 
            className="flex-1 px-4 py-2.5 rounded-lg font-bold transition-all bg-brand-green text-white hover:bg-brand-dark-green shadow-sm active:scale-95"
            onClick={onApplyFilter}
          >
            Aplicar Filtro
          </button>
          <button 
            className="flex-1 px-4 py-2.5 rounded-lg font-bold transition-all bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-sm active:scale-95"
            onClick={onClearFilter}
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterCard;
