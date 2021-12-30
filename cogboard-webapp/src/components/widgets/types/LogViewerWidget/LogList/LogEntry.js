import React, { useState } from 'react';
import { string, number, bool, shape, oneOfType, arrayOf } from 'prop-types';
import { getGridTemplate, highlightText } from './helpers';
import { AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  GridSchema,
  Text,
  CustomAccordion,
  VariableGridSchema,
  HighlightedText,
  HighlightMark,
  VerticalStack,
  SimilarLogsButtonsContainer,
  SimilarLogsButton
} from './styled';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../../../../../selectors';

const LogEntry = ({
  type,
  date,
  variableData,
  template,
  search,
  highlight,
  setFilterSimilarLogs,
  setQuarantineSimilarLogs
}) => {
  const [expanded, setExpanded] = useState(false);
  const isAuthenticated = useSelector(getIsAuthenticated);

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
          <Text type={type}>{type?.toUpperCase()}</Text>
          <Text>{date}</Text>
          <VariablePart />
        </GridSchema>
      </AccordionSummary>
      <AccordionDetails>
        <VerticalStack>
          <GridSchema>
            <VariablePart description />
          </GridSchema>
          <SimilarLogsButtonsContainer>
            <SimilarLogsButton
              variant="outlined"
              size="small"
              onClick={() => setFilterSimilarLogs(getLastVariableHeader())}
            >
              Filter similar logs
            </SimilarLogsButton>
            {isAuthenticated && (
              <SimilarLogsButton
                variant="outlined"
                size="small"
                onClick={() =>
                  setQuarantineSimilarLogs(getLastVariableHeader())
                }
              >
                Add similar logs to quarantine
              </SimilarLogsButton>
            )}
          </SimilarLogsButtonsContainer>
        </VerticalStack>
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
