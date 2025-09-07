import type { Metadata } from 'next';

import rootMetadata from './metadata';
import ProviderLocale from './provider';

export const metadata: Metadata = rootMetadata;

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <div className={locale}>
      <ProviderLocale>{children}</ProviderLocale>
    </div>
  );
}
