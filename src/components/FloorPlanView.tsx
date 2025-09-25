import { cn } from "@/lib/utils";

interface FloorPlanViewProps {
  currentPosition: { x: number; y: number };
  path: Array<{ x: number; y: number; timestamp: number }>;
  className?: string;
}

export const FloorPlanView = ({ currentPosition, path, className }: FloorPlanViewProps) => {
  return (
    <div className={cn("relative bg-muted rounded-lg overflow-hidden", className)}>
      {/* Floor Plan Background */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Room Outlines */}
        <g stroke="hsl(var(--border))" strokeWidth="0.5" fill="none">
          {/* Main building outline */}
          <rect x="10" y="15" width="80" height="70" />
          
          {/* Interior walls */}
          <line x1="10" y1="35" x2="50" y2="35" />
          <line x1="50" y1="15" x2="50" y2="55" />
          <line x1="70" y1="15" x2="70" y2="85" />
          <line x1="30" y1="55" x2="70" y2="55" />
          <line x1="30" y1="35" x2="30" y2="85" />
          
          {/* Door openings */}
          <line x1="45" y1="35" x2="55" y2="35" stroke="hsl(var(--muted-foreground))" strokeWidth="0.3" />
          <line x1="65" y1="55" x2="75" y2="55" stroke="hsl(var(--muted-foreground))" strokeWidth="0.3" />
        </g>

        {/* Compass */}
        <g transform="translate(15, 20)">
          <circle cx="0" cy="0" r="3" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.2" />
          <line x1="0" y1="-2" x2="0" y2="-1" stroke="hsl(var(--foreground))" strokeWidth="0.3" />
          <text x="0" y="-4" textAnchor="middle" className="text-xs fill-current" fontSize="2">N</text>
          <text x="3" y="1" textAnchor="middle" className="text-xs fill-current" fontSize="1.5">E</text>
          <text x="-3" y="1" textAnchor="middle" className="text-xs fill-current" fontSize="1.5">W</text>
          <text x="0" y="5" textAnchor="middle" className="text-xs fill-current" fontSize="1.5">S</text>
        </g>

        {/* Path Trail */}
        {path.length > 1 && (
          <g>
            <path
              d={path.reduce((acc, point, index) => {
                if (index === 0) return `M ${point.x} ${point.y}`;
                return `${acc} L ${point.x} ${point.y}`;
              }, '')}
              stroke="hsl(var(--path-primary))"
              strokeWidth="0.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Path points */}
            {path.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="0.8"
                fill="hsl(var(--path-primary))"
              />
            ))}
          </g>
        )}

        {/* Current Position */}
        <g transform={`translate(${currentPosition.x}, ${currentPosition.y})`}>
          {/* Position indicator ring */}
          <circle
            cx="0"
            cy="0"
            r="2.5"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            opacity="0.6"
          >
            <animate
              attributeName="r"
              values="2.5;4;2.5"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.6;0.2;0.6"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          
          {/* Current position dot */}
          <circle
            cx="0"
            cy="0"
            r="1.5"
            fill="hsl(var(--primary))"
          />
          
          {/* Direction indicator */}
          <polygon
            points="0,-1.5 0.7,0.7 0,0.3 -0.7,0.7"
            fill="hsl(var(--primary-foreground))"
            transform="rotate(45)"
          />
        </g>
      </svg>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-card/90 backdrop-blur-sm rounded px-2 py-1 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-card-foreground">Current</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-0.5 bg-path-primary"></div>
            <span className="text-card-foreground">Path</span>
          </div>
        </div>
      </div>
    </div>
  );
};