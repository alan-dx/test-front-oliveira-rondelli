import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocumet extends Document {
  render(): JSX.Element {
      return (
        <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Sora:wght@400;600&display=swap" rel="stylesheet" />

          {/* <link rel="shortcut icon" href="/favicon.png" type="image/png" /> */}
        </Head>
        <Main />
        <NextScript />
      </Html>
      )
  }
}