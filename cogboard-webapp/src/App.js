import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Router } from '@reach/router';

import { fetchInitialData } from './actions/thunks';
import {
  updateWidget,
  saveDataSuccess,
  loginSuccess
} from './actions/actionCreators';
import { theme } from './theme';

import MainTemplate from './components/MainTemplate';
import CssBaseline from '@material-ui/core/CssBaseline';
import { isAuthenticated } from './utils/auth';
import ServerErrorPage from './components/ServerErrorPage';

function App() {
  const appInitialized = useSelector(({ app }) => app.initialized);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(loginSuccess());
    }

    dispatch(fetchInitialData());
  }, [dispatch]);

  useEffect(() => {
    if (appInitialized) {
      const socket = new WebSocket(`ws://${window.location.hostname}/ws`);
      const handleMessageReceive = ({ data: dataJson }) => {
        const { eventType, ...data } = JSON.parse(dataJson);

        if (eventType === 'widget-update') {
          dispatch(updateWidget(data));
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
