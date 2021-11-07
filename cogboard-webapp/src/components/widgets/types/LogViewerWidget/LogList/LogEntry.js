import React, { useState } from 'react';
import {
  string,
  number,
  bool,
  shape,
  oneOfType,
  arrayOf,
  objectOf
} from 'prop-types';
import { AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  GridSchema,
  Text,
  CustomAccordion,
  VariableGridSchema
} from './styled';
import getGridTemplate from './helpers';

export default function LogEntry({ type, date, additionalData, variableData }) {
  const [expanded, setExpanded] = useState(false);

  const AdditionalData = ({ names }) => {
    const additionalDataNames = additionalData && Object.keys(additionalData);
    return (
      <div>
        {additionalDataNames.map((name, index) => (
          <Text key={index}>{names ? name : `${additionalData[name]}`}</Text>
        ))}
      </div>
    );
  };

  const VariablePart = ({ description }) => {
    const variableFieldsTemplate = getGridTemplate(variableData.template);
    const data = description ? variableData.description : variableData.headers;
    return (
      <VariableGridSchema template={variableFieldsTemplate}>
        {data?.map((text, index) => (
          <Text key={index}>{text}</Text>
        ))}
      </VariableGridSchema>
    );
  };

  return (
    <CustomAccordion expanded={expanded}>
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
          <AdditionalData names />
          <AdditionalData />
          <VariablePart description />
        </GridSchema>
      </AccordionDetails>
    </CustomAccordion>
  );
}

LogEntry.propTypes = {
  type: string,
  date: string.isRequired,
  additionalData: objectOf(oneOfType([string, number, bool])),
  variableData: shape({
    template: arrayOf(string).isRequired,
    headers: arrayOf(oneOfType([string, number, bool])).isRequired,
    description: arrayOf(oneOfType([string, number, bool])).isRequired
  })
};

LogEntry.defaultProps = {
  type: 'info',
  variableData: {
    template: [],
    headers: [],
    description: []
  },
  additionalData: {}
};
