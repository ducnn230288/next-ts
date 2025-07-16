/**
 * Represents the response object returned by an API request.
 */
export type TResponses<T> = {
  readonly code?: 200 | 201 | 500 | 404;
  readonly msg?: string;
  readonly data?: T;
  readonly total?: number;
  readonly page?: number;
  readonly page_size?: number;
};
