import React from 'react';
import { TextField } from '@material-ui/core';
import { ZABBIX_METRICS_WITH_PROGRESS, ZABBIX_METRICS_WITH_MAX_VALUE } from '../../../constants';
import { prepareChangeEvent } from './helpers';

const MaxValueInput = ({ error, values, label, dataCy, onChange, ...other }) => {
  const selectedMetric = values.selectedZabbixMetric;

  const checkMetricHasProgress = () => ZABBIX_METRICS_WITH_PROGRESS.includes(selectedMetric);
  const checkMetricHasMaxValue = () => ZABBIX_METRICS_WITH_MAX_VALUE.includes(selectedMetric);

  const handleChange = (evt) => {
    const formattedValue = evt.target.value ? parseFloat(evt.target.value.replace(/,/g, '')) : '0';
    onChange(prepareChangeEvent(parseInt(formattedValue), 'number'));
  }

  return (
    <>
      {(checkMetricHasProgress() && checkMetricHasMaxValue()) && (
        <TextField
          InputLabelProps={{
            shrink: true
          }}
          label={ `${label} (GB)` }
          margin="normal"
          onChange={handleChange}
          FormHelperTextProps={{ component: 'div' }}
          inputProps={{
            'data-cy': dataCy,
          }}
          { ...other }
        />
      )}
    </>
  );
};

export default MaxValueInput;
