// src/types/MapTypes.ts

import L from "leaflet";
import imageBus from "../assets/busStop.png"; 

// --- Constantes ---
export const API_URL = "https://labgeo3.recife.ifpe.edu.br/sigabem/api";

export const busStopIcon = new L.Icon({
    iconUrl: imageBus,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -25],
});

export const disabilityColors: { [key: string]: string } = {
    FISICA: '#FF9999',
    VISUAL: '#9999FF',
    AUDITIVA: '#99FF99',
    INTELECTUAL: '#FFD580',
    MULTIPLA: '#E599FF',
    DEFAULT: '#D3D3D3'
};

// --- Interfaces ---
export interface Stop {
    stopId: string;
    stopName: string;
    stopLat: number;
    stopLon: number;
}

export interface Pcd {
    pcd_id: string;
    age: number;
    gender: string;
    disability_type: string;
    license_type: string;
    residence: { latitude: number; longitude: number };
}

export interface DadosFiltro {
    minAge: number;
    maxAge: number;
    gender: string;
    disability: string; 
    city: string;
    neighborhood: string;
}

// --- Funções de Fetch ---

export async function fetchStops(stop_lat: number, stop_long: number): Promise<Stop[]> {
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

export async function fetchPcds(dadosFiltro: DadosFiltro): Promise<Pcd[]> {
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