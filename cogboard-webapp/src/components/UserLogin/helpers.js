export const getCredentials = () => {
  const usernameField = document.getElementById('username');
  const passwordField = document.getElementById('password');
  return {
    username: usernameField ? usernameField.value : '',
    password: passwordField ? passwordField.value : ''
  };
};
