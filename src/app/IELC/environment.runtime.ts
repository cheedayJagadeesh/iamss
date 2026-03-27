import { environment } from './environment';

type EnvKey = keyof typeof environment.urls;

const hostname = window.location.hostname;

const ENV_MAP: Record<string, EnvKey> = {
  'ielc-testapp.azurewebsites.net': 'test',
  'app-local.xyz': 'test-dns',
  'ielc-stage.inteqportal.com': 'stage',
  'inteqemployeelearingcenter.azurewebsites.net': 'prod',
  'ielc.inteqportal.com': 'prod-dns',
};

const currentEnvKey: EnvKey =
  ENV_MAP[hostname] ?? 'test';

export const environmentConfig = {
  redirectUri: environment.urls[currentEnvKey].redirectUri,
  postLogoutRedirectUri: environment.urls[currentEnvKey].postLogoutRedirectUri
};
