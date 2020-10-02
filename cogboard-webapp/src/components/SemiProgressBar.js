import React from "react";
import PropTypes from "prop-types";

import styled from '@emotion/styled/macro';

export const StyledSemiCircleContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  svg {
    transform: rotateY(180deg);
    overflow: hidden
  }
`;

const SemiCircleProgress = ({
  stroke = "#02B732",
  strokeWidth,
  background = "#D0D0CE",
  diameter,
  showPercentValue,
  percentage
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
        <span
          className="semicircle-percent-value"
          style={{
            width: "100%",
            left: "0",
            textAlign: "center",
            bottom: "0",
            position: "absolute"
          }}
        >
          {percentage}%
        </span>
      )}
    </StyledSemiCircleContainer>
  );
};

SemiCircleProgress.propTypes = {
  strokeWidth: PropTypes.number,
  diameter: PropTypes.number,
  showPercentValue: PropTypes.bool
};

SemiCircleProgress.defaultProps = {
  strokeWidth: 10,
  diameter: 200,
  showPercentValue: false
};

export default SemiCircleProgress;
