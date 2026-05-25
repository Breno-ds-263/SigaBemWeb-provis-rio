

type FilterButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function FilterButton({ isActive, onClick, label }: FilterButtonProps) {
 return (
 <button
    type="button"
    onClick={onClick}
    className={`flex-1 border border-green-800 rounded-lg text-sm p-5 transition-all duration-300 cursor-pointer ${
      isActive 
        ? "bg-brand-green text-white border-green-700 font-bold" 
        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
    }`}
  >
    {label}
  </button>
 );
}
