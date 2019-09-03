import moment from "moment-timezone";

export const URL = {
  LOAD_DATA: '/api/config', // for front dev change to '/data.json'
  SAVE_DATA: '/api/config/save',
  UPDATE_WIDGET: '/api/widget/update'
};
export const COLUMNS_MIN = 1;
export const COLUMNS_MAX = 20;

export const GMT_TIMEZONES = () => {
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

export const DATE_FORMATS = [
    {
        display: "29-08-2019, 15:43:12",
        value: "DD-MM-YYYY, HH:mm:ss"
    },
    {
        display: "29 Aug 2019, 15:43:12",
        value: "DD MMM YYYY, HH:mm:ss"
    },
    {
        display: "15:43:12, 29-08-2019",
        value: ", HH:mm:ss, DD-MM-YYYY"
    },
    {
        display: "15:43:12, 29 Aug 2019",
        value: "HH:mm:ss, DD MMM YYYY"
    }
];

export const ROWS_MIN = 1;
export const ItemTypes = {
  WIDGET: 'widget'
};
