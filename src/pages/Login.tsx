import LoginForm from "../components/LoginForm";
import logo from "../assets/sigabem.jpg"

export default function Login() {
    return(
        <div className="flex w-full h-full">
            <main className="flex flex-col w-full justify-center items-center ">
                <div className="">
                    <img src={logo} alt="" className="size-24" />
                </div>
                <LoginForm></LoginForm>
            </main>

        </div>
    )
    
}