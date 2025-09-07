import { EStatusState } from '@/shared/enum';
import type { TStateGlobal } from './type';

/**
 * Represents the initial state for the global module.
 */
const initialState: TStateGlobal = {
  language: '',
  isCollapseMenu: false,
  isLoading: false,
  status: EStatusState.Idle,
};

export default initialState;
