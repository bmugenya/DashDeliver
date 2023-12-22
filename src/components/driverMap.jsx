import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { url } from "../utils/url";

function Map({ senderCoordinates, receiverLocation, height }) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const geocodeLocation = async () => {
      try {
        const response = await fetch(`${url}/driver/geocode`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({  receiverLocation }),
        });

        const { receiverCoordinates } = await response.json();
        console.log(senderCoordinates,receiverCoordinates)

      const midpoint = [
          (senderCoordinates[0] + receiverCoordinates[0]) / 2,
          (senderCoordinates[1] + receiverCoordinates[1]) / 2,
        ];
        // Initialize the map
        mapboxgl.accessToken = 'pk.eyJ1IjoibXVnZW4yNDciLCJhIjoiY2t6YXc1d3ZtMWp5cDJvczhtaHNzNng5ZiJ9.ChuFB5ls73656qlh1alvwA';
        const initializedMap = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: midpoint, // Centered on Kenya
          zoom:10,
        });

        // Add markers for sender and receiver
        new mapboxgl.Marker({ color: 'blue' })
          .setLngLat(senderCoordinates)
          .addTo(initializedMap);

        new mapboxgl.Marker({ color: 'red' })
          .setLngLat(receiverCoordinates)
          .addTo(initializedMap);

        setMap(initializedMap);

        return () => {
          initializedMap.remove(); // Cleanup when component unmounts
        };
      } catch (error) {
        console.error('Error geocoding location:', error);
      }
    };

    geocodeLocation();
  }, [senderCoordinates, receiverLocation]);

  return <div id="map" style={{ height: `${height}vh` }} />;
}

export default Map;
