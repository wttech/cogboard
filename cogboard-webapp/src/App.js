import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';

import { fetchData, updateWidget } from "./actions/actionCreators";
import { theme } from './theme';

import MainTemplate from './components/MainTemplate';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  const appInitialized = useSelector(
    ({ app }) => app.initialized
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (appInitialized) {
      const socket = new WebSocket('ws://localhost:9000');
      const handleMessageReceive = ({ data }) => {
        dispatch(updateWidget(JSON.parse(data)));
      }

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
