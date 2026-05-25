import { LayerGroup, LayersControl } from "react-leaflet";

type LayerItemProps = {
  label: string;
  layer: React.ReactElement;
};

export default function LayerItem({ label, layer }: LayerItemProps) {
  return (
    <LayersControl.Overlay name={label} checked>
      <LayerGroup>
        { layer }
      </LayerGroup>
    </LayersControl.Overlay>
  );
}