import decode from 'jwt-decode';

const TOKEN_PROP = 'token';

const GUEST_NAME_PROP = 'guestName';

const hasToken = () => !!getToken();

const isTokenExpired = token => {
  const expTimestamp = decode(token).exp * 1000;

  return Date.now() > expTimestamp;
};

export const getUserRole = () =>
  hasToken() ? decode(getToken()).name : undefined;

export const getToken = () => localStorage.getItem(TOKEN_PROP);

export const setToken = token => localStorage.setItem(TOKEN_PROP, token);

export const removeToken = () => localStorage.removeItem(TOKEN_PROP);

export const isAuthenticated = () => hasToken() && !isTokenExpired(getToken());

export const getGuestName = () => sessionStorage.getItem(GUEST_NAME_PROP);

export const setGuestName = name =>
  sessionStorage.setItem(GUEST_NAME_PROP, name);

export const removeGuestName = () => sessionStorage.removeItem(GUEST_NAME_PROP);
