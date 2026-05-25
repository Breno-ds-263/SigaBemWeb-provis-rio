import type React from "react";
import type { Gender } from "../../../../../types/common";

type GenderFieldProps = {
  setGender: React.Dispatch<React.SetStateAction<Gender>>;
}

const Gender = [
  { label: "Masculino", value: "M" },
  { label: "Feminino", value: "F" },
];

export default function GenderField({ setGender }: GenderFieldProps) {
 return (
  <div className="flex w-full items-center justify-around">
    <div className="flex flex-col items-center justify-around w-full">
      {Gender.map(({ label, value }) => (
        <div className="flex items-center justify-center gap-2">
          <label htmlFor={label} className="font-semibold">
            {label}:
          </label>
          <input
            id={label}
            key={value}
            type="radio"
            name="gender"
            value={value}
            aria-label={label}
            onChange={(e) => setGender(e.target.value as Gender)}
          />
        </div>
      ))}
    </div>
  </div>
 );
}