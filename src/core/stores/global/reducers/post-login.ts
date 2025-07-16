import { createAsyncThunk } from '@reduxjs/toolkit';

import type { TActionGlobal, TActionStatusGlobal } from '@/core/stores';
import { KEY_REFRESH_TOKEN, KEY_TOKEN, KEY_USER } from '@/shared/constants';
import { EStatusState } from '@/shared/enums';
import ReducerBase from './base';

interface IRequestLogin {
  username?: string;
  password?: string;
}

/**
 * Represents a class for handling login functionality.
 * @class
 */
export default class Reducer extends ReducerBase {
  public constructor(name: string) {
    super();
    (this.action as TActionGlobal<IRequestLogin>) = createAsyncThunk<unknown, IRequestLogin>(
      name + '/login',
      async (values: IRequestLogin) => {
        localStorage.setItem(KEY_TOKEN, 'data?.token');
        localStorage.setItem(KEY_REFRESH_TOKEN, 'data?.refreshToken');
        localStorage.setItem(KEY_USER, JSON.stringify(values));
        return values;
      },
    );

    (this.pending as TActionStatusGlobal<IRequestLogin>) = (state, action) => {
      state.data = action.meta.arg;
    };
    (this.fulfilled as TActionStatusGlobal<IRequestLogin>) = (state, action) => {
      state.user = action.payload;
      state.data = undefined;
      state.status = EStatusState.IsFulfilled;
    };
  }
}
