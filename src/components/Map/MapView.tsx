import { useEffect, useState, memo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import type { Location, Report } from '../../types';
import { getCategoryIcon } from '../../utils/categoryIcons';

// Fix for default markers in React Leaflet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapViewProps {
  reports: Report[];
  onMapClick?: (location: Location) => void;
  onReportClick?: (report: Report) => void;
  selectedReport?: Report | null;
}

// Component to handle map clicks
function MapClickHandler({ onMapClick }: { onMapClick?: (location: Location) => void }) {
  useMapEvents({
    click: (e) => {
      if (onMapClick) {
        onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    },
  });
  return null;
}

const MapViewComponent = ({ reports, onMapClick, onReportClick }: MapViewProps) => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [mapCenter, setMapCenter] = useState<Location>({ lat: 52.5200, lng: 13.4050 }); // Default to Berlin

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          setMapCenter(location);
        },
        (error) => {
          console.warn('Geolocation error:', error);
          // Keep default Berlin location on error
        },
        {
          enableHighAccuracy: false,
          timeout: 10000, // 10 seconds timeout
          maximumAge: 300000, // Accept cached position up to 5 minutes old
        }
      );
    }
  }, []);


  return (
    <MapContainer
      center={[mapCenter.lat, mapCenter.lng]}
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
    >
      <MapClickHandler onMapClick={onMapClick} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* User location marker */}
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]}>
          <Popup>Your current location</Popup>
        </Marker>
      )}

      {/* Report markers */}
      {reports.map((report) => (
        <Marker
          key={report.id}
          position={[report.location.lat, report.location.lng]}
          icon={getCategoryIcon(report.category)}
        >
          <Popup>
            <div className="p-2 min-w-[200px]">
              <h3 className="font-semibold text-sm mb-1">{report.title}</h3>
              <p className="text-xs text-gray-600 capitalize mb-1">
                {report.category.replace('_', ' ')}
              </p>
              <p className="text-xs text-gray-500 mb-2">{report.status}</p>
              {report.description && (
                <p className="text-xs text-gray-700 mb-2">{report.description}</p>
              )}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">
                  ↑ {report.votes.upvotes} ↓ {report.votes.downvotes}
                </span>
                <span className="text-xs text-gray-500">
                  {report.comments.length} comments
                </span>
              </div>
              <button
                onClick={() => onReportClick?.(report)}
                className="w-full px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
              >
                View Details
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

// Memoized export for performance
export const MapView = memo(MapViewComponent);