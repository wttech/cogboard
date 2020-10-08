import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { prepareChangeEvent } from './helpers';

const zabbixMetrics = { // temporary solution - we need metrics names
  withProgress: [
    'system.cpu.util[,idle]',
    'vm.memory.size[available]',
    'system.swap.size[,used]',
    'jmx[\\"java.lang:type=Memory\\",\\"HeapMemoryUsage.used\\"]',
    'vfs.fs.size[/,used]'
  ],
  withoutMaxValue: [
    'system.cpu.util[,idle]'
  ]
};

const MaxValueInput = ({ error, value, values, label, dataCy, onChange, ...other }) => {
  const [selectedMetric, setSelectedMetric] = useState(values.selectedZabbixMetric);

  useEffect(() => {
    setSelectedMetric(values.selectedZabbixMetric);
  }, [values])

  useEffect(() => {
    if ((!checkMetricHasProgress() || checkMetricHasMaxValue()) && value !== 0) {
      console.log('send onchange');
      onChange(
        prepareChangeEvent(0, 'number')
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMetric])

  const checkMetricHasProgress = () => zabbixMetrics.withProgress.includes(selectedMetric);
  const checkMetricHasMaxValue = () => zabbixMetrics.withoutMaxValue.includes(selectedMetric);

  return (
    <>
      {(checkMetricHasProgress() && !checkMetricHasMaxValue()) && (
        <TextField
          InputLabelProps={{
            shrink: true
          }}
          label={ `${label} (GB)` }
          margin="normal"
          type="number"
          value={value}
          onChange={ onChange }
          FormHelperTextProps={{ component: 'div' }}
          inputProps={{ 'data-cy': dataCy, min: "0", step: "1" }}
          { ...other }
        />
      )}
    </>
  );
};

export default MaxValueInput;
