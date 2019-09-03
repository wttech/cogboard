import moment from "moment-timezone";

export const setSize = factor => ({ theme }) => `${theme.spacing(factor)}px`;

export const splitPropsGroupName = (propName) => {
  return propName.includes('.') ? propName.split('.') : [undefined, propName];
};

export const getGmtTimezones = () => {
  let allTimezones = moment.tz.names();
  const duplicatedTimezones = ['Etc/GMT', 'Etc/GMT+0', 'Etc/GMT0']; //duplicated timezones to be removed

  const gmtSort = (a, b) => {
    let parts = {
      a: a.split('T'),
      b: b.split('T')
    };
    return parseInt(parts.a[1]) < parseInt(parts.b[1]) ? 1 : -1; //sorts by GMT number value
  };

  let gmtTimezones = allTimezones
      .filter(timezone => {
        return timezone.includes("Etc/GMT") && !duplicatedTimezones.includes(timezone); //filters out only GMT timezones and removes duplicates
      })
      .sort(gmtSort)
      .map(timezone => {
        const displayName = timezone
            .replace('Etc/', '') //removes 'ETC/' prefix and leaves only GMT+{} format
            .replace(/[+-]/g, c => c == '+' ? '-' : '+'); //swap '+' sign with '-' sign to preserve correct time
        return {
          display: displayName,
          value: timezone
        };
      });
  return gmtTimezones;
};