import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import { url } from '../utils/url';

function Map({ senderCoordinates, receiverCoordinates, height }) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const loadMap = async () => {
      console.log(senderCoordinates);
      try {
        // Check if coordinates are valid
        if (!senderCoordinates || !receiverCoordinates) {
          console.error('Invalid coordinates provided');
          return;
        }

        const midpoint = [
          (senderCoordinates[0] + receiverCoordinates[0]) / 2,
          (senderCoordinates[1] + receiverCoordinates[1]) / 2,
        ];

        // Initialize the map
        mapboxgl.accessToken = 'pk.eyJ1IjoibXVnZW4yNDciLCJhIjoiY2t6YXc1d3ZtMWp5cDJvczhtaHNzNng5ZiJ9.ChuFB5ls73656qlh1alvwA';
        const initializedMap = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: midpoint, // Centered on the midpoint
          zoom: 10,
        });

        // Add markers for sender and receiver
        new mapboxgl.Marker({ color: 'blue' })
          .setLngLat(senderCoordinates)
          .addTo(initializedMap);

        new mapboxgl.Marker({ color: 'red' })
          .setLngLat(receiverCoordinates)
          .addTo(initializedMap);

        // Add directions control to the map
        const directions = new MapboxDirections({
          accessToken: mapboxgl.accessToken,
          unit: 'metric',
          profile: 'mapbox/driving-traffic',
        });

        initializedMap.addControl(directions, 'top-left');

        // Set the waypoints for the directions
        directions.setOrigin(senderCoordinates);
        directions.setDestination(receiverCoordinates);

        setMap(initializedMap);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    loadMap();

    return () => {
      if (map) {
        map.remove(); // Cleanup when component unmounts
      }
    };
  }, [senderCoordinates, receiverCoordinates]);

  return <div id="map" style={{ height: `${height}vh` }} />;
}

export default Map;
