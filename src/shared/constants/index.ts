export * from './api';
export * from './dayjs';
export * from './link';
export * from './mask';
export * from './metadata';
/**
 * The key used for user authentication.
 */
export const KEY_USER = 'm8nvn*&hKwcgb^D-D#Hz^5CXfKySpY';
/**
 * The key token used for authentication.
 */
export const KEY_TOKEN = KEY_USER + '1c82558a-29e2-42ba-b14a-47544a4542d7';
/**
 * The refresh token key used for authentication.
 */
export const KEY_REFRESH_TOKEN = KEY_USER + '15c665b7-592f-4b60-b31f-a252579a3bd0';
/**
 * The URL of the API endpoint.
 */
export const LINK_API = process.env.NEXT_PUBLIC_URL_API;
/**
 * Represents the constant value for full text search.
 */
export const FULL_TEXT_SEARCH = 'fullTextSearch';
