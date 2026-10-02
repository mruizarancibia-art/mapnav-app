import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'MapNav',
  slug: 'mapnav-app',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.mapnav.app',
  },
  android: {
    package: 'com.mapnav.app',
  },
  extra: {
    eas: {
      projectId: 'mapnav-app',
    },
  },
});
