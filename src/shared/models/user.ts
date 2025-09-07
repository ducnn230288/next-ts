import type { MCommon } from './common';
import type { MRole } from './role';

/**
 * Represents a member for a project.
 */
export interface MUser extends MCommon {
  username?: string;
  email?: string;
  full_name?: string;
  tel?: string;
  is_active?: string;
  is_superuser?: string;
  role_id?: string;
  password?: string;
  role?: MRole;
}
