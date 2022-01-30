import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocumet extends Document {
  render(): JSX.Element {
      return (
        <Html>
        <Head>
          <meta name='application-name' content="Plano Gestor" />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content="Plano Gestor" />
          <meta name='description' content="An application to manage indexers" />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='theme-color' content='#F5F5F5' />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Sora:wght@400;600&display=swap" rel="stylesheet" />

          <link rel='manifest' href='/manifest.json' />

        </Head>
        <Main />
        <NextScript />
      </Html>
      )
  }
}