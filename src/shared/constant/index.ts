export * from './api';
export * from './dayjs';
export * from './link';
export * from './mask';
export * from './metadata';
/**
 * The URL of the API endpoint.
 */
export const LINK_API = process.env.NEXT_PUBLIC_URL_API;
/**
 * Represents the constant value for user authentication.
 */
export const IS_LOGGED_IN = 'isLoggedIn';
/**
 * JWT access token expiration time in minutes.
 * Default is 5 minutes if not set in environment variables.
 */
export const JWT_CSRF_TOKEN_EXPIRE_MINUTES = process.env.JWT_CSRF_TOKEN_EXPIRE_MINUTES
  ? parseInt(process.env.JWT_CSRF_TOKEN_EXPIRE_MINUTES)
  : 10;
