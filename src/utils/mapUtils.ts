import L from "leaflet";
import imageBus from "../assets/busStop.png"; 

export const busStopIcon = new L.Icon({
    iconUrl: imageBus,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -25],
});
