import "./style.css";

export const Button = ({ label, onClick, type = "primary" }: { label: string; onClick: () => void; type?: "primary" | "secondary" }) => {
  return (
    <button className={`btn ${type}`} onClick={onClick}>{label}</button>
  );
}

export default Button;