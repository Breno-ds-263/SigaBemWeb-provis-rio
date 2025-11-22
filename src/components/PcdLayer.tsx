// src/layers/PcdLayer.tsx

import React, { useState, useEffect } from "react";
import { Circle, Popup } from "react-leaflet";
import {
    type Pcd,
    type DadosFiltro,
    fetchPcds,
    disabilityColors
} from "../Hooks/MapTypes";

interface PcdLayerProps {
    dadosFiltro: DadosFiltro;
}

export default function PcdLayer({ dadosFiltro }: PcdLayerProps) {
    const [pcds, setPcds] = useState<Pcd[]>([]);

    useEffect(() => {
        async function loadPcds() {
            const data = await fetchPcds(dadosFiltro);
            setPcds(data);
        }
        loadPcds();
    }, [dadosFiltro]);

    return (
        <>
            {pcds.map((pcd) => {
                const color = disabilityColors[pcd.disability_type] || disabilityColors.DEFAULT;

                return (
                    <Circle
                        key={pcd.pcd_id}
                        center={[pcd.residence.latitude, pcd.residence.longitude]}
                        radius={10}
                        pathOptions={{
                            fillColor: color,
                            color: '#000',
                            weight: 2,
                            opacity: 1,
                            fillOpacity: 1
                        }}
                    >
                        <Popup>
                            <strong>PCD Id:</strong> {pcd.pcd_id} <br />
                            <strong>Gênero:</strong> {pcd.gender} <br />
                            <strong>Idade:</strong> {pcd.age} <br />
                            <strong>Deficiência:</strong> {pcd.disability_type} <br />
                            <strong>Licença:</strong> {pcd.license_type} <br />
                        </Popup>
                    </Circle>
                );
            })}
        </>
    );
}