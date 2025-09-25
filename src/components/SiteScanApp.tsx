import { useState } from "react";
import { Dashboard } from "./Dashboard";
import { NewScanSetup } from "./NewScanSetup";
import { LiveScanning } from "./LiveScanning";
import { PanoramaViewer } from "./PanoramaViewer";

type AppView = 'dashboard' | 'newScan' | 'scanning' | 'panorama';

interface ScanConfig {
  tourName: string;
  captureInterval: string;
  floorPlan?: File;
}

export const SiteScanApp = () => {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [scanConfig, setScanConfig] = useState<ScanConfig | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const handleStartNewScan = () => {
    setCurrentView('newScan');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setScanConfig(null);
    setSelectedProject(null);
  };

  const handleStartScanning = (config: ScanConfig) => {
    setScanConfig(config);
    setCurrentView('scanning');
  };

  const handleStopScanning = () => {
    setCurrentView('dashboard');
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProject(projectId);
    setCurrentView('panorama');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard 
            onStartNewScan={handleStartNewScan}
            onSelectProject={handleSelectProject}
          />
        );
      case 'newScan':
        return (
          <NewScanSetup 
            onBack={handleBackToDashboard}
            onStartScan={handleStartScanning}
          />
        );
      case 'scanning':
        return scanConfig ? (
          <LiveScanning 
            onBack={handleBackToDashboard}
            onStopScan={handleStopScanning}
            scanConfig={scanConfig}
          />
        ) : null;
      case 'panorama':
        return (
          <PanoramaViewer 
            onBack={handleBackToDashboard}
            tourDate="Oct 26, 2023"
            tourName="Project Alpha - Phase 2"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {renderCurrentView()}
    </div>
  );
};