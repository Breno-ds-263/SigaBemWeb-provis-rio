export default function LoginForm() {



  return (
    <form className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md">
      <input type="text" 
      placeholder="Usuário" 
      className="border p-2 rounded" />
      <input type="password" 
      placeholder="Senha" 
      className="border p-2 rounded" />
      <button className="bg-green-500 text-white p-2 rounded" >Entrar</button>
    </form>
  );
}