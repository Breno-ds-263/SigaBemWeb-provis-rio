import type React from "react";

type AgeRangeFieldProps = {
  minAge: number;
  setMinAge: React.Dispatch<React.SetStateAction<number>>;
  maxAge: number;
  setMaxAge: React.Dispatch<React.SetStateAction<number>>;
}

export default function AgeRangeField({ minAge, setMinAge, maxAge, setMaxAge }: AgeRangeFieldProps) {
 return (
  <div className="flex flex-col items-center justify-around w-full gap-2">
    <div className="flex items-center justify-center gap-2">
      <label htmlFor="Min" className="font-semibold">Mínima:</label>
      <input
        id="Min"
        type="number"
        min={0} max={100}
        value={minAge}
        onChange={(e) => setMinAge(Number(e.target.value))}
        className="border-2 border-black w-full pl-2 rounded-lg"
      />
    </div>
    <div className="flex items-center justify-center gap-2">
      <label htmlFor="Max" className="font-semibold">Máxima:</label>
      <input
        id="Max"
        type="number"
        min={0} max={100}
        value={maxAge}
        onChange={(e) => setMaxAge(Number(e.target.value))}
        className="border-2 border-black w-full pl-2 rounded-lg"
      />
    </div>
  </div>
 );
}