export const validFormEndpoint = {
  label: 'TestLabel',
  url: 'http://www.google.com',
  publicUrl: 'https://google.com',
  credential: 'TestCredential'
};

export const testCredentials = (timestamp = 'initial') => {
  return {
    password: "TestPassword1",
    user: "TestUser1",
    label: `TC-${timestamp}`
  };
};