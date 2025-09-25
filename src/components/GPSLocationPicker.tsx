import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Target, Compass } from "lucide-react";

interface GPSLocationPickerProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  className?: string;
}

interface GPSLocation {
  lat: number;
  lng: number;
  address: string;
  accuracy: number;
}

export const GPSLocationPicker = ({ onLocationSelect, className }: GPSLocationPickerProps) => {
  const [currentLocation, setCurrentLocation] = useState<GPSLocation | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // TODO: Replace with real Capacitor Geolocation
  const getCurrentLocation = async () => {
    setIsGettingLocation(true);
    setLocationError(null);

    try {
      // Simulate getting GPS location (replace with Capacitor)
      // import { Geolocation } from '@capacitor/geolocation';
      // const coordinates = await Geolocation.getCurrentPosition();
      
      // Simulated location data
      setTimeout(() => {
        const mockLocation: GPSLocation = {
          lat: 40.7128,
          lng: -74.0060,
          address: "Construction Site, New York, NY",
          accuracy: 5
        };
        
        setCurrentLocation(mockLocation);
        onLocationSelect(mockLocation);
        setIsGettingLocation(false);
      }, 2000);

    } catch (error) {
      setLocationError("Unable to get GPS location. Please enable location services.");
      setIsGettingLocation(false);
    }
  };

  return (
    <Card className={`bg-card border-border ${className}`}>
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="font-medium text-card-foreground">Site Location</h3>
        </div>

        {currentLocation ? (
          <div className="space-y-3">
            <div className="bg-secondary rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-secondary-foreground">Current Location</span>
                <Badge variant="default" className="bg-success text-success-foreground">
                  <Target className="h-3 w-3 mr-1" />
                  ±{currentLocation.accuracy}m
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{currentLocation.address}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span>Lat: {currentLocation.lat.toFixed(6)}</span>
                <span>Lng: {currentLocation.lng.toFixed(6)}</span>
              </div>
            </div>
            
            <Button 
              onClick={getCurrentLocation}
              variant="outline"
              size="sm"
              className="w-full"
              disabled={isGettingLocation}
            >
              <Navigation className="h-4 w-4 mr-2" />
              Update Location
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-3">
            {locationError ? (
              <div className="text-sm text-destructive bg-destructive/10 rounded-lg p-3">
                {locationError}
              </div>
            ) : (
              <div className="text-muted-foreground">
                <Compass className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Get your current GPS location to start mapping the site</p>
              </div>
            )}
            
            <Button 
              onClick={getCurrentLocation}
              disabled={isGettingLocation}
              className="w-full"
            >
              {isGettingLocation ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                  Getting Location...
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4 mr-2" />
                  Get Current Location
                </>
              )}
            </Button>
            
            <p className="text-xs text-muted-foreground">
              Requires location permissions and Supabase integration
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};