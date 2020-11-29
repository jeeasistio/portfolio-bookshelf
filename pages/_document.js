import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '@styles/theme'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
  
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });
  
    const initialProps = await Document.getInitialProps(ctx);
  
    return {
      ...initialProps,
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" /> 
          <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <meta name="theme-color" content={theme.palette.primary.main} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument