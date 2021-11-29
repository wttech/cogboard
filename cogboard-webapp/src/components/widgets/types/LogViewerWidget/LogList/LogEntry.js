import React, { useState } from 'react';
import { string, number, bool, shape, oneOfType, arrayOf } from 'prop-types';
import { getGridTemplate } from './helpers';
import { AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  GridSchema,
  Text,
  CustomAccordion,
  VariableGridSchema,
  HighlightedAccordion
} from './styled';

export default function LogEntry({
  type,
  date,
  variableData,
  template,
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
        {variableData.map((entry, index) => (
          <Text key={index}>
            {description ? entry.description : entry.header}
          </Text>
        ))}
      </VariableGridSchema>
    );
  };

  const SelectedAccordion = highlight ? HighlightedAccordion : CustomAccordion;

  return (
    <SelectedAccordion expanded={expanded}>
      <AccordionSummary
        onClick={() => setExpanded(!expanded)}
        expandIcon={expanded && <ExpandMoreIcon />}
      >
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
    </SelectedAccordion>
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
