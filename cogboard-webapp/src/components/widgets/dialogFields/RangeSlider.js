import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { Typography, FormControl, Input } from '@material-ui/core';
import { prepareChangeEvent } from './helpers';
import { StyledRangeSliderForm } from './styled';

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

const RangeSlider = ({ value, values, onChange }) => {
  const [maxValue, setMaxValue] = useState('');
  const [rangeValue, setRangeValue] = React.useState(value);
  const widgetZabbixMetric = values.selectedZabbixMetric;
  const marks = [
    {
      value: 0,
      label: '0%'
    },
    {
      value: 100,
      label: '100%'
    }
  ];

  const handleChangeMaxValue = event => setMaxValue(event.target.value);
  const handleChange = (_, newValue) => setRangeValue(newValue);
  const handleChangeCommited = (_, newValue) => {
    onChange(prepareChangeEvent(newValue, 'array'));
  }

  const checkMetricHasProgress = () => zabbixMetrics.withProgress.includes(widgetZabbixMetric);
  const checkMetricHasMaxValue = () => zabbixMetrics.withoutMaxValue.includes(widgetZabbixMetric);

  const valuetext = (value) => {
    return `${value}%`;
  }

  return (
    <>
      {checkMetricHasProgress() && (
        <StyledRangeSliderForm>
          {checkMetricHasMaxValue() && (
            <FormControl>
              <Typography variant="caption">
                Max value
              </Typography>
              <Input
                data-cy="max-value"
                onChange={handleChangeMaxValue}
                value={maxValue}
              />
            </FormControl>
          )}
          <Typography variant="caption">
            Range (%)
          </Typography>
          <Slider
            value={rangeValue}
            onChange={handleChange}
            onChangeCommitted={handleChangeCommited}
            valueLabelDisplay="auto"
            marks={marks}
            getAriaValueText={valuetext}
          />
        </StyledRangeSliderForm>
      )}
    </>
  );
};

export default RangeSlider;
