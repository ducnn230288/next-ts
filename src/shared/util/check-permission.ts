import type { EPermissions } from '../enum';
import type { MUser } from '../model';

export const checkPermission = ({
  user,
  permission,
}: {
  user: MUser | undefined;
  permission: EPermissions;
}) => user?.permission_codes?.includes(permission);
