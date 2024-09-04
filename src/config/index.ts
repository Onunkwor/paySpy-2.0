export const NODE_ENV = import.meta.env.VITE_ENV;

export const DEVELOPMENT_SERVER_BASE_URL = import.meta.env
  .VITE_DEVELOPMENT_SERVER_BASE_URL;

export const PRODUCTION_SERVER_BASE_URL = import.meta.env
  .VITE_PRODUCTION_SERVER_BASE_URL;

export const SERVER_BASE_URL =
  NODE_ENV === "development"
    ? DEVELOPMENT_SERVER_BASE_URL
    : PRODUCTION_SERVER_BASE_URL;
