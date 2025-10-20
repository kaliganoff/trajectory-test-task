import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useAppSelector } from '../store/hooks';

const MapComponent: React.FC = () => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const { vehicles } = useAppSelector((state) => state.vehicles);

    useEffect(() => {
        if (!mapContainer.current) return;

        const map = new maplibregl.Map({
            container: mapContainer.current,
            style: {
                version: 8,
                sources: {
                    'osm': {
                        type: 'raster',
                        tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                        tileSize: 256,
                        attribution: '© OpenStreetMap contributors'
                    }
                },
                layers: [{
                    id: 'osm',
                    type: 'raster',
                    source: 'osm'
                }]
            },
            center: [30.3141, 59.9386],
            zoom: 10
        });

        map.on('load', () => {
            vehicles.forEach(vehicle => {
                if (vehicle.latitude && vehicle.longitude) {
                    new maplibregl.Marker()
                        .setLngLat([vehicle.longitude, vehicle.latitude])
                        .setPopup(new maplibregl.Popup().setText(vehicle.name))
                        .addTo(map);
                }
            });
        });

        return () => map.remove();
    }, [vehicles]);

    return <div ref={mapContainer} style={{ width: '500px', height: '500px' }} />;
};

export default MapComponent;
