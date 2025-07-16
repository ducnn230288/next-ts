'use client';
import PageError from '@/shared/components/pages/error';

const Page = ({ error, reset }: { error?: Error & { digest?: string }; reset?: () => void }) => {
  return <PageError statusCode={500} error={error} reset={reset} />;
};

export default Page;
