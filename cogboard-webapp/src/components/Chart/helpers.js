const calculatePercentageValue = (value, maxValue) => Math.round((100 * value) / maxValue)

export const getNumberOfElements = (array, number) => array.slice(Math.max(array.length - number, 0));

export const convertEpochToDate = (value) => {
    const convertedEpoch = parseInt(value) + (new Date().getTimezoneOffset() * -1);
    return new Date(convertedEpoch);
}

export const setBarColor = (value, maxValue, range) => {
    if (!value) return 'white';

    const percentageValue = calculatePercentageValue(value.y, maxValue);
    let barColorStatus;

    if (percentageValue > range[1]) {
        barColorStatus = 'red'
    } else if (percentageValue < range[0]) {
        barColorStatus = 'green'
    } else {
        barColorStatus = 'orange'
    }

    return barColorStatus
}