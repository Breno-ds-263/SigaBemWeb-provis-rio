import { useLocation } from "react-router-dom"
import AppRoutes from "../routes/Routes"
import Footer from "./Footer"
import Header from "./Header"

export default function Layout() {
  const { pathname } = useLocation();
  const isLoginScreen = pathname === "/Login";
  const isHomePage = pathname === "/Home";

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {!isLoginScreen && <Header />}
      
      <main className="flex-1 overflow-y-auto">
        <AppRoutes />
      </main>

      {!isLoginScreen && !isHomePage && <Footer />}
    </div>
  )
}
