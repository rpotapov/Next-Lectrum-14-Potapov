
import type { DocumentProps } from 'next/document';
import Document, {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import i18nConfig from '../../next-i18next.config.js';

type Props = DocumentProps;

class MyDocument extends Document<Props> {
  render() {
    const currentLocale =
      this.props.__NEXT_DATA__.locale ??
      i18nConfig.i18n.defaultLocale;

    return (
      <Html lang={currentLocale}>
        <Head />
        <meta charSet="UTF-8" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;