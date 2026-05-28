"use client";

import { MapContainer, TileLayer, Circle, Polygon, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { DEMO_CENTER, DEMO_RADIUS_KM, DEMO_ZONES } from "@/lib/demoGeo";

export default function ZoneMap({
  showZones = true,
  highlightZoneId = null,
  heightClass = "h-[360px]",
}: {
  showZones?: boolean;
  highlightZoneId?: string | null;
  heightClass?: string;
}) {
  return (
    <div className={`${heightClass} w-full`} style={{ background: "#0b0e18" }}>
      <MapContainer
        center={DEMO_CENTER}
        zoom={14}
        scrollWheelZoom={false}
        className="h-full w-full"
        style={{ background: "#0b0e18" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
        />

        {/* 2 km alert radius */}
        <Circle
          center={DEMO_CENTER}
          radius={DEMO_RADIUS_KM * 1000}
          pathOptions={{ color: "#f04438", fillColor: "#f04438", fillOpacity: 0.05, weight: 2 }}
        />

        {/* Search zones */}
        {showZones &&
          DEMO_ZONES.map((z) => {
            const active = highlightZoneId === z.id;
            return (
              <Polygon
                key={z.id}
                positions={z.polygon}
                pathOptions={{
                  color: z.color,
                  fillColor: z.color,
                  fillOpacity: active ? 0.5 : 0.18,
                  weight: active ? 3 : 1.5,
                }}
              >
                <Tooltip>{`Zone ${z.id} — ${z.label}`}</Tooltip>
              </Polygon>
            );
          })}

        {/* Last-seen marker (vector — avoids broken default icon images) */}
        <CircleMarker
          center={DEMO_CENTER}
          radius={7}
          pathOptions={{ color: "#ffffff", fillColor: "#f04438", fillOpacity: 1, weight: 2 }}
        >
          <Tooltip permanent direction="top" offset={[0, -8]}>
            Last seen
          </Tooltip>
        </CircleMarker>
      </MapContainer>
    </div>
  );
}
