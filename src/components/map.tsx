import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  Marker,
  LayersControl,
  LayerGroup,
  useMapEvents,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { LatLngExpression } from "leaflet";
import FiltersContainer from './FiltersContainer'; 
import imageBus from "../assets/busStop.png"; 


const MAP_CENTER: LatLngExpression = [-8.0476, -34.877];
const MAP_ZOOM = 13;
const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const API_URL = "https://labgeo3.recife.ifpe.edu.br/sigabem/api";

const busStopIcon = new L.Icon({
  iconUrl: imageBus,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -25],
});


interface Stop {
  stopId: string;
  stopName: string;
  stopLat: number;
  stopLon: number;
}

interface Pcd {
  pcd_id: string;
  age: number;
  gender: string;
  disability_type: string;
  license_type: string;
  residence: { latitude: number; longitude: number };
}

interface Dados {
  minAge: number;
  maxAge: number;
  gender: string;
  disability: string; 
  city: string;
  neighborhood: string;
}



async function fetchStops(stop_lat: number, stop_long: number): Promise<Stop[]> {
  try {
    const response = await fetch(
      `${API_URL}/stop/nearby?stop_lat=${stop_lat}&stop_long=${stop_long}`
    );
    const text = await response.text();
    const jsonData = JSON.parse(text);
    return Array.isArray(jsonData) ? jsonData : [];
  } catch (error) {
    console.error("Erro ao buscar paradas de ônibus:", error);
    return [];
  }
}

async function fetchPcds(dadosFiltro: Dados): Promise<Pcd[]> {
  const { minAge, maxAge, gender, disability, city, neighborhood: neigh } = dadosFiltro;
  try {
    const response = await fetch(
      `${API_URL}/pcd/search?minAge=${minAge}&maxAge=${maxAge}&gender=${gender}&disability=${disability}&city=${city}&neigh=${neigh}`
    );
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Erro ao buscar PCDs:", error);
    return [];
  }
}



function StopLayer() {
  const [circleCenter, setCircleCenter] = useState<LatLngExpression | null>(null);
  const [stops, setStops] = useState<Stop[]>([]);

  useMapEvents({
    click: async (e) => {
      const lat = e.latlng.lat;
      const lon = e.latlng.lng;

      setCircleCenter([lat, lon]);

      const data = await fetchStops(lat, lon);
      setStops(data);
    },
  });

  return (
    <>
      {circleCenter && (
        <Circle
          center={circleCenter}
          radius={300} // Raio de 300 metros
          pathOptions={{ color: "blue", fillOpacity: 0.2 }}
        />
      )}

      {stops.map((stop) => (
        <Marker
          key={stop.stopId}
          position={[stop.stopLat, stop.stopLon]}
          icon={busStopIcon}
        >
          <Popup>
            <strong>Parada Id:</strong> {stop.stopId} <br />
            <strong>Nome:</strong> {stop.stopName} <br />
          </Popup>
        </Marker>
      ))}
    </>
  );
}

const disabilityColors: { [key: string]: string } = {
    FISICA: '#FF9999',        
    VISUAL: '#9999FF',        
    AUDITIVA: '#99FF99',     
    INTELECTUAL: '#FFD580',  
    MULTIPLA: '#E599FF',    
    DEFAULT: '#D3D3D3'        
};

interface PcdLayerProps {
  dadosFiltro: Dados;
}


function PcdLayer({ dadosFiltro }: PcdLayerProps) {
  const [pcds, setPcds] = useState<Pcd[]>([]);

  useEffect(() => {
    async function loadPcds() {
      const data = await fetchPcds(dadosFiltro);
      setPcds(data);
    }
    loadPcds();
  }, [dadosFiltro]);

  return (
    <>
      {pcds.map((pcd) => {
        const color = disabilityColors[pcd.disability_type] || disabilityColors.DEFAULT;

        return (
          <Circle
            key={pcd.pcd_id}
            center={[pcd.residence.latitude, pcd.residence.longitude]}
            radius={10}
            pathOptions={{ 
                fillColor: color, 
                color: '#000',      
                weight: 2, 
                opacity: 1, 
                fillOpacity: 1 
            }}
          >
            <Popup>
              <strong>PCD Id:</strong> {pcd.pcd_id} <br />
              <strong>Gênero:</strong> {pcd.gender} <br />
              <strong>Idade:</strong> {pcd.age} <br />
              <strong>Deficiência:</strong> {pcd.disability_type} <br />
              <strong>Licença:</strong> {pcd.license_type} <br />
            </Popup>
          </Circle>
        );
      })}
    </>
  );
}


export default function Map() {
  const [dados, setDados] = useState<Dados>({
    minAge: 0,
    maxAge: 100,
    gender: "",
    disability: "",
    city: "",
    neighborhood: "",
  });

  const receberDados = (novosDados: Dados) => {
    setDados(novosDados);
  };
  
  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      
      <aside className=" md:w-[380px] shadow-md p-5 ">
        
        <FiltersContainer onSubmitDados={receberDados}/> 
      
      </aside>
      
      <div className="flex-1 h-full"> 
        <MapContainer
          center={MAP_CENTER}
          zoom={MAP_ZOOM}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
            url={TILE_URL}
            maxZoom={19}
          />

          <LayersControl position="topright">
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
          </LayersControl>
        </MapContainer>
      </div>
    </div>
  );
}