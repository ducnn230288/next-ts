import { createAsyncThunk, type ActionReducerMapBuilder } from '@reduxjs/toolkit';

import type { TActionGlobal, TActionStatusGlobal, TStateGlobal } from '@/core/stores';
import { EStatusState } from '@/shared/enums';

/**
 * HReducer class represents a reducer for global state.
 * It handles pending, fulfilled, and rejected actions.
 */
export default class RAuthBase {
  public action: TActionGlobal = createAsyncThunk('', () => {}) as TActionGlobal;
  public reducer;
  public pending: TActionStatusGlobal = () => {};
  public fulfilled: TActionStatusGlobal = () => {};
  public rejected: TActionStatusGlobal = () => {};
  public constructor() {
    this.reducer = (builder: ActionReducerMapBuilder<TStateGlobal>) => {
      builder
        .addCase(this.action.pending, (state, action) => {
          state.isLoading = true;
          state.status = EStatusState.Idle;
          this.pending(state, action);
        })

        .addCase(this.action.fulfilled, (state, action) => {
          state.isLoading = false;
          this.fulfilled(state, action);
        })

        .addCase(this.action.rejected, (state, action) => {
          console.log('Action rejected:', action);
          state.isLoading = false;
          this.rejected(state, action);
        });
    };
  }
}
