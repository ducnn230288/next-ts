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
  role_id?: string;
  password?: string;
  role?: MRole;
  permission_codes?: string[];
  activated_at?: string;
  description?: string;
  skills?: string[];
}
