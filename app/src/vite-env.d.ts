/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly APP_NAME: string;
  readonly APP_PORT: number;
  readonly APP_DOMAIN: string;
  readonly API_DOMAIN: string;
  readonly API_HOST: string;
  readonly API_PORT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
