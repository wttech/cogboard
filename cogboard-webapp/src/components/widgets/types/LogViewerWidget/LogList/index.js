import React from 'react';
import LogEntry from './LogEntry';
import {
  Container,
  Header,
  GridSchema,
  ColumnTitle,
  LogsWrapper
} from './styled';

const testData = {
  date: '2021-04-22 14:08:37',
  provider: 'mongodb.log',
  fullMsg:
    'SyntaxError: /Users/celmer/Documents/js/cogboard/cogboard-webapp/src/components/widgets/types/LogViewerWidget/LogList/index.js: Expected corresponding JSX closing tag for <GridSchemaa>. (21:6) SyntaxError: /Users/celmer/Documents/js/cogboard/cogboard-webapp/src/components/widgets/types/LogViewerWidget/LogList/index.js: Expected corresponding JSX closing tag for <GridSchemaa>. (21:6) SyntaxError: /Users/celmer/Documents/js/cogboard/cogboard-webapp/src/components/widgets/types/LogViewerWidget/LogList/index.js: Expected corresponding JSX closing tag for <GridSchemaa>. (21:6) SyntaxError: /Users/celmer/Documents/js/cogboard/cogboard-webapp/src/components/widgets/types/LogViewerWidget/LogList/index.js: Expected corresponding JSX closing tag for <GridSchemaa>. (21:6)',
  shortMsg: 'Expected corresponding JSX closing tag for <GridSchemaa>.',
  additionalData: {
    ID: '123456',
    Type: 'sys',
    'IP address': '127.0.0.1',
    Port: '27017'
  }
};

export default function LogList() {
  return (
    <Container>
      <Header>
        <GridSchema>
          <ColumnTitle>Level</ColumnTitle>
          <ColumnTitle>Date</ColumnTitle>
          <ColumnTitle>Provider</ColumnTitle>
          <ColumnTitle>Message</ColumnTitle>
        </GridSchema>
      </Header>

      <LogsWrapper>
        {/* static presentation */}
        <LogEntry
          date={testData.date}
          provider={testData.provider}
          shortMsg={testData.shortMsg}
          fullMsg={testData.fullMsg}
        />
        <LogEntry
          type="INFO"
          date={testData.date}
          provider={testData.provider}
          shortMsg={testData.shortMsg}
          fullMsg={testData.fullMsg}
          additionalData={{
            bool: true,
            bool2: false,
            num: 12,
            num2: 12.5,
            str: 'smth'
          }}
        />
        <LogEntry
          type="info"
          date={testData.date}
          provider={testData.provider}
          shortMsg={testData.shortMsg}
          fullMsg={testData.fullMsg}
        />
        <LogEntry
          type="SUCCESS"
          date={testData.date}
          provider={testData.provider}
          shortMsg={testData.shortMsg}
          fullMsg={testData.fullMsg}
          additionalData={testData.additionalData}
        />
        <LogEntry
          type="success"
          date={testData.date}
          provider={testData.provider}
          shortMsg={testData.shortMsg}
          fullMsg={testData.fullMsg}
          additionalData={testData.additionalData}
        />
        <LogEntry
          type="ERROR"
          date={testData.date}
          provider={testData.provider}
          shortMsg={testData.shortMsg}
          fullMsg={testData.fullMsg}
          additionalData={testData.additionalData}
        />
        <LogEntry
          type="error"
          date={testData.date}
          provider={testData.provider}
          shortMsg={testData.shortMsg}
          fullMsg={testData.fullMsg}
          additionalData={testData.additionalData}
        />
        <LogEntry
          type="WARN"
          date={testData.date}
          provider={testData.provider}
          shortMsg={testData.shortMsg}
          fullMsg={testData.fullMsg}
          additionalData={testData.additionalData}
        />
        <LogEntry
          type="warn"
          date={testData.date}
          provider={testData.provider}
          shortMsg={testData.shortMsg}
          fullMsg={testData.fullMsg}
          additionalData={testData.additionalData}
        />
        <LogEntry
          date={testData.date}
          provider={testData.provider}
          shortMsg={testData.shortMsg}
          fullMsg={testData.fullMsg}
        />
      </LogsWrapper>
    </Container>
  );
}
