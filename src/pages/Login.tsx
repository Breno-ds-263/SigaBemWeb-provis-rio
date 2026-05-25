import LoginForm from "../features/auth/components/LoginForm";
import logo from "../assets/sigabem.jpg"

export default function Login() {
    return(
    <div className="flex w-dvw h-dvh">
      <main className="flex flex-col w-full justify-center items-center ">
          <div>
              <img src={logo} alt="" className="w-24 h-24 object-contain" />
          </div>
          <LoginForm />
      </main>
    </div>
    )
    
}