import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'HHA-PAYMENT',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins:{
    Splashscreen:{
      launchAutoHide: true,
      launchShowDuration: 0
    }
  },
  cordova:{
    preferences:{
      LottieFullScreen:'true',
      LottieAutoHideSplashScreen: 'true',
      LottieHideAfterAnimationEnd: 'true',
      LottieScaleType: 'CENTER_CROP',
      LottieAnimationLocation: 'public/assets/splash.json'
    }
  }
};

export default config;
