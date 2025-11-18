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

async function fetchStops(
  stop_lat: number,
  stop_long: number
): Promise<Stop[]> {
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

function ClickHandler() {
  const [circleCenter, setCircleCenter] = useState<LatLngExpression | null>(
    null
  );
  const [stops, setStops] = useState<Stop[]>([]);

  const map = useMapEvents({
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
        <LayersControl.Overlay name="Pcds" checked>
          <LayerGroup>
            <ClickHandler />
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
}
