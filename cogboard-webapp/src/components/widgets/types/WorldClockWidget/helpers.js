import moment from 'moment-timezone'

export const getDate = (timezone, format) => {
    return moment.tz(new Date(), timezone).format(format);
};
