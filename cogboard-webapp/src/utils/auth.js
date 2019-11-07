import decode from 'jwt-decode';

const tokenName = 'token';

const hasToken = () => !!getToken();

const isTokenExpired = token => {
  const expTimestamp = decode(token).exp * 1000;

  return Date.now() > expTimestamp;
};

export const getUserRole = () => hasToken() ? decode(getToken()).name : undefined;

export const getToken = () => localStorage.getItem(tokenName);

export const setToken = token => localStorage.setItem(tokenName, token);

export const removeToken = () => localStorage.removeItem(tokenName);

export const isAuthenticated = () => hasToken() && !isTokenExpired(getToken());