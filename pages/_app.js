import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

export default function App(props) {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ModalsProvider>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{

          /** Put your mantine theme override here */
          colorScheme: 'light',
          primaryColor:'dark'
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
      </ModalsProvider>
    </>
  );
}
