import queryString from 'query-string';

import { translate } from '@/app/provider';
import { C_API, JWT_CSRF_TOKEN_EXPIRE_MINUTES, LINK_API } from '@/shared/constant';
import type { TResponses } from '@/shared/types';
import { logout } from '@/shared/util';
import { serviceMessage } from './message';

let timeoutFetch: ReturnType<typeof setTimeout>;

/**
 * serviceFetch object for making HTTP requests.
 */
type Props = {
  readonly url: string;
  readonly params?: Record<string, unknown>;
  readonly config?: RequestInit;
  readonly headers?: RequestInit['headers'];
  readonly isShowError?: boolean;
  readonly isShowMessage?: boolean;
  readonly handleSuccess?: () => void;
};
export const serviceFetch = {
  token: '',
  init: () =>
    ({
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
    isShowError = true,
    isShowMessage = false,
    handleSuccess,
  }: Props) => {
    let response: Response | undefined;
    try {
      if (!serviceFetch.token) await serviceFetch.getToken();

      config!.headers = {
        ...config!.headers,
        ...headers,
        authorization: serviceFetch.token ? 'Bearer ' + serviceFetch.token : '',
      };

      const linkParam = queryString.stringify(params);
      response = await fetch(
        (url.includes('https://') || url.includes('http://') ? '' : LINK_API) +
          url +
          (linkParam && '?' + linkParam),
        config,
      );
      response = await serviceFetch.checkResponse({ response });
    } catch (error) {
      serviceMessage.error({ content: translate('RequestFailed') });
      throw error;
    }

    const res: TResponses<T> = await response.json();
    if (response.ok) {
      if (isShowMessage && res.msg) {
        serviceMessage.success({
          content: translate(res.msg, res.msg_values),
          onOk: handleSuccess,
        });
      } else if (handleSuccess) handleSuccess();
    } else if (res.msg) {
      if (isShowError && response.status !== 401)
        serviceMessage.error({ content: translate(res.msg, res.msg_values) });
      throw new Error(res.msg);
    }
    return res;
  },
  get: <T>(props: Props) =>
    serviceFetch.responsible<T>({ ...props, config: { ...serviceFetch.init(), method: 'GET' } }),
  post: <T>({ values, isShowMessage = true, ...props }: Props & { values: unknown }) =>
    serviceFetch.responsible<T>({
      ...props,
      config: {
        ...serviceFetch.init(),
        method: 'POST',
        body: values instanceof FormData ? values : JSON.stringify(values),
      },
      isShowMessage,
    }),
  patch: <T>({ values, isShowMessage = true, ...props }: Props & { values: unknown }) =>
    serviceFetch.responsible<T>({
      ...props,
      config: {
        ...serviceFetch.init(),
        method: 'PATCH',
        body: values instanceof FormData ? values : JSON.stringify(values),
      },
      isShowMessage,
    }),
  put: <T>({ values, isShowMessage = true, ...props }: Props & { values: unknown }) =>
    serviceFetch.responsible<T>({
      ...props,
      config: {
        ...serviceFetch.init(),
        method: 'PUT',
        body: values instanceof FormData ? values : JSON.stringify(values),
      },
      isShowMessage,
    }),
  delete: <T>({ isShowMessage = true, ...props }: Props) =>
    serviceFetch.responsible<T>({
      ...props,
      config: { ...serviceFetch.init(), method: 'DELETE' },
      isShowMessage,
    }),
  getToken: async () => {
    const response = await fetch(LINK_API + C_API.UsersCSRFToken, {
      ...serviceFetch.init(),
      method: 'POST',
    });
    const { data }: TResponses<{ csrf_token: string }> = await response.json();
    serviceFetch.token = data?.csrf_token || '';
    clearTimeout(timeoutFetch);
    timeoutFetch = setTimeout(
      () => (serviceFetch.token = ''),
      (JWT_CSRF_TOKEN_EXPIRE_MINUTES - 1) * 60 * 1000,
    );
  },
  checkResponse: async ({ response }: { response: Response }) => {
    if (response.status === 401) {
      logout();
    }
    return response;
  },
};
