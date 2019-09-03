import React from 'react';
import {FormControl, MenuItem} from '@material-ui/core';
import DropdownField from '../../DropdownField';
import {GMT_TIMEZONES} from "../../../constants";

const TimeZoneSelect = props => {

    const dropdownItems = GMT_TIMEZONES();

    return (
        <FormControl margin="normal">
            <DropdownField dropdownItems={dropdownItems} {...props} >
                {timeZones => timeZones.map(timeZone =>
                    <MenuItem key={timeZone.value} value={timeZone.value}>{timeZone.display}</MenuItem>
                )}
            </DropdownField>
        </FormControl>
    );
};

export default TimeZoneSelect;