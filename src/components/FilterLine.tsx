


export default function FilterLine() {
 return (
   <div className="flex flex-col items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
    <form className="flex flex-col items-center w-full overflow-auto">
      <fieldset className="flex flex-col items-center border-2 border-black rounded-lg w-full max-w-[250px] p-3 mb-3">
            <legend className="font-semibold">Linha do Ônibus</legend>
            <div className="flex justify-center flex-col gap-3 mb-2">
              <legend className="font-semibold">Secelecione uma linha</legend>
              <select className="w-full border border-gray-300 rounded px-2 py-1" ></select>
              
            </div>
          </fieldset>


    </form>
   </div>
 );
}