// src/components/BaseMap.tsx
import React, { type ReactNode } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Mantenha as constantes no componente base ou mova-as para um arquivo de constantes
const MAP_CENTER: [number, number] = [-8.0476, -34.877];
const MAP_ZOOM = 13;
const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

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