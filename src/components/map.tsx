import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Circle, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import type { LatLngExpression } from "leaflet";

const API_URL = "http://seu-backend-aqui.com";
const MAP_CENTER: LatLngExpression = [-8.0476, -34.877];
const MAP_ZOOM = 13;

const busStopIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -25],
});

const disabilityColors: Record<string, string> = {
  FISICA: "#FF9999",
  VISUAL: "#9999FF",
  AUDITIVA: "#99FF99",
  INTELECTUAL: "#FFD580",
  MULTIPLA: "#E599FF",
  DEFAULT: "#D3D3D3",
};

interface PeopleFilters {
  minAge: number;
  maxAge: number;
  gender: string;
  disability: string;
  city: string;
  neigh: string;
}

interface StopFilters {
  city: string;
  neigh: string;
}

interface MapProps {
  peopleFilters: PeopleFilters;
  stopFilters: StopFilters;
}

export default function Map({ peopleFilters, stopFilters }: MapProps) {
  const [pcds, setPcds] = useState<any[]>([]);
  const [stops, setStops] = useState<any[]>([]);
  const [circleCenter, setCircleCenter] = useState<LatLngExpression | null>(null);

  // Buscar PCDs quando filtros mudam
  useEffect(() => {
    async function fetchPcds() {
      try {
        const res = await fetch(
          `${API_URL}/pcd/search?minAge=${peopleFilters.minAge}&maxAge=${peopleFilters.maxAge}&gender=${peopleFilters.gender}&disability=${peopleFilters.disability}&city=${peopleFilters.city}&neigh=${peopleFilters.neigh}`
        );
        const data = await res.json();
        setPcds(data);
      } catch (err) {
        console.error("Erro ao buscar PCDs:", err);
      }
    }
    fetchPcds();
  }, [peopleFilters]);

  // Buscar paradas próximas
  useEffect(() => {
    if (!circleCenter) return;
    async function fetchStops() {
      try {
        const res = await fetch(
          `${API_URL}/stop/nearby?stop_lat=${(circleCenter as any)[0]}&stop_long=${(circleCenter as any)[1]}&city=${stopFilters.city}&neigh=${stopFilters.neigh}`
        );
        const data = await res.json();
        setStops(data);
      } catch (err) {
        console.error("Erro ao buscar paradas:", err);
      }
    }
    fetchStops();
  }, [circleCenter, stopFilters]);

  return (
    <MapContainer center={MAP_CENTER} zoom={MAP_ZOOM} scrollWheelZoom={true} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* PCDs */}
      {pcds.map((pcd) => (
        <Circle
          key={pcd.pcd_id}
          center={[pcd.residence.latitude, pcd.residence.longitude]}
          radius={8}
          pathOptions={{ color: disabilityColors[pcd.disability_type] || disabilityColors.DEFAULT, fillOpacity: 1 }}
        >
          <Popup>
            <div>
              <b>PCD Id:</b> {pcd.pcd_id}<br/>
              <b>Gênero:</b> {pcd.gender}<br/>
              <b>Idade:</b> {pcd.age}<br/>
              <b>Deficiência:</b> {pcd.disability_type}<br/>
            </div>
          </Popup>
        </Circle>
      ))}

      {/* Paradas */}
      {stops.map((stop) => (
        <Marker key={stop.stopId} position={[stop.stopLat, stop.stopLon]} icon={busStopIcon}>
          <Popup>
            <div>
              <b>Parada:</b> {stop.stopName}
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Clique no mapa para definir círculo */}
      <MapClickHandler setCircleCenter={setCircleCenter} />
    </MapContainer>
  );
}

// Componente para capturar clique no mapa
function MapClickHandler({ setCircleCenter }: { setCircleCenter: any }) {
  useMapEvents({
    click: (e) => {
      setCircleCenter([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}
