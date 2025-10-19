import React from 'react';
import { MapContainer, TileLayer, LayerGroup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Importa os estilos CSS do Leaflet

// Configurações do Mapa
const MAP_CENTER: [number, number] = [-8.0476, -34.8770]; // Centro do mapa (Recife)
const MAP_ZOOM: number = 10; // Nível de zoom inicial
const TILE_URL: string = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

/**
 * Componente do Mapa.
 * Inicializa o mapa Leaflet e o controle de camadas usando react-leaflet.
 */
function Map() {
  return (
    <MapContainer 
      center={MAP_CENTER} 
      zoom={MAP_ZOOM} 
      scrollWheelZoom={true}
      style={{ height: '100vh', width: '100%' }} // Estilização para o mapa
    >
      {/* Camada base padrão (Overlay) */}
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url={TILE_URL}
        maxZoom={19}
      />

      {/* Controle de Camadas (Equivalente ao L.control.layers) */}
      <LayersControl position="topright">
        
        {/* Camadas de Sobreposição (Overlays) */}
        
        {/* Grupo de Camadas: PCDs (Checked = Visível por padrão) */}
        <LayersControl.Overlay name="PCDs" checked>
          <LayerGroup>
            {/* Adicione seus elementos PCDs aqui (Marcadores, etc.) */}
          </LayerGroup>
        </LayersControl.Overlay>

        {/* Grupo de Camadas: Paradas */}
        <LayersControl.Overlay name="Paradas">
          <LayerGroup>
            {/* Adicione seus elementos de Paradas aqui */}
          </LayerGroup>
        </LayersControl.Overlay>
        
        {/* Grupo de Camadas: Bairros */}
        <LayersControl.Overlay name="Bairros">
          <LayerGroup>
            {/* Adicione seus elementos de Bairros aqui */}
          </LayerGroup>
        </LayersControl.Overlay>
        
        {/* Camada Base Explícita (BaseLayer) */}
        {/* Embora o TileLayer acima já funcione como base, é bom defini-lo aqui para o controle */}
        <LayersControl.BaseLayer name="Mapa Base" checked>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
            url={TILE_URL}
            maxZoom={19}
          />
        </LayersControl.BaseLayer>
        
      </LayersControl>
    </MapContainer>
  );
}

export default Map;