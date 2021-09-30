import styled from '@emotion/styled/macro';
import { COLORS } from '../../../../../constants';
import { Typography, Accordion } from '@material-ui/core';

export const Container = styled.div`
  max-height: 100%;
  display: grid;
  padding-top: 76px;
  grid-template-rows: 34px 1fr;
`;

export const Header = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  border-left: none;
  border-right: none;

  padding: 6px 0;
`;

export const GridSchema = styled.div`
  display: grid;
  grid-template-columns: 70px 150px 190px 1fr;
  padding: 0 10px;
`;

export const ColumnTitle = styled(Typography)`
  font-weight: 600;
  font-size: 0.85rem;
`;

export const Text = styled(Typography)(props => {
  const getColor = type =>
    ({
      info: COLORS.WHITE,
      success: COLORS.GREEN,
      warn: COLORS.YELLOW,
      error: COLORS.RED
    }[type.toLowerCase()]);

  return `
      font-size: 0.8rem;
      ${props.type &&
        `
        font-weight: 500;
        color: ${getColor(props.type)};
      `}
    `;
});

export const LogsWrapper = styled.div`
  padding: 6px 0;
  overflow-y: auto;
  height: 100%;
`;

export const CustomAccordion = styled(Accordion)`
  margin: 2px 0;

  &.MuiPaper-root {
    background-color: rgba(255, 255, 255, 0.1);
  }
  &.Mui-expanded {
    margin: 8px 0;
  }

  .MuiAccordionSummary-root {
    padding: 4px;
    min-height: unset;
  }

  .MuiButtonBase-root .MuiIconButton-root {
    position: absolute;
    top: 0;
    right: 16px;
  }

  .MuiButtonBase-root {
    padding: unset;
  }

  .MuiAccordionSummary-content {
    margin: 0;
    padding: 4px 0;
  }
  .MuiAccordionSummary-content.Mui-expanded {
    min-height: unset;
  }

  .MuiAccordionDetails-root {
    padding: 4px 0;
    background-color: rgba(0, 0, 0, 0.15);
  }
`;
