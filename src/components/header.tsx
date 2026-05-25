import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/Login");
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Home", path: "/Home" },
    { name: "Dashboard", path: "/Dashboard" },
    { name: "Linhas", path: "/Lines" },
    { name: "Notificações", path: "/Notifications" },
    { name: "Administração", path: "#" },
  ];

  return (
    <header className="w-full bg-brand-green border-b border-green-700 shadow-md relative z-[1001]">
      <div className="mx-auto px-5 py-3 flex justify-between items-center">
        <Link to="/Home" className="text-[24px] text-white font-bold no-underline">
          SigaBem
        </Link>

        {/* Hamburger Menu Icon (Visible on md and below) */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-around w-6 h-6 bg-transparent border-none cursor-pointer p-0 z-50"
          aria-label="Toggle Menu"
        >
          <span className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-[16px] text-white font-medium no-underline hover:text-green-100 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="text-[16px] cursor-pointer text-white font-medium no-underline hover:text-green-100 transition-colors"
          >
            Sair
          </button>
        </nav>
      </div>

      {/* Mobile/Tablet Navigation Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-brand-green border-t border-green-600 shadow-xl transition-all duration-300 ease-in-out transform ${
          isMenuOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"
        }`}
      >
        <nav className="flex flex-col p-5 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-[18px] text-white font-medium no-underline py-2 border-b border-green-600 last:border-0"
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
            className="text-[18px] text-left text-white font-medium no-underline py-2 cursor-pointer"
          >
            Sair
          </button>
        </nav>
      </div>
    </header>
  );
}
