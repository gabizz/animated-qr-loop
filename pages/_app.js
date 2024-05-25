import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../src/theme';
import { AppContextProvider } from '../lib/appContext';

// import "moment/dist/locale/ro"


export default function MyApp(props) {
  const { Component, pageProps } = props;

  return (

    <AppContextProvider value={{
      token: null, 
      cui: 16344256, 
      invoice: {}, 
      dictionary: {},
      data: null,
      error: null, msg: null
      }}>
      <AppCacheProvider {...props}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
         
          <Component {...pageProps}/>
        </ThemeProvider>
      </AppCacheProvider>
    
</AppContextProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
