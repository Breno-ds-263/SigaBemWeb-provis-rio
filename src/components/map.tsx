import React, { useState } from "react";
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


// ---------------------
// Configurações básicas
// ---------------------
const MAP_CENTER: LatLngExpression = [-8.0476, -34.877];
const MAP_ZOOM = 13;
const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const API_URL = "http://seu-backend-aqui.com"; // ⬅️ ajuste isso

// Ícone customizado de parada (opcional)
const busStopIcon = new L.Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/684/684908.png", // ícone exemplo
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -25],
});

// ---------------------
// Tipos de dados
// ---------------------
interface Stop {
  stopId: string;
  stopName: string;
  stopLat: number;
  stopLon: number;
}

// ---------------------
// Função para buscar paradas próximas
// ---------------------
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

// ---------------------
// Componente principal de interação com o mapa
// ---------------------
function ClickHandler() {
  const [circleCenter, setCircleCenter] = useState<LatLngExpression | null>(null);
  const [stops, setStops] = useState<Stop[]>([]);

  const map = useMapEvents({
    click: async (e) => {
      const lat = e.latlng.lat;
      const lon = e.latlng.lng;

      // Atualiza o círculo
      setCircleCenter([lat, lon]);

      // Busca as paradas próximas
      const data = await fetchStops(lat, lon);
      setStops(data);
    },
  });

  return (
    <>
      {circleCenter && (
        <Circle
          center={circleCenter}
          radius={300}
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
            <strong>Latitude:</strong> {stop.stopLat} <br />
            <strong>Longitude:</strong> {stop.stopLon}
          </Popup>
        </Marker>
      ))}
    </>
  );
}

// ---------------------
// Componente do Mapa
// ---------------------
export default function Map() {
  return (
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
            <ClickHandler />
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
}
