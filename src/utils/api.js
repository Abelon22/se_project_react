export const BASE_URL = "http://localhost:3001";

export const JWT_KEY = "jwt";

export const getToken = () => localStorage.getItem(JWT_KEY);
export const setToken = (t) => localStorage.setItem(JWT_KEY, t);
export const clearToken = () => localStorage.removeItem(JWT_KEY);

// --- endpoints that should NOT get Authorization automatically
const PUBLIC_RULES = [
  { method: "POST", path: "/signin" },
  { method: "POST", path: "/signup" },
  { method: "GET", path: "/items" }, // list items is public
];

// simple matcher
function isPublic(method, path) {
  return PUBLIC_RULES.some(
    (r) => r.method === method.toUpperCase() && r.path === path
  );
}

// --- core fetch that always returns res.json()
async function apiFetch(
  path,
  { method = "GET", body, headers = {}, withAuth = true, signal } = {}
) {
  const url = `${BASE_URL}${path}`;
  const finalHeaders = { "Content-Type": "application/json", ...headers };

  // attach token unless the call is public OR withAuth is false
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

  // your API returns JSON everywhere
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

// convenience helpers
const apiGet = (path, opts) => apiFetch(path, { method: "GET", ...opts });
const apiPost = (path, body, opts) =>
  apiFetch(path, { method: "POST", body, ...opts });
const apiDelete = (path, opts) => apiFetch(path, { method: "DELETE", ...opts });

const apiPatch = (path, opts) => apiFetch(path, { method: "PATCH", ...opts });

const apiPut = (path, opts) => apiFetch(path, { method: "PUT", ...opts });

// specific calls
export const getMe = (opts) => apiGet("/users/me", opts);
export const postSignin = (email, password) =>
  apiPost("/signin", { email, password }, { withAuth: false });
export const postSignup = (name, avatar, email, password) =>
  apiPost("/signup", { name, avatar, email, password }, { withAuth: false });

export const updateUser = (name, avatar) =>
  apiPatch("/users/me", { body: { name, avatar } });

export const deleteItem = (itemId) => apiDelete(`/items/${itemId}`);

export const likeItem = (itemId) => apiPut(`/items/${itemId}/likes`);

export const disLikeItem = (itemId) => apiDelete(`/items/${itemId}/likes`);

export const createItem = (name, weather, imageUrl) =>
  apiPost("/items", { body: { name, weather, imageUrl } });

export const getAllItems = () => apiGet("/items", { withAuth: false });
