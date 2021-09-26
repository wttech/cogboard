import styled from '@emotion/styled/macro';
import { Typography, Accordion } from '@material-ui/core';

export const Container = styled.div`
  max-height: 100%;
  display: grid;
  padding-top: 20px;
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

export const Text = styled(Typography)`
  font-size: 0.8rem;
`;

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

  .MuiButtonBase-root {
    padding-left: unset;
    padding-right: unset;
  }
  .MuiAccordionSummary-content {
    margin: 0;
  }
  .MuiAccordionSummary-content.Mui-expanded {
    min-height: unset;
  }

  .MuiAccordionDetails-root {
    padding: 0 0 4px 0;
  }
`;
