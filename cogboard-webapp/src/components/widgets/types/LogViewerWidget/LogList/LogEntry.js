import React from 'react';
import { AccordionSummary, AccordionDetails } from '@material-ui/core';
import { GridSchema, Text, CustomAccordion } from './styled';

export default function LogEntry() {
  return (
    <CustomAccordion>
      <AccordionSummary>
        <GridSchema>
          <Text>INFO</Text>
          <Text>2021-04-22 14:08:37</Text>
          <Text>mongodb.log</Text>
          <Text>
            {'Expected corresponding JSX closing tag for <GridSchemaa>.'}
          </Text>
        </GridSchema>
      </AccordionSummary>
      <AccordionDetails>
        <GridSchema>
          <div></div>
          <div>
            <Text>ID</Text>
            <Text>Type</Text>
            <Text>IP address</Text>
            <Text>Port</Text>
          </div>
          <div>
            <Text>123456</Text>
            <Text>sys</Text>
            <Text>127.0.0.1</Text>
            <Text>27017</Text>
          </div>
          <Text>
            {
              'SyntaxError: /Users/celmer/Documents/js/cogboard/cogboard-webapp/src/components/widgets/types/LogViewerWidget/LogList/index.js: Expected corresponding JSX closing tag for <GridSchemaa>. (21:6) SyntaxError: /Users/celmer/Documents/js/cogboard/cogboard-webapp/src/components/widgets/types/LogViewerWidget/LogList/index.js: Expected corresponding JSX closing tag for <GridSchemaa>. (21:6) SyntaxError: /Users/celmer/Documents/js/cogboard/cogboard-webapp/src/components/widgets/types/LogViewerWidget/LogList/index.js: Expected corresponding JSX closing tag for <GridSchemaa>. (21:6) SyntaxError: /Users/celmer/Documents/js/cogboard/cogboard-webapp/src/components/widgets/types/LogViewerWidget/LogList/index.js: Expected corresponding JSX closing tag for <GridSchemaa>. (21:6)'
            }
          </Text>
        </GridSchema>
      </AccordionDetails>
    </CustomAccordion>
  );
}
