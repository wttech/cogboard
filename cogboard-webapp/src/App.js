import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';

import { fetchInitialData } from "./actions/thunks";
import { updateWidget, saveDataSuccess } from './actions/actionCreators';
import { theme } from './theme';

import MainTemplate from './components/MainTemplate';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  const appInitialized = useSelector(
    ({ app }) => app.initialized
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);

  useEffect(() => {
    if (appInitialized) {
      const socket = new WebSocket(`ws://${window.location.hostname}:9001`);
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
      <CssBaseline />
      {appInitialized &&
        <MainTemplate />
      }
    </ThemeProvider>
  );
}

export default App;
