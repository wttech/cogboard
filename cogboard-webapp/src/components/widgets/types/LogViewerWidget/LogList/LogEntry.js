import React, { useState } from 'react';
import { string, number, bool, objectOf, oneOfType } from 'prop-types';
import { AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { GridSchema, Text, CustomAccordion } from './styled';

export default function LogEntry({
  type,
  date,
  provider,
  shortMsg,
  fullMsg,
  additionalData
}) {
  const [expanded, setExpanded] = useState(false);

  const additionalDataNames = additionalData && Object.keys(additionalData);

  return (
    <CustomAccordion expanded={expanded}>
      <AccordionSummary
        onClick={() => setExpanded(!expanded)}
        expandIcon={expanded && <ExpandMoreIcon />}
      >
        <GridSchema>
          <Text type={type}>{type?.toUpperCase()}</Text>
          <Text>{date}</Text>
          <Text>{provider}</Text>
          <Text>{shortMsg}</Text>
        </GridSchema>
      </AccordionSummary>
      <AccordionDetails>
        <GridSchema>
          <div></div> {/* first column empty */}
          <div>
            {additionalDataNames.map((name, index) => (
              <Text key={index}>{name}</Text>
            ))}
          </div>
          <div>
            {additionalDataNames.map((name, index) => (
              <Text key={index}>{`${additionalData[name]}`}</Text>
            ))}
          </div>
          <Text>{fullMsg}</Text>
        </GridSchema>
      </AccordionDetails>
    </CustomAccordion>
  );
}

LogEntry.propTypes = {
  type: string,
  date: string.isRequired,
  provider: string,
  shortMsg: string,
  fullMsg: string,
  additionalData: objectOf(oneOfType([string, number, bool]))
};

LogEntry.defaultProps = {
  type: 'info',
  provider: '',
  shortMsg: '',
  fullMsg: '',
  additionalData: {}
};
