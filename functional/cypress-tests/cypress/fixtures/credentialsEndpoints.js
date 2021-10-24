export const badCredentials = () => {
  return {
    token: ' ',
    password: 'xxxxxxxxxxx',
    passwordConf: 'zzz',
    user: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
    label: ' ',
    sshKey: 'xxx',
  };
};

export const testCredentials = uid => {
  return {
    token: 'TestToken',
    password: 'TestPassword1',
    user: 'TestUser1',
    label: `${CREDENTIAL_LABEL_PREFIX}${uid}`
  };
};

export const badEndpoint = () => {
  return {
    label: ' ',
    url: 'xxx',
    publicUrl: 'zzz'
  };
};

export const testEndpoint = uid => {
  return {
    label: `${ENDPOINT_LABEL_PREFIX}${uid}`,
    url: 'http://cognifide.com',
    publicUrl: 'http://cognifide.com',
    credentials: `${CREDENTIAL_LABEL_PREFIX}${uid}`,
    id: uid
  };
};

export const testEndpointByIp = uid => {
  return {
    label: `${ENDPOINT_LABEL_PREFIX}ip-${uid}`,
    url: 'https://123.123.123.13:9082',
    publicUrl: 'https://123.123.123.13:9082',
    credentials: `${CREDENTIAL_LABEL_PREFIX}${uid}`,
    id: uid
  };
};

export const ENDPOINT_LABEL_PREFIX = 'TE-';
export const CREDENTIAL_LABEL_PREFIX = 'TC-';
