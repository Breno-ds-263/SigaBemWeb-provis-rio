// src/components/BaseMap.tsx
import { type ReactNode } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MAP_CENTER, MAP_ZOOM, TILE_URL } from "../../../constants/map";

interface BaseMapProps {
  children?: ReactNode; // Para injetar camadas ou controles
  center?: [number, number]; // Torne o centro opcional/customizável
  zoom?: number; // Torne o zoom opcional/customizável
}

export default function BaseMap({ 
    children, 
    center = MAP_CENTER, 
    zoom = MAP_ZOOM 
}: BaseMapProps) {
  return (
    <MapContainer
      center={center as [number, number]}
      zoom={zoom}
      scrollWheelZoom={true}
      className="h-full w-full" // Use Tailwind, mas garanta que o pai tem altura definida
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url={TILE_URL}
        maxZoom={19}
      />
      
      {/* O LayersControl pode ser fixo ou também passado como children/prop, 
          mas vamos mantê-lo aqui por ser padrão. */}
      <LayersControl position="topright">
        {children}
      </LayersControl>
    </MapContainer>
  );
}