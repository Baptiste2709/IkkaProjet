import React, { useState, useEffect, useRef } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";
import './SensorGeoDistributionWidget.css';

// Source GeoJSON fiable
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Données fictives représentant les capteurs par pays
const sensorDistributionData = [
  { country: "China", count: 15, coordinates: [104.195397, 35.86166] },
  { country: "Greece", count: 7, coordinates: [21.824312, 39.074208] },
  { country: "Japan", count: 5, coordinates: [138.252924, 36.204824] },
  { country: "Morocco", count: 3, coordinates: [-7.09262, 31.791702] },
  { country: "Thailand", count: 8, coordinates: [100.992541, 15.870032] },
  { country: "Mexico", count: 11, coordinates: [-102.552784, 23.634501] },
  { country: "Italy", count: 9, coordinates: [12.56738, 41.87194] },
  { country: "Russia", count: 6, coordinates: [105.318756, 61.52401] },
  { country: "Peru", count: 4, coordinates: [-75.015152, -9.189967] },
  { country: "Ethiopia", count: 3, coordinates: [40.489673, 9.145] },
  { country: "Czech Republic", count: 2, coordinates: [15.472962, 49.817492] },
  { country: "Poland", count: 6, coordinates: [19.145136, 51.919438] },
  { country: "Malaysia", count: 4, coordinates: [101.975766, 4.210484] },
  { country: "Philippines", count: 8, coordinates: [121.774017, 12.879721] },
  { country: "Ecuador", count: 5, coordinates: [-78.183406, -1.831239] },
  { country: "Slovenia", count: 2, coordinates: [14.995463, 46.151241] },
  { country: "Albania", count: 3, coordinates: [20.168331, 41.153332] },
  { country: "France", count: 20, coordinates: [2.333333, 48.866667] }
];

const SensorGeoDistributionWidget = () => {
  const [loading, setLoading] = useState(true);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState([0, 0]);
  const mapContainerRef = useRef(null);
  
  useEffect(() => {
    // Simuler un temps de chargement pour montrer le skeleton loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Calculer la taille des marqueurs en fonction du nombre de capteurs et du zoom
  const getMarkerSize = (count) => {
    // Réduire la taille des marqueurs en fonction du zoom pour éviter qu'ils ne deviennent trop grands
    const zoomFactor = Math.max(0.5, 1 / Math.sqrt(zoom));
    return Math.max(4, Math.min(18, (6 + count * 0.7) * zoomFactor));
  };

  // Gérer le positionnement du tooltip par rapport au conteneur de la carte
  const handleMarkerMouseEnter = (country, count, coordinates, event) => {
    if (mapContainerRef.current) {
      const mapRect = mapContainerRef.current.getBoundingClientRect();
      const x = event.clientX - mapRect.left;
      const y = event.clientY - mapRect.top;
      
      setHoveredCountry({ country, count, coordinates });
      setTooltipPosition({ x, y });
    }
  };

  // Limiter le niveau de zoom pour éviter les problèmes de débordement
  const handleZoomEnd = (position) => {
    setZoom(position.zoom);
    setCenter(position.coordinates);
    
    // Fermer le tooltip lors du zoom/déplacement pour éviter les problèmes de position
    setHoveredCountry(null);
  };

  return (
    <div className="geo-distribution-card">
      <div className="card-header">
        <h2 className="card-title">
          Distribution Géographique des Capteurs
        </h2>
      </div>
      <div className="card-content">
        {loading ? (
          <div className="skeleton-container">
            <div className="skeleton skeleton-full" />
            <div className="skeleton skeleton-medium" />
            <div className="skeleton skeleton-small" />
          </div>
        ) : (
          <div className="map-container" ref={mapContainerRef}>
            <ComposableMap
              projectionConfig={{
                scale: 140,
                rotation: [-11, 0, 0],
              }}
            >
              <ZoomableGroup 
                center={center} 
                zoom={zoom}
                minZoom={1}
                maxZoom={5}  // Limiter le zoom pour éviter les débordements
                onMoveEnd={handleZoomEnd}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#EAEAEC"
                        stroke="#D6D6DA"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { fill: "#F5F5F5", outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>
                
                {sensorDistributionData.map(({ country, count, coordinates }) => (
                  <Marker 
                    key={country} 
                    coordinates={coordinates}
                    onMouseEnter={(event) => handleMarkerMouseEnter(country, count, coordinates, event)}
                    onMouseLeave={() => setHoveredCountry(null)}
                  >
                    <circle
                      r={getMarkerSize(count)}
                      fill="#4338CA"
                      fillOpacity={0.7}
                      stroke="#FFFFFF"
                      strokeWidth={1 / Math.sqrt(zoom)} // Réduire l'épaisseur de la bordure en fonction du zoom
                      className="marker-dot"
                    />
                  </Marker>
                ))}
              </ZoomableGroup>
            </ComposableMap>

            {hoveredCountry && (
              <div 
                className="country-tooltip"
                style={{ 
                  left: `${tooltipPosition.x + 10}px`,
                  top: `${tooltipPosition.y - 20}px`
                }}
              >
                <p className="tooltip-title">{hoveredCountry.country}</p>
                <p className="tooltip-content">{hoveredCountry.count} capteurs</p>
              </div>
            )}

            <div className="map-legend">
              <div className="legend-item">
                <span className="legend-marker"></span>
                <span>Nombre de capteurs</span>
              </div>
              <div>
                <span className="legend-total">Total: </span>
                {sensorDistributionData.reduce((sum, item) => sum + item.count, 0)} capteurs
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SensorGeoDistributionWidget;