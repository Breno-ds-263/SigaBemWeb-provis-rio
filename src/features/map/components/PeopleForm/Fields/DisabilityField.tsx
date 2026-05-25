import type { DisabilityType } from "../../../../../types/common";

type DisabilityFieldProps = {
  disability: DisabilityType;
  setDisability: React.Dispatch<React.SetStateAction<DisabilityType>>;
}

const DISABILITY_OPTIONS: { label: string; value: DisabilityType }[] = [
  { label: "Física", value: "FISICA" },
  { label: "Visual", value: "VISUAL" },
  { label: "Auditiva", value: "AUDITIVA" },
  { label: "Intelectual", value: "INTELECTUAL" },
  { label: "Múltipla", value: "MULTIPLA" },
];

export default function DisabilityField({ disability, setDisability }: DisabilityFieldProps) {
  return (
    <select
      value={disability}
      onChange={(e) => setDisability(e.target.value as DisabilityType)}
      className="w-full h-full text-center text-lg"
    >
      {DISABILITY_OPTIONS.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}