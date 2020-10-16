import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { Typography } from '@material-ui/core';
import { prepareChangeEvent } from './helpers';
import { StyledRangeSliderForm } from './styled';
import { ZABBIX_METRICS_WITH_PROGRESS } from '../../../constants';

const RangeSlider = ({ value, values, onChange }) => {
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
  const [rangeValue, setRangeValue] = useState(value);

  const handleChange = (_, newValue) => setRangeValue(newValue);
  const handleChangeCommited = (_, newValue) => {
    onChange(prepareChangeEvent(newValue, 'array'));
  };

  const checkMetricHasProgress = () =>
    ZABBIX_METRICS_WITH_PROGRESS.includes(widgetZabbixMetric);

  const valuetext = value => {
    return `${value}%`;
  };

  return (
    <>
      {checkMetricHasProgress() && (
        <StyledRangeSliderForm
          startRangeValue={rangeValue[0]}
          endRangeValue={rangeValue[1]}
        >
          <Typography variant="caption">Range (%)</Typography>
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
