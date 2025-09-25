import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Square, Camera, Navigation, MapPin, Compass } from "lucide-react";
import { FloorPlanView } from "./FloorPlanView";

interface LiveScanningProps {
  onBack: () => void;
  onStopScan: () => void;
  scanConfig: {
    tourName: string;
    captureInterval: string;
  };
}

interface ScanStats {
  photosCaptered: number;
  distanceWalked: number;
  currentDistance: number;
  isAutoCapture: boolean;
}

export const LiveScanning = ({ onBack, onStopScan, scanConfig }: LiveScanningProps) => {
  const [scanStats, setScanStats] = useState<ScanStats>({
    photosCaptered: 0,
    distanceWalked: 0,
    currentDistance: 0,
    isAutoCapture: true
  });

  const [currentPosition, setCurrentPosition] = useState({ x: 50, y: 60 });
  const [path, setPath] = useState<Array<{ x: number; y: number; timestamp: number }>>([]);
  const [isScanning, setIsScanning] = useState(true);

  // Simulate movement and photo capture
  useEffect(() => {
    if (!isScanning) return;

    const interval = setInterval(() => {
      // Simulate movement
      const newX = Math.max(5, Math.min(95, currentPosition.x + (Math.random() - 0.5) * 4));
      const newY = Math.max(5, Math.min(95, currentPosition.y + (Math.random() - 0.5) * 4));
      
      setCurrentPosition({ x: newX, y: newY });
      setPath(prev => [...prev, { x: newX, y: newY, timestamp: Date.now() }]);
      
      // Simulate photo capture and distance tracking
      setScanStats(prev => ({
        ...prev,
        distanceWalked: prev.distanceWalked + Math.random() * 2,
        currentDistance: prev.currentDistance + Math.random() * 2,
        photosCaptered: scanConfig.captureInterval === '2m' && prev.currentDistance > 2 
          ? prev.photosCaptered + 1 
          : prev.photosCaptered
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isScanning, currentPosition, scanConfig.captureInterval]);

  const handleStopScan = () => {
    setIsScanning(false);
    onStopScan();
  };

  const handleManualCapture = () => {
    setScanStats(prev => ({
      ...prev,
      photosCaptered: prev.photosCaptered + 1
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-semibold text-card-foreground">{scanConfig.tourName}</h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-scan-active rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Recording</span>
              </div>
            </div>
          </div>
          <Button 
            onClick={handleStopScan}
            variant="destructive"
            className="bg-destructive hover:bg-destructive/90"
          >
            <Square className="h-4 w-4 mr-2" />
            Stop Scan
          </Button>
        </div>
      </div>

      {/* Floor Plan */}
      <div className="p-4">
        <Card className="bg-card border-border mb-4">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium text-card-foreground">Site Map</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Compass className="h-4 w-4" />
                  <span>N</span>
                </div>
              </div>
            </div>
            <FloorPlanView 
              currentPosition={currentPosition}
              path={path}
              className="w-full h-80"
            />
          </div>
        </Card>

        {/* Scan Controls */}
        <Card className="bg-secondary border-border">
          <div className="p-4 space-y-4">
            {/* Camera Status */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-secondary-foreground">360° Camera Active</h3>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="default" className="bg-success text-success-foreground">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Insta360 Pro 2
                  </Badge>
                  <span className="text-muted-foreground">
                    Photos Captured: {scanStats.photosCaptered}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex justify-between items-center text-sm">
              <div>
                <span className="text-muted-foreground">Distance Walked:</span>
                <span className="font-medium text-secondary-foreground ml-1">
                  {Math.round(scanStats.distanceWalked)} m
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Current Segment:</span>
                <span className="font-medium text-secondary-foreground ml-1">
                  {Math.round(scanStats.currentDistance)} m
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={scanStats.isAutoCapture}
                    onCheckedChange={(checked) => 
                      setScanStats(prev => ({ ...prev, isAutoCapture: checked }))
                    }
                  />
                  <span className="text-sm text-secondary-foreground">Auto-Capture</span>
                  <Badge variant="outline" className="text-xs">ON</Badge>
                </div>
              </div>
              <Button 
                onClick={handleManualCapture}
                size="lg"
                className="bg-primary hover:bg-primary/90 rounded-full h-16 w-16"
              >
                <Camera className="h-8 w-8" />
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Badge variant="outline" className="text-xs">High Accuracy</Badge>
                </span>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);