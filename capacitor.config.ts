import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.65c766c754e546c4893f0718fb78f804',
  appName: 'bangla-khet-bondhu',
  webDir: 'dist',
  server: {
    url: 'https://65c766c7-54e5-46c4-893f-0718fb78f804.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#4ade80",
      showSpinner: false
    }
  }
};

export default config;