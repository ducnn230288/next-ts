import queryString from 'query-string';

import { translate } from '@/app/provider';
import { C_LINK, KEY_TOKEN, LINK_API } from '@/shared/constants';
import type { TResponses } from '@/shared/types';
import { serviceMessage } from './message';

/**
 * serviceFetch object for making HTTP requests.
 */
type Props = {
  url: string;
  params?: Record<string, unknown>;
  config?: RequestInit;
  headers?: RequestInit['headers'];
  showError?: boolean;
  showMessage?: boolean;
  handleSuccess?: () => void;
};
export const serviceFetch = {
  init: () =>
    ({
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: localStorage.getItem(KEY_TOKEN)
          ? 'Bearer ' + localStorage.getItem(KEY_TOKEN)
          : '',
        'Accept-Language': localStorage.getItem('i18nextLng') ?? '',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    }) as RequestInit,
  responsible: async <T>({
    url,
    params = {},
    config,
    headers = {},
    showError = true,
    showMessage = false,
    handleSuccess,
  }: Props) => {
    config!.headers = { ...config!.headers, ...headers };
    const linkParam = queryString.stringify(params, { arrayFormat: 'index' });
    let response = await fetch(
      (url.includes('https://') || url.includes('http://') ? '' : LINK_API) +
        url +
        (linkParam && '?' + linkParam),
      config,
    );
    response = await serviceFetch.checkResponse({ response });

    const res: TResponses<T> = await response.json();
    if (response.ok) {
      if (showMessage && res.msg)
        serviceMessage.success({ content: translate(res.msg), onOk: handleSuccess });
    } else if (res.msg) {
      if (showError && response.status !== 401)
        serviceMessage.error({ content: translate(res.msg) });
      throw new Error(res.msg);
    }
    return res;
  },
  get: <T>(props: Props) =>
    serviceFetch.responsible<T>({ ...props, config: { ...serviceFetch.init(), method: 'GET' } }),
  post: <T>({ values, showMessage = true, ...props }: Props & { values: unknown }) =>
    serviceFetch.responsible<T>({
      ...props,
      config: {
        ...serviceFetch.init(),
        method: 'POST',
        body: values instanceof FormData ? values : JSON.stringify(values),
      },
      showMessage,
    }),
  patch: <T>({ values, showMessage = true, ...props }: Props & { values: unknown }) =>
    serviceFetch.responsible<T>({
      ...props,
      config: {
        ...serviceFetch.init(),
        method: 'PATCH',
        body: values instanceof FormData ? values : JSON.stringify(values),
      },
      showMessage,
    }),
  put: <T>({ values, showMessage = true, ...props }: Props & { values: unknown }) =>
    serviceFetch.responsible<T>({
      ...props,
      config: {
        ...serviceFetch.init(),
        method: 'PUT',
        body: values instanceof FormData ? values : JSON.stringify(values),
      },
      showMessage,
    }),
  delete: <T>({ showMessage = true, ...props }: Props) =>
    serviceFetch.responsible<T>({
      ...props,
      config: { ...serviceFetch.init(), method: 'DELETE' },
      showMessage,
    }),
  checkResponse: async ({ response }: { response: Response }) => {
    if (response.status === 401) {
      window.location.href = C_LINK.AuthLogin;
    }
    return response;
  },
};
