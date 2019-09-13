import moment from 'moment-timezone'

export const getDateTime = (timezone, format) => {
    return moment.tz(new Date(), timezone).format(format);
};
