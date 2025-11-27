import React, { type ReactNode } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";


const MAP_CENTER: [number, number] = [-8.0476, -34.877];
const MAP_ZOOM = 13;
const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

interface BaseMapProps {
  children?: ReactNode; 
  center?: [number, number]; 
  zoom?: number; 
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
      className="h-full w-full" 
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