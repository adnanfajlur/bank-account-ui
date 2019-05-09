import React from 'react'
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="viewport" content="user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height" />
          <link rel="manifest" href="/static/manifest.json" />
          <meta name="description" content="This sample website that used for test" />
          <link rel="stylesheet" href="/static/css/reset.css" type="text/css" />
          <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
