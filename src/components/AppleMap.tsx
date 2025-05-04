/// <reference types="mapkit" />

import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    mapkit: any;
  }
}

const AppleMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.mapkit) {
      console.error('MapKit JS not loaded. Ensure <script src="https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js"> is included.');
      return;
    }

    window.mapkit.init({
      authorizationCallback: (done: (token: string) => void) => {
        done('eyJraWQiOiI1TFJEQkY4N1BMIiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJRM1dWVzgyUVA1IiwiaWF0IjoxNzQ1OTQ4MjQ2LCJvcmlnaW4iOiJlbG9xdWVudC1xdWVpamFkYXMtNTE5M2E1Lm5ldGxpZnkuYXBwIn0.wAGLef5gaYfKcLJLYOb5hFPoT8qiDhqhtfEYeKWZP3XPu1_0dLArO-gahQaqUrwL8_0bEJ1s0suf7GFbJ7tXdg');
      },
    });

    // Center the map and radar circle at the same coordinates
    const mapCenter = new window.mapkit.Coordinate(35.7865, -78.7811); // Downtown Cary Park
    const map = new window.mapkit.Map(mapRef.current, {
      center: mapCenter,
      cameraDistance: 100000, // Approx zoom level 10
      mapType: 'standard',
      colorScheme: 'light',
    });

    // Use the same coordinates for the radar circle
    const annotationCoords = mapCenter;

    // Create a custom pulsating radar circle using an Annotation at the center
    const pulsatingCircle = new window.mapkit.Annotation(
      annotationCoords,
      () => {
        const div = document.createElement('div');
        div.className = 'radar-circle';
        return div;
      },
      {
        anchorOffset: new DOMPoint(0, -20), // Adjust for the size of the radar circle (40px x 40px)
      }
    );

    // Add the annotation to the map
    map.addAnnotation(pulsatingCircle);

    // Add CSS for the pulsating effect
    const style = document.createElement('style');
    style.textContent = `
      .radar-circle {
        width: 40px;
        height: 40px;
        background: radial-gradient(circle, #A855F7, #4F46E5);
        border-radius: 50%;
        position: absolute;
        animation: pulse 2s infinite ease-in-out;
        box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
      }

      @keyframes pulse {
        0% {
          transform: scale(1);
          opacity: 0.7;
        }
        50% {
          transform: scale(1.5);
          opacity: 0.3;
        }
        100% {
          transform: scale(1);
          opacity: 0.7;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      map.removeAnnotation(pulsatingCircle);
      document.head.removeChild(style);
      if (map) map.destroy();
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '100%',
        border: 0,
      }}
    />
  );
};

export default AppleMap;

export {};