const DEFAULT_API_BASE_URL = "";

export function getApiBaseUrl() {
  const configured = process.env.REACT_APP_API_BASE_URL?.trim();
  if (configured) {
    return configured.replace(/\/$/, "");
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return DEFAULT_API_BASE_URL;
}

export function getApiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const baseUrl = getApiBaseUrl();
  return baseUrl ? `${baseUrl}${normalizedPath}` : normalizedPath;
}
