import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/Login");
  }

  return (
    <div className="w-full px-5 py-4 flex justify-between items-center bg-green-500 border border-green-700 shadow-md">
      <a href="#" className="text-[24px] text-white font-bold no-underline">
        SigaBem
      </a>
      <nav className="flex items-center">
        <a
          href="/Home"
          className="relative text-[16px] text-white font-medium no-underline"
        >
          Home
        </a>
        <a
          href="/Lines"
          className="relative text-[16px] text-white font-medium no-underline ml-5"
        >
          Linhas
        </a>
        <a
          href="#"
          className="relative text-[16px] text-white font-medium no-underline ml-5"
        >
          Notificações
        </a>
        <a
          href="#"
          className="relative text-[16px] text-white font-medium no-underline ml-5"
        >
          administração
        </a>
        <button
          onClick={handleLogout}
          className="relative text-[16px] cursor-pointer text-white font-medium no-underline ml-5"
        >
          Sair
        </button>
      </nav>
    </div>
  );
}
