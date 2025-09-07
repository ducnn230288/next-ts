import type { MCommon } from './common';

/**
 * Represents a member for a project.
 */
export interface MRole extends MCommon {
  name?: string;
  code?: string;
  description?: string;
  permissions?: string[];
}
