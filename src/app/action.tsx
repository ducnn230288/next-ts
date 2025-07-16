import TemplateError from '@/shared/components/templates/error';
import type { JSX } from 'react';

export const serverErrorHandler = async (fn: () => Promise<JSX.Element>) => {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof Error) {
      return (
        <TemplateError statusCode={500} error={{ name: error.name, message: error.message }} />
      );
    }
    throw error;
  }
};
