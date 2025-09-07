import { createAsyncThunk } from '@reduxjs/toolkit';

import { serviceFetch } from '@/core/services';
import type { TActionGlobal, TActionStatusGlobal } from '@/core/stores';
import { C_API } from '@/shared/constants';
import { EStatusState } from '@/shared/enums';
import type { MUser } from '@/shared/models';
import ReducerBase from './base';

/**
 * Represents a class for handling login functionality.
 * @class
 */
export default class Reducer extends ReducerBase {
  public constructor(name: string) {
    super();
    (this.action as TActionGlobal<MUser>) = createAsyncThunk<unknown, MUser>(
      name + C_API.BaseUserInfo,
      async () => {
        const { data } = await serviceFetch.get<MUser>({ url: C_API.BaseUserInfo });
        return data;
      },
    );
    (this.fulfilled as TActionStatusGlobal<MUser>) = (state, action) => {
      state.user = action.payload;
      state.status = EStatusState.IsFulfilled;
    };
  }
}
