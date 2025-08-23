'use server';

import { cookies } from 'next/headers';

export async function store(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('KEY_TOKEN', token);
}

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('KEY_TOKEN');
};
