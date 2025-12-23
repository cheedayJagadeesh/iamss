import { environment } from './environment';

const hostname = window.location.hostname;

const ENV_MAP: Record<string, keyof typeof environment.urls> = {
  'ielc.inteqportal.com': 'test',
  'ielc-stage.inteqportal.com': 'stage',
  'inteqemployeelearingcenter.azurewebsites.net': 'prod'
};

const currentEnvKey =
  ENV_MAP[hostname] ?? 'test';

export const environmentConfig = {
  redirectUri: environment.urls[currentEnvKey].redirectUri,
  postLogoutRedirectUri: environment.urls[currentEnvKey].postLogoutRedirectUri
};
