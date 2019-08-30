export const URL = {
    LOAD_DATA: '/api/config', // for front dev change to '/data.json'
    SAVE_DATA: '/api/config/save',
    UPDATE_WIDGET: '/api/widget/update'
};
export const COLUMNS_MIN = 1;
export const COLUMNS_MAX = 20;

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
