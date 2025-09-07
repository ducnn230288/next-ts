'use server';

import { cookies } from 'next/headers';

export async function setCookie({ key, value }: { key: string; value: string }) {
  const cookieStore = await cookies();
  cookieStore.set(key, value);
}

export const deleteCookie = async ({ key }: { key: string }) => {
  const cookieStore = await cookies();
  cookieStore.delete(key);
};
