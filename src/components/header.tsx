



export default function Header(){

  return(
    <div className="w-full px-5 py-4 flex justify-between items-center bg-green-500 border border-green-700 shadow-md">
    <a href="#" className="text-[24px] text-white font-bold no-underline">SigaBem</a>
        <nav className="flex items-center">
      <a href="#" className="relative text-[16px] text-white font-medium no-underline">Home</a>
      <a href="#" className="relative text-[16px] text-white font-medium no-underline ml-5">Sobre</a>
      <a href="#" className="relative text-[16px] text-white font-medium no-underline ml-5">Serviços</a>
      <a href="#" className="relative text-[16px] text-white font-medium no-underline ml-5">Contato</a>
    </nav>
        </div>
  )

}