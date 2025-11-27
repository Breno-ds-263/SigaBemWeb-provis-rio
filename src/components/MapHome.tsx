// src/pages/AnaliseMap.tsx (Seu Mapa Original, agora como uma "Página")
import React, { useState } from "react";
import BaseMap from "./BaseMap";
import { LayerGroup, LayersControl } from "react-leaflet";
import FiltersContainer from './FiltersContainer'; 
import StopLayer from './StopLayer'; 
import PcdLayer from './PcdLayer'; 
import { type DadosFiltro } from "../constants/MapTypes";


export default function MapHome() {
  const [dados, setDados] = useState<DadosFiltro>({ 
    minAge: 0, 
    maxAge: 100,
    gender: "",
    disability: "",
    city: "",
    neighborhood: "",
  });

  const receberDados = (novosDados: DadosFiltro) => {
    setDados(novosDados);
  };
  
  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      
      <aside className=" md:w-[380px] shadow-md p-5 ">
        <FiltersContainer onSubmitDados={receberDados}/> 
      </aside>
      
      <div className="flex-1 h-full"> 
        <BaseMap>
          <LayersControl.Overlay name="Paradas" checked>
            <LayerGroup>
              <StopLayer />
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Pcds" checked>
            <LayerGroup>
              <PcdLayer dadosFiltro={dados} />
            </LayerGroup>
          </LayersControl.Overlay>
        </BaseMap>
      </div>
    </div>
  );
}