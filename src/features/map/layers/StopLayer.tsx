// src/layers/StopLayer.tsx

import { useState } from "react";
import { Circle, Marker, Popup, useMapEvents } from "react-leaflet";
import { fetchStops } from "../../../services/mapService";
import { busStopIcon } from "../../../utils/mapUtils";
import { type Stop } from "../../../types/map";

export default function StopLayer() {
    const [circleCenter, setCircleCenter] = useState<[number, number] | null>(null);
    const [stops, setStops] = useState<Stop[]>([]);

    useMapEvents({
        click: async (e) => {
            const lat = e.latlng.lat;
            const lon = e.latlng.lng;

            // setCircleCenter espera uma tupla [number, number] ou null
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
                        <strong>Nome:</strong> {stop.stopName} <br />
                    </Popup>
                </Marker>
            ))}
        </>
    );
}