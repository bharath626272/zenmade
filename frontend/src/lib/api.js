const DEFAULT_API_BASE_URL = "http://localhost:5000";

export function getApiBaseUrl() {
  return process.env.REACT_APP_API_BASE_URL || DEFAULT_API_BASE_URL;
}

export function getApiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}
