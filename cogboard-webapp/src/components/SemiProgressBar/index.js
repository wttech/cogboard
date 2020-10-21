import React from "react";
import PropTypes from "prop-types";
import { StyledSemiCircleContainer, StyledPercentageText } from './styled';

const SemiCircleProgress = ({
  stroke,
  strokeWidth,
  background,
  diameter,
  showPercentValue,
  percentage,
  text
}) => {
  const coordinateForCircle = diameter / 2;
  const radius = (diameter - 2 * strokeWidth) / 2;
  const circumference = Math.PI * radius;

  const setPercentageValue = () => {
    let percentageValue;

    if (percentage > 100) {
      percentageValue = 100;
    } else if (percentage < 0) {
      percentageValue = 0;
    } else {
      percentageValue = percentage;
    }

    return percentageValue;
  }

  const semiCirclePercentage = setPercentageValue() * (circumference / 100);

  return (
    <StyledSemiCircleContainer>
      <svg
        width={ diameter }
        height={ diameter / 2 }
      >
        <circle
          cx={coordinateForCircle}
          cy={coordinateForCircle}
          r={radius}
          fill="none"
          stroke={background}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: circumference
          }}
        />
        <circle
          cx={coordinateForCircle}
          cy={coordinateForCircle}
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: semiCirclePercentage,
            transition:
              "stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s"
          }}
        />
      </svg>
      {showPercentValue && (
        <StyledPercentageText>
          {text ? `${text}GB/(${percentage}%)` : `${percentage}%`}
        </StyledPercentageText>
      )}
    </StyledSemiCircleContainer>
  );
};

SemiCircleProgress.propTypes = {
  strokeWidth: PropTypes.number,
  diameter: PropTypes.number,
  showPercentValue: PropTypes.bool,
  stroke: PropTypes.string,
  background: PropTypes.string,
  text: PropTypes.number
};

SemiCircleProgress.defaultProps = {
  strokeWidth: 10,
  diameter: 200,
  showPercentValue: false,
  stroke: "#02B732",
  background: "#D0D0CE",
};

export default SemiCircleProgress;
