/* eslint-disable react/no-danger */
// eslint-disable-next-line import/no-extraneous-dependencies
import { ServerStyleSheets } from '@material-ui/styles';
import colorfulTheme from '@src/theme';
import Document, {
  DocumentContext,
  Head,
  Main,
  NextScript,
  Html
} from 'next/document';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import flush from 'styled-jsx';

class CustomDocument extends Document {
  // eslint-disable-next-line func-names
  static getInitialProps = async function (ctx: DocumentContext) {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {sheets.getStyleElement()}
          {flush || null}
        </>
      ),
    };
  };

  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <meta name="robots" content="noindex, nofollow" />

          <meta charSet="utf-8" />
          {/* PWA primary color */}
          <meta
            name="theme-color"
            content={colorfulTheme.palette.primary.main}
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;1,400;1,600&display=swap"
            rel="stylesheet"
          />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
