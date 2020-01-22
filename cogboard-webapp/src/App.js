import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Router } from '@reach/router';

import {
  fetchAppInfo,
  fetchInitialData,
  updateWidgetContent
} from './actions/thunks';
import { saveDataSuccess, loginSuccess } from './actions/actionCreators';
import { theme } from './theme';

import MainTemplate from './components/MainTemplate';
import CssBaseline from '@material-ui/core/CssBaseline';
import { isAuthenticated } from './utils/auth';
import ServerErrorPage from './components/ServerErrorPage';
import { useCookies } from 'react-cookie';

function App() {
  const appInitialized = useSelector(({ app }) => app.initialized);
  const dispatch = useDispatch();
  const [cookies] = useCookies();

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(loginSuccess());
    }

    dispatch(fetchInitialData());
    dispatch(fetchAppInfo(cookies.skipVersion));
  }, [dispatch]);

  useEffect(() => {
    if (appInitialized) {
      const socket = new WebSocket(`ws://${window.location.hostname}/ws`);
      const handleMessageReceive = ({ data: dataJson }) => {
        const { eventType, ...data } = JSON.parse(dataJson);

        if (eventType === 'widget-update') {
          dispatch(updateWidgetContent(data));
        } else if (eventType === 'notification-config-save') {
          dispatch(saveDataSuccess());
        }
      };

      socket.addEventListener('message', handleMessageReceive);

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
