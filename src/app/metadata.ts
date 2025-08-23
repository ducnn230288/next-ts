import { C_METADATA } from '@/shared/constants';
import type { Metadata } from 'next';

const metadata: Metadata = {
  metadataBase: new URL(C_METADATA.domain.main),
  title: {
    default: C_METADATA.title,
    template: C_METADATA.template,
  },
  description: C_METADATA.description,
  keywords: C_METADATA.keywords,
  authors: C_METADATA.author,
  icons: {
    apple: '/apple-touch-icon.avif',
    icon: '/favicon.ico',
  },
  creator: C_METADATA.creator.name,
  publisher: C_METADATA.publisher.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: C_METADATA.domain.main,
    title: C_METADATA.title,
    description: C_METADATA.description,
    siteName: C_METADATA.title,
    images: C_METADATA.images,
  },
  twitter: {
    card: 'summary_large_image',
    title: C_METADATA.title,
    description: C_METADATA.description,
    creator: C_METADATA.creator.mention,
    images: C_METADATA.og.image,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: C_METADATA.canonical,
    languages: {
      'zh-Hans': C_METADATA.domain.main,
    },
  },
};

export default metadata;
