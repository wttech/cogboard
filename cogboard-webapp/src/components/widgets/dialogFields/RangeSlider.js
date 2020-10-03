import React from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { prepareChangeEvent } from './helpers';
import { StyledRangeSliderForm } from './styled';

const RangeSlider = ({ value, onChange }) => {
  const [rangeValue, setRangeValue] = React.useState(value);

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

  const handleChange = (_, newValue) => setRangeValue(newValue);
  const handleChangeCommited = (_, newValue) => {
    onChange(prepareChangeEvent(newValue, 'array'));
  }

  const valuetext = (value) => {
    return `${value}%`;
  }

  return (
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
  );
};

export default RangeSlider;
