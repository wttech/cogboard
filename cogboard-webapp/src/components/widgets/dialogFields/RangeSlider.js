import React from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const RangeSlider = ({ dataCy }) => {
  //TODO refactor needed
  const inputId = 'range-slider';
  const [value, setValue] = React.useState([57, 80]);

  const useStyles = makeStyles({
    root: {
      color: 'secondary'
    }
  });

  function valuetext(value) {
    return `${value}%`;
  }

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={useStyles.root}>
      <Typography id={inputId} gutterBottom>
        Range (%)
      </Typography>
      <Slider
        value={value}
        color={'secondary'}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        data-cy={dataCy}
        marks={marks}
        getAriaValueText={valuetext}
      />
    </div>
  );
};

export default RangeSlider;
