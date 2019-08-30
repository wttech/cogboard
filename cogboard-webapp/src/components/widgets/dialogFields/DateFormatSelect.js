import React from 'react';

import {MenuItem} from '@material-ui/core';
import DropdownField from '../../DropdownField';

const DateFormatSelect = props => {
    return (
        <DropdownField {...props}>
            {dateFormats => dateFormats.map(dateFormat =>
                <MenuItem key={dateFormat.value} value={dateFormat.value}>{dateFormat.display}</MenuItem>
            )}
        </DropdownField>
    );
};

export default DateFormatSelect;