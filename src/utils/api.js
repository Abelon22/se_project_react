export const BASE_URL = "http://localhost:3001";

export const JWT_KEY = "jwt";

export const getToken = () => localStorage.getItem(JWT_KEY);
export const setToken = (t) => localStorage.setItem(JWT_KEY, t);
export const clearToken = () => localStorage.removeItem(JWT_KEY);

const PUBLIC_RULES = [
  { method: "POST", path: "/signin" },
  { method: "POST", path: "/signup" },
  { method: "GET", path: "/items" },
];

function isPublic(method, path) {
  return PUBLIC_RULES.some(
    (r) => r.method === method.toUpperCase() && r.path === path
  );
}

async function apiFetch(
  path,
  { method = "GET", body, headers = {}, withAuth = true, signal } = {}
) {
  const url = `${BASE_URL}${path}`;
  const finalHeaders = { "Content-Type": "application/json", ...headers };

  const token = getToken();
  if (withAuth && token && !isPublic(method, path)) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method,
    headers: finalHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const msg =
      (data && (data.message || data.error)) || `Request failed: ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

const apiGet = (path, opts) => apiFetch(path, { method: "GET", ...opts });
const apiPost = (path, body, opts) =>
  apiFetch(path, { method: "POST", body, ...opts });
const apiDelete = (path, opts) => apiFetch(path, { method: "DELETE", ...opts });

const apiPatch = (path, body, opts) =>
  apiFetch(path, { method: "PATCH", body, ...opts });

const apiPut = (path, body, opts) =>
  apiFetch(path, { method: "PUT", body, ...opts });

export const getMe = (opts) => apiGet("/users/me", opts);
export const postSignin = (email, password) =>
  apiPost("/signin", { email, password }, { withAuth: false });
export const postSignup = (name, avatar, email, password) =>
  apiPost("/signup", { name, avatar, email, password }, { withAuth: false });

export const updateUser = (name, avatar) =>
  apiPatch("/users/me", { name, avatar });

export const deleteItem = (itemId) => apiDelete(`/items/${itemId}`);

export const likeItem = (itemId) => apiPut(`/items/${itemId}/likes`, {});

export const disLikeItem = (itemId) => apiDelete(`/items/${itemId}/likes`);

export const createItem = (name, weather, imageUrl) =>
  apiPost("/items", { name, weather, imageUrl });

export const getAllItems = () => apiGet("/items", { withAuth: false });
