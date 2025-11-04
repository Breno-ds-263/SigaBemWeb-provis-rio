interface FieldProps {
  legends: string;
  label: string;
  types?: "number" | "text";
}

export default function FieldFilters({ legends, label, types }: FieldProps) {
  return (
    <fieldset className="flex flex-col items-center border-2 border-black rounded-lg w-full max-w-[250px] p-3 mb-3">
      <legend className="font-semibold">{legends}</legend>
      <div className="flex justify-center gap-3 mb-2">
        <label>{label}</label>
        <input
          type={types}
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
  );
}
