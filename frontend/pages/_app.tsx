import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import withReduxSaga from 'next-redux-saga';
import 'typeface-roboto';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import withRedux from 'next-redux-wrapper';
import { SnackbarProvider } from 'notistack';

import { SN_THEME } from '../components/Theme/Theme';
import { IndexLayout } from '../components/LandingPage/Index';
import initStore from '../store';

interface Props {
  store: Store;
}
class MyApp extends App<Props> {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>My page</title>
        </Head>
        <ThemeProvider theme={SN_THEME}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Provider store={store}>
            <SnackbarProvider
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
          }}
            >
              <IndexLayout>
                <Component {...pageProps} />
              </IndexLayout>
            </SnackbarProvider>
          </Provider>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default withRedux(initStore, { debug: true })(withReduxSaga(MyApp));
