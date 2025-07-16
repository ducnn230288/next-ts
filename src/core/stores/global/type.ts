import type { EStatusState } from '@/shared/enums';
import type { MUser } from '@/shared/models';
import type { AsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { WritableDraft } from 'immer';

/**
 * Represents the global state of the application.
 */
export type TStateGlobal = {
  language?: string;
  isCollapseMenu?: boolean;
  isLoading?: boolean;
  status?: EStatusState;
  user?: MUser;
  data?: MUser;
};

export type TActionStatusGlobal<T = unknown, E = never> = (
  state: WritableDraft<TStateGlobal>,
  action: PayloadAction<T, string, { arg: T; requestId: string; requestStatus: string }, E>,
) => void;

export type TActionGlobal<T = unknown> = AsyncThunk<unknown, T, Record<string, unknown>>;
