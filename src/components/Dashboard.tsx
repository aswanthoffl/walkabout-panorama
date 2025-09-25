import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Plus, ChevronRight, MapPin, Camera, Clock } from "lucide-react";

interface Project {
  id: string;
  name: string;
  lastScanned: string;
  tourCount: number;
  status: 'active' | 'processing' | 'completed';
  icon: string;
}

const projects: Project[] = [
  {
    id: '1',
    name: 'Project Alpha - Phase 2',
    lastScanned: 'Just now',
    tourCount: 3,
    status: 'active',
    icon: '📐'
  },
  {
    id: '2', 
    name: 'Project Beta - Q4 Tower',
    lastScanned: 'Oct 24, 2023',
    tourCount: 7,
    status: 'completed',
    icon: '🏗️'
  },
  {
    id: '3',
    name: 'Project Beta - Q4 Tower',
    lastScanned: 'Oct 24, 2023', 
    tourCount: 7,
    status: 'completed',
    icon: '🏢'
  },
  {
    id: '4',
    name: 'Project Gamma - Site Prep',
    lastScanned: 'Sep 15, 2023',
    tourCount: 2,
    status: 'processing',
    icon: '🚧'
  }
];

interface DashboardProps {
  onStartNewScan: () => void;
  onSelectProject: (projectId: string) => void;
}

export const Dashboard = ({ onStartNewScan, onSelectProject }: DashboardProps) => {
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'bg-scan-active';
      case 'processing':
        return 'bg-scan-processing';
      case 'completed':
        return 'bg-scan-completed';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">SiteScan 360</h1>
        <Button variant="ghost" size="icon">
          <Settings className="h-6 w-6" />
        </Button>
      </div>

      {/* Start New Scan Button */}
      <Button 
        onClick={onStartNewScan}
        className="w-full mb-6 h-14 text-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <Plus className="h-6 w-6 mr-2" />
        Start New Scan
      </Button>

      {/* Project List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <Card 
            key={project.id}
            className="bg-card border-border cursor-pointer hover:bg-card/80 transition-colors"
            onClick={() => onSelectProject(project.id)}
          >
            <div className="p-4">
              <div className="flex items-center gap-4">
                {/* Status Indicator */}
                <div className={`w-12 h-12 rounded-full ${getStatusColor(project.status)} flex items-center justify-center text-2xl`}>
                  {project.status === 'active' && <Camera className="h-6 w-6 text-white" />}
                  {project.status === 'processing' && <Clock className="h-6 w-6 text-white animate-spin" />}
                  {project.status === 'completed' && <MapPin className="h-6 w-6 text-white" />}
                </div>

                {/* Project Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-card-foreground text-lg">
                    {project.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Last Scanned: {project.lastScanned}
                  </p>
                </div>

                {/* Tours Count & Arrow */}
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-secondary/50">
                    {project.tourCount} Tours
                  </Badge>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};