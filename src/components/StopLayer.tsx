import React, { useState } from "react";
import { Circle, Marker, Popup, useMapEvents } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import {
    type Stop,
    fetchStops,
    busStopIcon
} from "../constants/MapTypes"; 

export default function StopLayer() {
    const [circleCenter, setCircleCenter] = useState<[number, number] | null>(null);
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
                    </Popup>
                </Marker>
            ))}
        </>
    );
}