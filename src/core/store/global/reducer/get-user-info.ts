import { createAsyncThunk } from '@reduxjs/toolkit';

import { serviceFetch } from '@/core/service';
import type { TActionGlobal, TActionStatusGlobal } from '@/core/store';
import { C_API } from '@/shared/constant';
import { EStatusState } from '@/shared/enum';
import type { MUser } from '@/shared/model';
import ReducerBase from './base';

/**
 * Represents a class for handling login functionality.
 * @class
 */
export default class Reducer extends ReducerBase {
  public constructor(name: string) {
    super();
    (this.action as TActionGlobal<MUser>) = createAsyncThunk<unknown, MUser>(
      name + C_API.UsersMe,
      async () => {
        const { data } = await serviceFetch.get<MUser>({ url: C_API.UsersMe });
        return data;
      },
    );
    (this.fulfilled as TActionStatusGlobal<MUser>) = (state, action) => {
      state.user = action.payload;
      state.status = EStatusState.IsFulfilled;
    };
  }
}
