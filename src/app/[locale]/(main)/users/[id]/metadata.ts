import { C_METADATA } from '@/shared/constants';
import type { Metadata } from 'next';

const metadata: Metadata = {
  title: 'Home | Next.js by Vercel',
  description: 'Next.js by Vercel is the full-stack React framework for the web.',
  openGraph: {
    title: 'Home | Next.js by Vercel',
    description: 'Next.js by Vercel is the full-stack React framework for the web.',
    type: 'website',
    images: C_METADATA.images,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home | Next.js by Vercel',
    description: 'Next.js by Vercel is the full-stack React framework for the web.',
  },
  alternates: {
    canonical: `${C_METADATA.domain.main}/`,
  },
};

export default metadata;
