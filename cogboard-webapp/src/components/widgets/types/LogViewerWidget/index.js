import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { number, string } from 'prop-types';
import { useLocalStorage } from '../../../../hooks';

import Toolbar from './Toolbar';
import LogList from './LogList';
import { Container } from './styled';
import { getInitialLogs } from '../../../../utils/fetch';
import { joinLogs } from './helpers';

const LogViewerWidget = ({ id }) => {
  const widgetData = useSelector(
    ({ widgets }) => widgets.widgetsById[id],
    shallowEqual
  );
  useEffect(() => console.log(widgetData), [widgetData]);

  const [widgetLocalStorageData, setWidgetLocalStorage] = useLocalStorage(id);
  const widgetLocalStorage = {
    get: () => widgetLocalStorageData,
    set: setWidgetLocalStorage
  };

  const [searchFilter, setSearchFilter] = useState('');
  const [shouldFollowLogs, setFollow] = useState(true);

  useEffect(() => {
    getInitialLogs(id).then(logs => {
      setStoredLogs(logs);
    });
  }, [id]);

  const newLogs = widgetData.content?.logs || [];
  const template = widgetData.content?.variableFields;
  const quarantine = widgetData.content?.quarantineRules || [];
  const logLines = widgetData.logLinesField || 1000;

  const [storedLogs, setStoredLogs] = useState([]);

  useEffect(() => {
    setStoredLogs(joinLogs(storedLogs, newLogs, logLines));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widgetData]);

  const [filterSimilarLogs, setFilterSimilarLogs] = useState(null);
  const [quarantineSimilarLogs, setQuarantineSimilarLogs] = useState(null);

  return (
    <Container>
      <Toolbar
        wid={id}
        quarantine={quarantine}
        widgetLocalStorage={widgetLocalStorage}
        setSearchFilter={setSearchFilter}
        shouldFollowLogs={shouldFollowLogs}
        handleFollowChange={setFollow}
        lastLog={
          storedLogs &&
          storedLogs.length > 0 &&
          storedLogs[storedLogs.length - 1]
        }
        filterSimilarLogsState={[filterSimilarLogs, setFilterSimilarLogs]}
        quarantineSimilarLogsState={[
          quarantineSimilarLogs,
          setQuarantineSimilarLogs
        ]}
      />
      {storedLogs && (
        <LogList
          widgetLocalStorage={widgetLocalStorage}
          logs={storedLogs}
          template={template}
          search={searchFilter}
          shouldFollowLogs={shouldFollowLogs}
          handleFollowChange={setFollow}
          setFilterSimilarLogs={setFilterSimilarLogs}
          setQuarantineSimilarLogs={setQuarantineSimilarLogs}
        />
      )}
    </Container>
  );
};

LogViewerWidget.propTypes = {
  endpoint: string,
  schedulePeriod: number,
  path: string,
  logLinesField: number,
  logFileSizeField: number,
  logRecordExpirationField: number
};

LogViewerWidget.defaultProps = {
  endpoint: '',
  schedulePeriod: 60,
  path: '',
  logLinesField: 1000,
  logFileSizeField: 50,
  logRecordExpirationField: 5
};

export default LogViewerWidget;
