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
  HighlightMark
} from './styled';

export default function LogEntry({
  type,
  date,
  variableData,
  template,
  search,
  highlight
}) {
  const [expanded, setExpanded] = useState(false);

  const VariablePart = ({ description }) => {
    const variableFieldsTemplate = getGridTemplate(template);
    return (
      <VariableGridSchema
        template={variableFieldsTemplate}
        skipColumns={description}
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
    <CustomAccordion expanded={expanded}>
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
        <GridSchema>
          <VariablePart description />
        </GridSchema>
      </AccordionDetails>
    </CustomAccordion>
  );
}

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
