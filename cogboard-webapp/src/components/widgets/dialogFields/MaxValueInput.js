import React from 'react';
import { TextField } from '@material-ui/core';
import { ZABBIX_METRICS_WITH_PROGRESS, ZABBIX_METRICS_WITH_MAX_VALUE } from '../../../constants';

const MaxValueInput = ({ error, values, label, dataCy, ...other }) => {
  const selectedMetric = values.selectedZabbixMetric;

  const checkMetricHasProgress = () => ZABBIX_METRICS_WITH_PROGRESS.includes(selectedMetric);
  const checkMetricHasMaxValue = () => ZABBIX_METRICS_WITH_MAX_VALUE.includes(selectedMetric);

  return (
    <>
      {(checkMetricHasProgress() && checkMetricHasMaxValue()) && (
        <TextField
          InputLabelProps={{
            shrink: true
          }}
          label={ `${label} (GB)` }
          margin="normal"
          type="number"
          FormHelperTextProps={{ component: 'div' }}
          inputProps={{ 
            'data-cy': dataCy,
            min: "0",
            step: "1"
          }}
          { ...other }
        />
      )}
    </>
  );
};

export default MaxValueInput;
