'use client';
import TemplateError from '@/shared/components/templates/error';

const Page = ({ error }: { error?: Error }) => {
  return <TemplateError statusCode={500} error={error} />;
};

export default Page;
