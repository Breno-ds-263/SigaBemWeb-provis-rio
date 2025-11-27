import BaseMap from "./BaseMap";
import FilterLine from "./FilterLine";


export default function MapHome() {
 

 
  
  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      
      <aside className=" md:w-[380px] shadow-md p-5 ">
        <FilterLine/>
      </aside>
      
      <div className="flex-1 h-full"> 
        <BaseMap>
          
        </BaseMap>
      </div>
    </div>
  );
}