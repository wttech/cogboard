import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Router } from '@reach/router';

import {
  fetchAppInfo,
  fetchInitialData,
  updateWidgetContent,
  pushNewVersionNotification
} from './actions/thunks';
import {
  saveDataSuccess,
  loginSuccess,
  guestLoginSuccess
} from './actions/actionCreators';
import { getIsWaitingForNewVersion } from './selectors';
import { useInterval } from './hooks';
import { theme } from './theme';
import { CHECK_NEW_VERSION_DELAY } from './constants';

import MainTemplate from './components/MainTemplate';
import CssBaseline from '@material-ui/core/CssBaseline';
import { getGuestName, isAuthenticated } from './utils/auth';
import ServerErrorPage from './components/ServerErrorPage';

function App() {
  const appInitialized = useSelector(({ app }) => app.initialized);
  const dispatch = useDispatch();
  const isWaitingForNewVersion = useSelector(getIsWaitingForNewVersion);
  const pullingNewVersionInfoDelay = isWaitingForNewVersion
    ? null
    : CHECK_NEW_VERSION_DELAY;

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(loginSuccess());
    }
    if (!!getGuestName()) {
      dispatch(guestLoginSuccess(getGuestName()));
    }
    dispatch(fetchInitialData());
  }, [dispatch]);

  useInterval(() => {
    if (!isWaitingForNewVersion) {
      dispatch(fetchAppInfo());
    }
  }, pullingNewVersionInfoDelay);

  useEffect(() => {
    if (appInitialized) {
      const socket = new WebSocket(`ws://${window.location.hostname}/ws`);
      const handleMessageReceive = ({ data: dataJson }) => {
        const { eventType, ...data } = JSON.parse(dataJson);

        if (eventType === 'widget-update') {
          dispatch(updateWidgetContent(data));
        } else if (eventType === 'config-save') {
          dispatch(saveDataSuccess()); // TODO
        } else if (eventType === 'new-version') {
          dispatch(pushNewVersionNotification(data));
        }
      };

      socket.addEventListener('message', handleMessageReceive);

      dispatch(fetchAppInfo());
      return () => {
        socket.removeEventListener('message', handleMessageReceive);
      };
    }
  }, [appInitialized, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <CssBaseline />
        <Router>
          <ServerErrorPage path="error-page" />
          {appInitialized && <MainTemplate path="/*" />}
        </Router>
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;
