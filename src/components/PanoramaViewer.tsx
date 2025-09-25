import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronLeft, ChevronRight, Share, MessageCircle, RotateCw, ZoomIn, ZoomOut, Map } from "lucide-react";
import panoramaImage from "@/assets/panorama-demo.jpg";

interface PanoramaViewerProps {
  onBack: () => void;
  tourDate: string;
  tourName: string;
}

export const PanoramaViewer = ({ onBack, tourDate, tourName }: PanoramaViewerProps) => {
  const [showMiniMap, setShowMiniMap] = useState(true);
  const [currentView, setCurrentView] = useState(0);
  const totalViews = 78;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Panorama Background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.2)), url(${panoramaImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-background/80 to-transparent p-4 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack} className="bg-background/20 backdrop-blur-sm">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-semibold text-foreground">{tourName}</h1>
              <p className="text-sm text-muted-foreground">Tour Date: {tourDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="bg-background/20 backdrop-blur-sm">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="bg-background/20 backdrop-blur-sm">
              <Share className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mini Map Overlay */}
      {showMiniMap && (
        <div className="absolute top-20 right-4 z-10">
          <Card className="bg-card/90 backdrop-blur-sm border-border w-48 h-32">
            <div className="p-3">
              <div className="relative bg-muted rounded h-24">
                {/* Simplified floor plan */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <g stroke="hsl(var(--border))" strokeWidth="1" fill="none">
                    <rect x="10" y="20" width="80" height="60" />
                    <line x1="10" y1="40" x2="50" y2="40" />
                    <line x1="50" y1="20" x2="50" y2="60" />
                    <line x1="70" y1="20" x2="70" y2="80" />
                  </g>
                  
                  {/* Path with current position */}
                  <g>
                    <path
                      d="M20,70 L30,60 L40,50 L50,45 L60,40 L70,35"
                      stroke="hsl(var(--path-primary))"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <circle cx="70" cy="35" r="2" fill="hsl(var(--primary))" />
                  </g>
                </svg>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="absolute top-1 right-1 h-6 w-6 p-0"
                  onClick={() => setShowMiniMap(false)}
                >
                  ×
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Navigation Controls - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-4 z-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          {/* Previous */}
          <Button 
            variant="ghost" 
            size="lg" 
            className="bg-background/20 backdrop-blur-sm rounded-full h-14 w-14"
            onClick={() => setCurrentView(Math.max(0, currentView - 1))}
            disabled={currentView === 0}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          {/* Play/Fast Forward Controls */}
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="lg" 
              className="bg-background/20 backdrop-blur-sm rounded-full h-12 w-12"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </Button>
            <Button 
              variant="ghost" 
              size="lg" 
              className="bg-background/20 backdrop-blur-sm rounded-full h-12 w-12"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
              </svg>
            </Button>
          </div>

          {/* Next */}
          <Button 
            variant="ghost" 
            size="lg" 
            className="bg-background/20 backdrop-blur-sm rounded-full h-14 w-14"
            onClick={() => setCurrentView(Math.min(totalViews - 1, currentView + 1))}
            disabled={currentView === totalViews - 1}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>

        {/* Additional Controls */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="bg-background/20 backdrop-blur-sm"
              onClick={() => setShowMiniMap(!showMiniMap)}
            >
              <Map className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="bg-background/20 backdrop-blur-sm">
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="bg-background/20 backdrop-blur-sm">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="bg-background/20 backdrop-blur-sm">
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-3 text-center">
          <Badge variant="secondary" className="bg-background/40 backdrop-blur-sm">
            {currentView + 1} of {totalViews} photos
          </Badge>
        </div>
      </div>

      {/* Touch/Drag Hint */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-5">
        <div className="text-center text-foreground/60">
          <div className="mb-2 text-4xl">🔄</div>
          <p className="text-sm">Drag to look around</p>
        </div>
      </div>
    </div>
  );
};