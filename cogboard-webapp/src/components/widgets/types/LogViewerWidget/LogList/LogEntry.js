import React, { useState, useContext } from 'react';
import { string, number, bool, shape, oneOfType, arrayOf } from 'prop-types';
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
  QuarantineSimilarLogsButton
} from './styled';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../../../../../selectors';
import { FilterList, Schedule } from '@material-ui/icons';
import { SimilarLogsContext } from '../context';

const LogEntry = ({
  type,
  date,
  variableData,
  template,
  search,
  highlight
}) => {
  const [expanded, setExpanded] = useState(false);
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
            <Text key={index}>
              {highlightText(entryText, search, HighlightedText)}
            </Text>
          );
        })}
      </VariableGridSchema>
    );
  };

  return (
    <CustomAccordion expanded={expanded} data-cy="log-entry">
      <AccordionSummary
        onClick={() => setExpanded(!expanded)}
        expandIcon={expanded && <ExpandMoreIcon />}
      >
        {highlight && <HighlightMark />}
        <GridSchema>
          <Text type={type} data-cy="log-entry-level">
            {type?.toUpperCase()}
          </Text>
          <Text data-cy="log-entry-data">{date}</Text>
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
              <Tooltip title="Add similar logs to quarantine" placement="left">
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
  );
};

export default LogEntry;

LogEntry.propTypes = {
  type: string,
  date: string.isRequired,
  variableData: arrayOf(
    shape({
      header: oneOfType([string, number, bool]).isRequired,
      description: oneOfType([string, number, bool]).isRequired
    })
  )
};

LogEntry.defaultProps = {
  type: 'info',
  date: '0',
  variableData: []
};
