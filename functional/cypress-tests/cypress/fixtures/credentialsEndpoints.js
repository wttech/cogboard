export const testCredential = timestamp => {
  return {
    password: "TestPassword1",
    user: "TestUser1",
    label: `TC-${timestamp}`
  };
};

export const testEndpoint = timestamp => {
  return {
    label: `TE-${timestamp}`,
    url: "http://cognifide.com",
    publicUrl: "http://cognifide.com",
    credentials: `TC-${timestamp}`,
    id: `TE-${timestamp}`
  };
};

export const testLbl = "test";

export const editedLbl = "EditedLabel";
