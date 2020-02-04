export const testCredential = timestamp => {
  return {
    password: 'TestPassword1',
    user: 'TestUser1',
    label: `TC-${timestamp}`
  };
};

export const testEndpoint = timestamp => {
  return {
    label: `TE-${timestamp}`,
    url: 'http://cognifide.com',
    publicUrl: 'http://cognifide.com',
    credentials: `TC-${timestamp}`,
    id: `TE-${timestamp}`
  };
};

export const testEndpointByIp = timestamp => {
  return {
    label: `TE-${timestamp}`,
    url: 'https://123.123.123.13:9082',
    publicUrl: 'https://123.123.123.13:9082',
    credentials: `TC-${timestamp}`,
    id: `TE-${timestamp}`
  };
};

export const testLbl = 'test';

export const editedLbl = 'EditedLabel';
