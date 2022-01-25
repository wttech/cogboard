import styled from '@emotion/styled/macro';
import { Virtuoso } from 'react-virtuoso';
import { COLORS } from '../../../../../constants';
import { Typography, Accordion, IconButton } from '@material-ui/core';
import logLevels from '../logLevels';

export const Container = styled.div`
  flex-grow: 1;
  display: grid;
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
  grid-template-columns: 70px 150px 1fr 56px;
  padding: 0 10px;
  justify-items: flex-start;
`;
export const VariableGridSchema = styled.div(
  props => `
    width: 100%;
    display: grid;
    justify-items: flex-start;
    align-items: flex-start;
    grid-template-columns: ${props.template};
    ${props.skipColumns ? 'grid-column: 3 / 4;' : ''}
  `
);

export const ColumnTitle = styled(Typography)`
  font-weight: 600;
  font-size: 0.85rem;
`;

export const Text = styled(Typography)(({ type }) => {
  let logTypeStyles = ``;
  if (type) {
    logTypeStyles = `
      font-weight: 500;
      color: ${logLevels[type.toLowerCase()]?.color || COLORS.WHITE};
    `;
  }

  return `
      user-select: auto;
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
  padding-top: 6px;
  height: 100%;
`;

export const StyledVirtuoso = styled(Virtuoso)`
  height: 100%;
`;

export const CustomAccordion = styled(Accordion)`
  margin: 0;
  box-shadow: none;

  &.MuiPaper-root {
    background-color: ${COLORS.LIGHT_SHADE};
    overflow: hidden;
  }
  &&.Mui-expanded {
    margin: 0;
  }

  .MuiAccordionSummary-root {
    padding: 0.25em;
    min-height: unset;
  }

  .MuiAccordionSummary-root .MuiIconButton-root {
    position: absolute;
    top: 0;
    right: 1em;
  }

  .MuiAccordionSummary-root,
  .MuiAccordionSummary-root .MuiButtonBase-root {
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

export const SimilarLogsButtonsContainer = styled.div`
  display: flex;
  justify-self: end;
  flex-direction: column;
  align-items: flex-end;
  margin: 8px 0;
  gap: 8px;
  box-sizing: border-box;
`;

export const FilterSimilarLogsButton = styled(IconButton)`
  background-color: ${COLORS.LIGHT_SHADE};
`;
FilterSimilarLogsButton.defaultProps = {
  size: 'small'
};

export const QuarantineSimilarLogsButton = styled(IconButton)`
  background-color: ${COLORS.RED};
  &:hover {
    background-color: ${COLORS.DARK_RED};
  }
`;
QuarantineSimilarLogsButton.defaultProps = {
  size: 'small'
};

export const StyledCopyButton = styled(IconButton)`
  position: absolute;
  &&&& {
    top: 0.1rem;
    right: -1.15rem;
  }
  padding: 0;
  font-size: 14px;

  visiblity: hidden;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
`;
StyledCopyButton.defaultProps = {
  size: 'small'
};

export const TextWithCopyButtonContainer = styled.div`
  position: relative;

  &:hover ${StyledCopyButton} {
    opacity: 1;
    visiblity: visible;
  }
`;

export const LogMargin = styled.div`
  padding: 1px 0;
`;
