import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, CheckCircle, FileImage, MapPin } from "lucide-react";
import { toast } from "sonner";
import { GPSLocationPicker } from "./GPSLocationPicker";

interface NewScanSetupProps {
  onBack: () => void;
  onStartScan: (config: ScanConfig) => void;
}

interface ScanConfig {
  tourName: string;
  captureInterval: string;
  floorPlan?: File;
  siteLocation?: { lat: number; lng: number; address: string };
}

export const NewScanSetup = ({ onBack, onStartScan }: NewScanSetupProps) => {
  const [tourName, setTourName] = useState('');
  const [captureInterval, setCaptureInterval] = useState('2m');
  const [floorPlan, setFloorPlan] = useState<File | null>(null);
  const [siteLocation, setSiteLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [cameraConnected] = useState(true); // Simulated connection status

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFloorPlan(file);
      toast.success("Floor plan uploaded successfully");
    }
  };

  const handleStartScan = () => {
    if (!tourName) {
      toast.error("Please enter a tour name");
      return;
    }
    
    const config: ScanConfig = {
      tourName,
      captureInterval,
      floorPlan: floorPlan || undefined,
      siteLocation: siteLocation || undefined
    };
    
    onStartScan(config);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-semibold text-foreground">New Scan Setup</h1>
      </div>

      <div className="space-y-6">
        {/* GPS Location Setup */}
        <GPSLocationPicker
          onLocationSelect={setSiteLocation}
        />

        {/* Tour Name */}
        <div className="space-y-2">
          <Label htmlFor="tourName" className="text-foreground font-medium">
            Tour Name
          </Label>
          <Input
            id="tourName"
            placeholder="Enter a descriptive name"
            value={tourName}
            onChange={(e) => setTourName(e.target.value)}
            className="bg-input border-border text-foreground"
          />
        </div>

        {/* Floor Plan Upload */}
        <Card className="bg-card border-border">
          <div className="p-4">
            <Label className="text-card-foreground font-medium mb-3 block">
              Floor Plan (Optional)
            </Label>
            <div className="relative">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button 
                variant="secondary" 
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <FileImage className="h-5 w-5 mr-2" />
                Upload Floor Plan
              </Button>
            </div>
            {floorPlan && (
              <p className="text-sm text-success mt-2">
                ✓ {floorPlan.name} uploaded
              </p>
            )}
          </div>
        </Card>

        {/* Camera Connection Status */}
        <Card className="bg-card border-border">
          <div className="p-4">
            <h3 className="text-card-foreground font-medium mb-3">
              360° Camera Connection
            </h3>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-success" />
              <div>
                <p className="text-success font-medium">Status: Connected</p>
                <p className="text-muted-foreground text-sm">Insta360 Pro 2</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Auto-Capture Settings */}
        <Card className="bg-card border-border">
          <div className="p-4">
            <h3 className="text-card-foreground font-medium mb-4">
              Auto-Capture Settings
            </h3>
            <div className="space-y-3">
              <Label htmlFor="interval" className="text-card-foreground">
                Capture Interval
              </Label>
              <Select value={captureInterval} onValueChange={setCaptureInterval}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">Every 1 meter</SelectItem>
                  <SelectItem value="2m">Every 2 meters</SelectItem>
                  <SelectItem value="3m">Every 3 meters</SelectItem>
                  <SelectItem value="5m">Every 5 meters</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Start Scan Button */}
        <Button 
          onClick={handleStartScan}
          className="w-full h-14 text-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={!cameraConnected}
        >
          Start Scan
        </Button>
      </div>
    </div>
  );
};