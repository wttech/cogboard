export const compareVersionNumbers = (v1, v2) => {
  let v1parts = v1.split('.');
  let v2parts = v2.split('.');

  const isPositiveInteger = x => /^\d+$/.test(x);

  const validateParts = parts => {
    for (let i = 0; i < parts.length; ++i) {
      if (!isPositiveInteger(parts[i])) return false;
    }
    return true;
  };

  if (!validateParts(v1parts) || !validateParts(v2parts)) {
    return NaN;
  }

  for (let i = 0; i < v1parts.length; ++i) {
    if (v2parts.length === i) return 1;
    if (v1parts[i] === v2parts[i]) continue;
    if (v1parts[i] > v2parts[i]) return 1;

    return -1;
  }

  if (v1parts.length !== v2parts.length) return -1;

  return 0;
};
