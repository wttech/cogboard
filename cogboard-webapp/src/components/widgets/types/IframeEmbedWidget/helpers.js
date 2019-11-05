const HTTP = 'http://';
const WWW = 'www';

export const attachHttp = url => {
  if (url.startsWith(WWW)) {
    return HTTP + url;
  }
  return url;
};
