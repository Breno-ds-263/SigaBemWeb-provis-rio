import { API_URL } from "../constants/map";
import type { Stop, Pcd, DadosFiltro } from "../types/map";

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
