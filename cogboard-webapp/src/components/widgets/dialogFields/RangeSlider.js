import React, { useState, useEffect } from 'react';
import Slider from '@material-ui/core/Slider';
import { Typography} from '@material-ui/core';
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
  const [rangeValue, setRangeValue] = useState(() => {
    if (value.length === 0) {
      return [20, 60];
    }

    return value
  });
  const [selectedMetric, setSelectedMetric] = useState(values.selectedZabbixMetric);

  useEffect(() => {
    setSelectedMetric(values.selectedZabbixMetric);
  }, [values])

  useEffect(() => {
    if (!checkMetricHasProgress() && value.length !== 0) {
      onChange(
        prepareChangeEvent([], 'array')
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMetric])

  const handleChange = (_, newValue) => setRangeValue(newValue);
  const handleChangeCommited = (_, newValue) => {
    onChange(
      prepareChangeEvent(newValue, 'array')
    );
  }

  const checkMetricHasProgress = () => zabbixMetrics.withProgress.includes(selectedMetric);

  const valuetext = (value) => {
    return `${value}%`;
  }

  return (
    <>
      {checkMetricHasProgress() && (
        <StyledRangeSliderForm>
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
