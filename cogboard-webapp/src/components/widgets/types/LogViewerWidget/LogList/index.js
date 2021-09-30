import React from 'react';
import LogEntry from './LogEntry';
import {
  Container,
  Header,
  GridSchema,
  ColumnTitle,
  LogsWrapper,
  VariableGridSchema
} from './styled';
import { getGridTemplate } from './helpers';

const testLogTemplate = ['Provider', 'Message'];
const testData = {
  date: '2021-04-22 14:08:37',
  additionalData: {
    ID: '123456',
    Type: 'sys',
    'IP address': '127.0.0.1',
    Port: '27017'
  },
  variableData: {
    template: testLogTemplate,
    header: [
      'mongodb.log',
      'Expected corresponding JSX closing tag for <GridSchemaa>.'
    ],
    description: [
      'provider desc',
      'SyntaxError: /Users/celmer/Documents/js/cogboard/cogboard-webapp/src/components/widgets/types/LogViewerWidget/LogList/index.js: Expected corresponding JSX closing tag for <GridSchemaa>. (21:6) SyntaxError: /Users/celmer/Documents/js/cogboard/cogboard-webapp/src/components/widgets/types/LogViewerWidget/LogList/index.js: Expected corresponding JSX closing tag for <GridSchemaa>. (21:6) SyntaxError: /Users/celmer/Documents/js/cogboard/cogboard-webapp/src/components/widgets/types/LogViewerWidget/LogList/index.js: Expected corresponding JSX closing tag for <GridSchemaa>. (21:6) SyntaxError: /Users/celmer/Documents/js/cogboard/cogboard-webapp/src/components/widgets/types/LogViewerWidget/LogList/index.js: Expected corresponding JSX closing tag for <GridSchemaa>. (21:6)'
    ]
  }
};

export default function LogList() {
  const VariableLogListHeader = () => (
    <VariableGridSchema template={getGridTemplate(testLogTemplate)}>
      {testLogTemplate.map((name, index) => (
        <ColumnTitle key={index}>{name}</ColumnTitle>
      ))}
    </VariableGridSchema>
  );

  return (
    <Container>
      <Header>
        <GridSchema>
          <ColumnTitle>Level</ColumnTitle>
          <ColumnTitle>Date</ColumnTitle>
          <VariableLogListHeader />
        </GridSchema>
      </Header>

      <LogsWrapper>
        {/* static presentation */}
        <LogEntry
          type="info"
          date={testData.date}
          additionalData={testData.additionalData}
          variableData={testData.variableData}
        />
        <LogEntry
          type="warn"
          date={testData.date}
          additionalData={testData.additionalData}
          variableData={testData.variableData}
        />
        <LogEntry
          type="error"
          date={testData.date}
          additionalData={testData.additionalData}
          variableData={testData.variableData}
        />
        <LogEntry
          type="success"
          date={testData.date}
          additionalData={testData.additionalData}
          variableData={testData.variableData}
        />
        <LogEntry
          date={testData.date}
          additionalData={testData.additionalData}
          variableData={testData.variableData}
        />
        <LogEntry type="error" date={testData.date} />
        <LogEntry
          type="info"
          date={testData.date}
          additionalData={testData.additionalData}
          variableData={testData.variableData}
        />
        <LogEntry
          type="warn"
          date={testData.date}
          additionalData={testData.additionalData}
          variableData={testData.variableData}
        />
        <LogEntry
          type="error"
          date={testData.date}
          additionalData={testData.additionalData}
          variableData={testData.variableData}
        />
        <LogEntry
          type="success"
          date={testData.date}
          additionalData={testData.additionalData}
          variableData={testData.variableData}
        />
      </LogsWrapper>
    </Container>
  );
}
