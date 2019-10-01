import decode from 'jwt-decode';

const tokenName = 'token';

const isTokenExpired = token => {
  const expTimestamp = decode(token).exp * 1000;

  return Date.now() > expTimestamp;
};

export const getToken = () => localStorage.getItem(tokenName);

export const setToken = token => localStorage.setItem(tokenName, token);

export const removeToken = () => localStorage.removeItem(tokenName);

export const isAuthenticated = () => !!getToken() && !isTokenExpired(getToken());