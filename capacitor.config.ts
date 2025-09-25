import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.f5c82014d6694159b52e5440b7639a8c',
  appName: 'SiteScan 360',
  webDir: 'dist',
  server: {
    url: "https://f5c82014-d669-4159-b52e-5440b7639a8c.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ["camera", "photos"]
    },
    Geolocation: {
      permissions: ["location"]
    }
  }
};

export default config;