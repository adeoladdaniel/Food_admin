/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ErrorBoundary from './views/ErrorBoundary/ErrorBoundary';
import theme from './theme';
import Routes from './routes/Routes';
import store from './redux/store';
import './libs';
import './assets/scss/index.scss';

const queryClient = new QueryClient();
const browserHistory = createBrowserHistory();

export default function App() {
  return (
    <ErrorBoundary>
      <Router history={browserHistory}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <Routes />
              <ToastContainer hideProgressBar />
            </ThemeProvider>
            <ReactQueryDevtools />
          </Provider>
        </QueryClientProvider>
      </Router>
    </ErrorBoundary>
  );
}
