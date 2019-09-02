export const setSize = factor => ({ theme }) => `${theme.spacing(factor)}px`;

export const splitPropsGroupName = (propName) => {
  return propName.includes('.') ? propName.split('.') : [undefined, propName];
};

/**
 * Sort object properties (only own properties will be sorted).
 * @param {object} obj object to sort properties
 * @param {string|int} sortedBy 1 - sort object properties by specific value.
 * @param {bool} reverse false - reverse sorting.
 * @returns {Array} array of items in [[key,value],[key,value],...] format.
 */
const sortObjectProperties = (obj, sortedBy, reverse) => {
    sortedBy = sortedBy || 1; // by default first key
    reverse = reverse || false; // by default no reverse
    let reversed = (reverse) ? -1 : 1; //value needed to reverse order in sort function

    let sortable = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            sortable.push([key, obj[key]]);
        }
    }

    sortable.sort(function (a, b) {
        let x = a[1][sortedBy].toLowerCase(),
            y = b[1][sortedBy].toLowerCase();
        return x < y ? reversed * -1 : x > y ? reversed : 0;
    });

    return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
};

/**
 * Sort object containing other objects by their property
 * @param objectOfObjects object with other objects to be sorted
 * @param sortedBy property of objects
 * @param reverse boolean value specifying reverse sorting
 * @returns object containing other objects sorted by specific property
 */
export const sortObjects = (objectOfObjects, sortedBy, reverse) => {
    let newObject = {};
    let sortedArray = sortObjectProperties(objectOfObjects, sortedBy, reverse);
    for (let i = 0; i < sortedArray.length; i++) {
        let key = sortedArray[i][0];
        let value = sortedArray[i][1];
        newObject[key] = value;
    }
    return newObject;
};
