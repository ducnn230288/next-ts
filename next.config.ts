import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  output: 'standalone',
  productionBrowserSourceMaps: false,
};

const withNextIntl = createNextIntlPlugin('./src/core/lib/i18n/request.ts');
export default withNextIntl(nextConfig);
