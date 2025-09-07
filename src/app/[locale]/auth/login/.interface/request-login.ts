import type { MUser } from '@/shared/models';

export type IRequestLogin = Pick<MUser, 'username' | 'password'>;
