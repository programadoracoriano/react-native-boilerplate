import { ExpoConfig, ConfigContext } from 'expo/config';
import projectConfig from './config.json';


export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Pescador',
  slug: 'pescador',
  extra: {
    API_URL: projectConfig.API_URL,
  },
});
