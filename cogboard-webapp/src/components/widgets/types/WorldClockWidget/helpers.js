import moment from 'moment-timezone'

export const getDateTime = (timezone, format) => {
  return moment.tz(new Date(), timezone).format(format);
};

const getGmtTimezones = () => {
  const allTimezones = moment.tz.names();
  const duplicatedTimezones = ['Etc/GMT', 'Etc/GMT+0', 'Etc/GMT0'];

  const gmtSort = (a, b) => {
    const parts = {
      a: a.split('T'),
      b: b.split('T')
    };
    return parseInt(parts.b[1]) - parseInt(parts.a[1]);
  };

  const gmtTimezones = allTimezones
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

  gmtTimezones.insert(0, {
    display: "Current time zone",
    value: moment.tz.guess()
  });

  return gmtTimezones;
};

export const GMT_TIMEZONES = getGmtTimezones();

export const DATE_FORMATS = [
  {
    display: '29/08/2019',
    value: 'DD/MM/YYYY'
  },
  {
    display: 'Friday, 29/08/2019',
    value: 'dddd, DD/MM/YYYY'
  },
  {
    display: '29 Aug 2019',
    value: 'DD MMM YYYY'
  },
  {
    display: 'Friday, 29 Aug 2019',
    value: 'dddd, DD MMM YYYY'
  },
  {
    display: '29th August 2019',
    value: 'Do MMMM YYYY'
  },
  {
    display: 'Friday, 29th August 2019',
    value: 'dddd, Do MMMM YYYY'
  }
];

export const TIME_FORMATS = [
  {
    display: '12-hour (AM/PM)',
    value: 'h:mm:ss a'
  },
  {
    display: '24-hour',
    value: 'HH:mm:ss'
  }
];