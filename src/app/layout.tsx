import { NextIntlClientProvider } from 'next-intl';
import Script from 'next/script';

import '../shared/components/organisms/form/style.scss';
import '../style.scss';
import '../tailwind.css';
import ProviderRoot from './provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="light">
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link href="/assets/styles/theme.css" rel="stylesheet" />
        <meta
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=1"
          name="viewport"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=100" />
        <meta name="mobile-web-app-capable" content="yes" />

        <base href="/" />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        <link rel="apple-touch-icon" href="assets/icons/logo192.png" />
        <link rel="apple-touch-icon" href="assets/icons/logo512.png" />
        <link rel="manifest" href="manifest.webmanifest" />
        <link rel="stylesheet" href="/assets/library/glightbox/glightbox.min.css" />
      </head>
      <body>
        <NextIntlClientProvider>
          <ProviderRoot>{children}</ProviderRoot>
        </NextIntlClientProvider>
      </body>

      {/* Load scripts client-side using Next.js Script component */}
      <Script src="/assets/library/glightbox/glightbox.min.js" strategy="afterInteractive" />
    </html>
  );
}
