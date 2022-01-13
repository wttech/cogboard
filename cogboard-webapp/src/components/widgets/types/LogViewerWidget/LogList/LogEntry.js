import React, { useContext } from 'react';
import {
  string,
  number,
  bool,
  shape,
  oneOfType,
  arrayOf,
  func
} from 'prop-types';
import { getGridTemplate, highlightText } from './helpers';
import { AccordionSummary, AccordionDetails, Tooltip } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  GridSchema,
  Text,
  CustomAccordion,
  VariableGridSchema,
  HighlightedText,
  HighlightMark,
  SimilarLogsButtonsContainer,
  FilterSimilarLogsButton,
  QuarantineSimilarLogsButton,
  LogMargin
} from './styled';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../../../../../selectors';
import { FilterList, Schedule } from '@material-ui/icons';
import { SimilarLogsContext } from '../context';
import TextWithCopyButton from './TextWithCopyButton';

const LogEntry = ({
  id,
  expanded,
  toggleExpanded,
  type,
  date,
  variableData,
  template,
  search,
  highlight
}) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const similarLogs = useContext(SimilarLogsContext);

  const getLastVariableHeader = () =>
    variableData[variableData.length - 1]?.header ?? '';

  const VariablePart = ({ description }) => {
    const variableFieldsTemplate = getGridTemplate(template);
    return (
      <VariableGridSchema
        template={variableFieldsTemplate}
        skipColumns={description}
        data-cy="log-variable-data"
      >
        {variableData.map((entry, index) => {
          const entryText = description ? entry.description : entry.header;
          return (
            <TextWithCopyButton
              key={index}
              text={highlightText(entryText, search, HighlightedText)}
            />
          );
        })}
      </VariableGridSchema>
    );
  };

  return (
    <LogMargin>
      <CustomAccordion key={id} expanded={expanded} data-cy="log-entry">
        <AccordionSummary
          onClick={toggleExpanded}
          expandIcon={expanded && <ExpandMoreIcon />}
        >
          {highlight && <HighlightMark data-cy="highlight-mark" />}
          <GridSchema>
            <Text type={type} data-cy="log-entry-level">
              {type?.toUpperCase()}
            </Text>
            <TextWithCopyButton text={date} data-cy="log-entry-data" />
            <VariablePart />
          </GridSchema>
        </AccordionSummary>
        <AccordionDetails>
          <GridSchema>
            <VariablePart description />
            <SimilarLogsButtonsContainer>
              <Tooltip title="Filter similar logs" placement="left">
                <FilterSimilarLogsButton
                  onClick={() => similarLogs.setFilter(getLastVariableHeader())}
                >
                  <FilterList />
                </FilterSimilarLogsButton>
              </Tooltip>
              {isAuthenticated && (
                <Tooltip
                  title="Add similar logs to quarantine"
                  placement="left"
                >
                  <QuarantineSimilarLogsButton
                    onClick={() =>
                      similarLogs.setQuarantine(getLastVariableHeader())
                    }
                  >
                    <Schedule />
                  </QuarantineSimilarLogsButton>
                </Tooltip>
              )}
            </SimilarLogsButtonsContainer>
          </GridSchema>
        </AccordionDetails>
      </CustomAccordion>
    </LogMargin>
  );
};

export default LogEntry;

LogEntry.propTypes = {
  id: string.isRequired,
  expanded: bool.isRequired,
  toggleExpanded: func,
  type: string,
  date: string.isRequired,
  variableData: arrayOf(
    shape({
      header: oneOfType([string, number, bool]).isRequired,
      description: oneOfType([string, number, bool]).isRequired
    })
  ),
  template: arrayOf(string),
  search: string,
  highlight: bool
};

LogEntry.defaultProps = {
  toggleExpanded: () => {},
  type: 'info',
  variableData: [],
  template: [],
  search: undefined,
  highlight: false
};
