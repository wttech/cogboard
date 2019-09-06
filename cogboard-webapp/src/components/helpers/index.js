import moment from "moment-timezone";

export const setSize = factor => ({ theme }) => `${theme.spacing(factor)}px`;

export const splitPropsGroupName = (propName) => {
  return propName.includes('.') ? propName.split('.') : [undefined, propName];
};

export const getGmtTimezones = () => {
  const allTimezones = moment.tz.names();
  const duplicatedTimezones = ['Etc/GMT', 'Etc/GMT+0', 'Etc/GMT0'];

  const gmtSort = (a, b) => {
    const parts = {
      a: a.split('T'),
      b: b.split('T')
    };
    return parseInt(parts.b[1]) - parseInt(parts.a[1]);
  };

  return allTimezones
      .filter(timezone => timezone.includes("Etc/GMT") && !duplicatedTimezones.includes(timezone))
      .sort(gmtSort)
      .map(timezone => {
        const displayName = timezone
            .replace('Etc/', '')
            .replace(/[+-]/g, c => c === '+' ? '-' : '+'); //swap '+' sign with '-' sign to preserve correct time
        return {
          display: displayName,
          value: timezone
        };
      });
};

export const sortByKey = (obj, key, asc = true) => Object.entries(obj)
  .sort(([, { [key]: keyA }], [, { [key]: keyB }]) => (
    asc ? keyA.localeCompare(keyB) : keyB.localeCompare(keyA)))
  .reduce((newObj, [key, value]) => {
    newObj[key] = value;

    return newObj;
  }, {});
