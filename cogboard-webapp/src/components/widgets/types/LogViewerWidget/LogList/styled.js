import styled from '@emotion/styled/macro';
import { COLORS } from '../../../../../constants';
import { Typography, Accordion } from '@material-ui/core';
import logLevels from '../logLevels';

export const Container = styled.div`
  max-height: 100%;
  display: grid;
  padding-top: 6em;
  grid-template-rows: auto 1fr;
`;

export const Header = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  border-left: none;
  border-right: none;
  padding: 0.25em 0;
`;

export const GridSchema = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 70px 150px 1fr;
  padding: 0 10px;
`;
export const VariableGridSchema = styled.div(
  props => `
    width: 100%;
    display: grid;
    grid-template-columns: ${props.template};
    ${props.skipColumns ? 'grid-column: 3 / 4' : ''}
  `
);

export const ColumnTitle = styled(Typography)`
  font-weight: 600;
  font-size: 0.85rem;
`;

export const Text = styled(Typography)(({ type }) => {
  let logTypeStyles = ``;
  if (type) {
    const logLevel = logLevels.find(
      level => level.value === type?.toLowerCase()
    );
    logTypeStyles = `
      font-weight: 500;
      color: ${logLevel?.color || COLORS.WHITE};
    `;
  }

  return `
      line-height: 19px;
      font-size: 0.8rem;
      font-weight: 400;
      ${logTypeStyles}
    `;
});

export const HighlightedText = styled.span`
  color: ${COLORS.BLACK};
  background-color: ${COLORS.YELLOW};
`;

export const LogsWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  padding: 6px 0;
  overflow-y: auto;
  height: 100%;
`;

export const CustomAccordion = styled(Accordion)`
  margin: 2px 0;

  &.MuiPaper-root {
    background-color: ${COLORS.LIGHT_SHADE};
    overflow: hidden;
  }
  &.Mui-expanded {
    margin: 0.5em 0;
  }

  .MuiAccordionSummary-root {
    padding: 0.25em;
    min-height: unset;
  }

  .MuiButtonBase-root .MuiIconButton-root {
    position: absolute;
    top: 0;
    right: 1em;
  }

  .MuiButtonBase-root {
    padding: unset;
  }

  .MuiAccordionSummary-content {
    margin: 0;
    padding: 0.25em 0;
  }
  .MuiAccordionSummary-content.Mui-expanded {
    min-height: unset;
  }

  .MuiAccordionDetails-root {
    padding: 0.25em 0;
    background-color: ${COLORS.DARK_SHADE};
  }
`;

export const HighlightMark = styled.div`
  position: absolute;
  left: -0.6rem;
  top: -0.7rem;
  height: 1.7rem;
  width: 1rem;
  transform: rotate(45deg);
  background-color: ${COLORS.YELLOW};
`;
