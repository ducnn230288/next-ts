import type { EPermissions } from '../enums';
import type { MUser } from '../models';

export const checkPermission = (user: MUser | undefined, permission: EPermissions) =>
  user?.is_superuser || user?.role?.permissions?.includes(permission);
