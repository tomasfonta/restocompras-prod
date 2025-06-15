
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";

interface GoogleMapSelectorProps {
  onAddressSelect: (address: string) => void;
  defaultAddress?: string;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const GoogleMapSelector: React.FC<GoogleMapSelectorProps> = ({ onAddressSelect, defaultAddress = '' }) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(defaultAddress);
  const [searchQuery, setSearchQuery] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markerRef = useRef<any>(null);

  const loadGoogleMapsScript = useCallback((key: string) => {
    if (window.google) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    
    window.initMap = () => {
      setIsMapLoaded(true);
      initializeMap();
    };

    document.head.appendChild(script);
  }, []);

  const initializeMap = useCallback(() => {
    if (!mapRef.current || !window.google) return;

    const defaultLocation = { lat: -34.6037, lng: -58.3816 }; // Buenos Aires
    
    mapInstance.current = new window.google.maps.Map(mapRef.current, {
      zoom: 13,
      center: defaultLocation,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    // Add click listener to map
    mapInstance.current.addListener('click', (event: any) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      updateMarkerAndAddress(lat, lng);
    });

    // Initialize geocoder
    const geocoder = new window.google.maps.Geocoder();

    // If there's a default address, try to geocode it
    if (defaultAddress) {
      geocodeAddress(defaultAddress, geocoder);
    }
  }, [defaultAddress]);

  const geocodeAddress = (address: string, geocoder: any) => {
    geocoder.geocode({ address }, (results: any[], status: string) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        mapInstance.current?.setCenter(location);
        updateMarker(location.lat(), location.lng());
      }
    });
  };

  const updateMarkerAndAddress = (lat: number, lng: number) => {
    updateMarker(lat, lng);
    
    // Reverse geocode to get address
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results: any[], status: string) => {
      if (status === 'OK' && results[0]) {
        const address = results[0].formatted_address;
        setSelectedAddress(address);
        onAddressSelect(address);
      }
    });
  };

  const updateMarker = (lat: number, lng: number) => {
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    markerRef.current = new window.google.maps.Marker({
      position: { lat, lng },
      map: mapInstance.current,
      title: 'Ubicación seleccionada',
    });
  };

  const handleSearch = () => {
    if (!searchQuery || !window.google) return;

    const geocoder = new window.google.maps.Geocoder();
    geocodeAddress(searchQuery, geocoder);
  };

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      setShowApiKeyInput(false);
      loadGoogleMapsScript(apiKey);
    }
  };

  if (showApiKeyInput) {
    return (
      <div className="space-y-4 p-4 border rounded-lg bg-blue-50">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-blue-800">Configurar Google Maps</h3>
        </div>
        <p className="text-sm text-blue-700">
          Para usar el selector de direcciones, necesitas una clave de API de Google Maps.
          Puedes obtenerla en{' '}
          <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" className="underline">
            Google Cloud Console
          </a>
        </p>
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Ingresa tu Google Maps API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleApiKeySubmit}>
            Cargar Mapa
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Buscar dirección..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1"
        />
        <Button onClick={handleSearch} size="sm">
          <Search className="w-4 h-4" />
        </Button>
      </div>
      
      <div 
        ref={mapRef} 
        className="w-full h-64 border rounded-lg bg-gray-100"
        style={{ minHeight: '256px' }}
      />
      
      {selectedAddress && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Dirección seleccionada:</span>
          </div>
          <p className="text-sm text-green-700 mt-1">{selectedAddress}</p>
        </div>
      )}
    </div>
  );
};

export default GoogleMapSelector;
