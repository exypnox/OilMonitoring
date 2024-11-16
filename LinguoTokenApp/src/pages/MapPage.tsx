import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import oilSpillIcon from "../assets/oil-spill.png"; // Local image

const MapPage: React.FC = () => {
  const caspianSeaCenter: [number, number] = [41.9861, 50.7391]; // Center of Caspian Sea

  // Oil company locations (spread across the Caspian Sea)
  const oilCompanyLocations: [number, number, string][] = [
    [42.0, 51.0, "Oil-Компания 1"], // North-west
    [46.0, 51.5, "Oil-Компания 2"], // North
    [44.5, 50.3, "Oil-Компания 3"], // West
    [41.0, 51.0, "Oil-Компания 4"], // South-west
    [38.9, 52.0, "Oil-Компания 5"], // North-east
    [44.2, 48.7, "Oil-Компания 6"], // West
    [41.7, 50.6, "Oil-Компания 7"], // South-east
    [45.3, 48.2, "Oil-Компания 8"], // North-east
    [41.8, 50.2, "Oil-Компания 9"], // South-west
    [42.6, 50.0, "Oil-Компания 10"], // North
    [46.4, 50.5, "Oil-Компания 11"], // South-central
  ];

  // Define the custom icon
  const customIcon = L.icon({
    iconUrl: oilSpillIcon,
    iconSize: [40, 40], // Adjust icon size
    iconAnchor: [20, 40], // Anchor point (center-bottom)
  });

  const [reportModalOpen, setReportModalOpen] = useState(false);

  const handleReportClick = () => {
    setReportModalOpen(true);
  };

  return (
    <div>
      <MapContainer
        center={caspianSeaCenter}
        zoom={6}
        style={{ height: "100vh", width: "100%" }}
      >
        {/* Modern Map Styling (CartoDB Positron) */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CartoDB</a>'
        />

        {/* Oil company markers */}
        {oilCompanyLocations.map(([lat, lng, company], index) => (
          <Marker position={[lat, lng]} icon={customIcon} key={index}>
            <Popup>
              <strong>{company}</strong>
              <br />
              Координаты: {lat.toFixed(4)}, {lng.toFixed(4)}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Reporting button */}
      <div className="report-button-container">
        <button onClick={handleReportClick}>Сообщить о разливе нефти</button>
      </div>

      {/* Reporting modal or form */}
      {reportModalOpen && (
        <div className="report-modal">
          <h2>Сообщить о разливе нефти</h2>
          <form>
            <textarea
              placeholder="Подробности о разливе нефти"
              rows={4}
            ></textarea>
            <br />
            <button type="submit">Отправить</button>
            <button type="button" onClick={() => setReportModalOpen(false)}>
              Закрыть
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MapPage;
