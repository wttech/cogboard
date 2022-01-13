import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLogsViewerLog } from '../../../../../actions/actionCreators';
import { getIsAuthenticated } from '../../../../../selectors';
import {
  string,
  number,
  bool,
  shape,
  oneOfType,
  arrayOf,
  func
} from 'prop-types';
import { SimilarLogsContext } from '../context';
import { getGridTemplate, highlightText } from './helpers';

import { AccordionSummary, AccordionDetails, Tooltip } from '@material-ui/core';
import { FilterList, Schedule, ExpandMore } from '@material-ui/icons';
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
import TextWithCopyButton from './TextWithCopyButton';

const LogEntry = ({
  wid,
  onToggle,
  id,
  type,
  date,
  variableData,
  template,
  search,
  highlight
}) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const similarLogs = useContext(SimilarLogsContext);

  const expandedList =
    useSelector(store => store.widgets.logsViewersCache[wid]?.expandedLogs) ||
    [];
  const isExpanded = expandedList.includes(id);

  const toggleExpanded = () => {
    dispatch(toggleLogsViewerLog({ wid, logid: id }));
    onToggle();
  };

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
      <CustomAccordion
        key={id}
        expanded={isExpanded}
        data-cy="log-entry"
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary
          onClick={toggleExpanded}
          expandIcon={isExpanded && <ExpandMore />}
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
  wid: string.isRequired,
  id: string.isRequired,
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
  highlight: bool,
  onToggle: func
};

LogEntry.defaultProps = {
  onToggle: () => {},
  type: 'info',
  variableData: [],
  template: [],
  search: undefined,
  highlight: false
};
