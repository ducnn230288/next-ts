import { NextIntlClientProvider } from 'next-intl';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
