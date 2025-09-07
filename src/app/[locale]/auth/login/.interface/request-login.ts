import type { MUser } from '@/shared/model';

export type IRequestLogin = Pick<MUser, 'username' | 'password'>;
