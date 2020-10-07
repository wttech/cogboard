import React, { useState } from 'react';
import { Typography, FormControl, Input } from '@material-ui/core';
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

const MaxValueInput = ({ value, values, onChange }) => {
  const widgetZabbixMetric = values.selectedZabbixMetric;
  const [maxValue, setMaxValue] = useState(value);

  const handleChangeMaxValue = event => {
    setMaxValue(event.target.value);
    onChange(
      prepareChangeEvent(event.target.value, 'string')
    );
  };

  const checkMetricHasMaxValue = () => zabbixMetrics.withoutMaxValue.includes(widgetZabbixMetric);

  return (
    <>
      {!checkMetricHasMaxValue() && (
        <FormControl>
          <Typography variant="caption">
            Max value { widgetZabbixMetric === 'vm.memory.size[available]' ? '(GB)' : ''}
          </Typography>
          <Input
            data-cy="max-value"
            onChange={handleChangeMaxValue}
            value={maxValue}
          />
        </FormControl>
      )}
    </>
  );
};

export default MaxValueInput;
