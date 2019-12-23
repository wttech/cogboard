export const capitalize = ([firstLetter, ...rest]) =>
  [firstLetter.toUpperCase(), ...rest].join('');

export const parseYupErrors = errors => {
  let result = {};
  errors &&
    errors.inner &&
    errors.inner.forEach(error => {
      const { path, message } = error;

      if (path in result) {
        result[path].push(message);
      } else {
        result[path] = [message];
      }
    });

  return result;
};

export const hasError = error => error !== undefined;
