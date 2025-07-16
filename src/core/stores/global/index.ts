import { createSlice } from '@reduxjs/toolkit';

import { useAppStore } from '..';
import initialState from './state';
import type { TStateGlobal } from './type';
// import utils from './utils';
import reducers from './reducers';
export * from './state';
export * from './type';

const name = 'Global';
/**
 * Represents the global slice of the application state.
 */
const globalSlice = createSlice({
  name,
  initialState,
  reducers: {
    set: (state, action) => {
      Object.keys(action.payload).forEach(key => {
        state[key as keyof TStateGlobal] = action.payload[key as keyof TStateGlobal];
      });
    },
    setLanguage: (state, action) => {
      if (action.payload !== state.language) {
        // utils.changeLanguage(action.payload);
        state.language = action.payload;
      }
      // state.user = JSON.parse(localStorage.getItem(KEY_USER) ?? '{}');
    },
  },
  extraReducers: builder => {
    reducers.postLogin.reducer(builder);
  },
});
export default globalSlice;

/**
 * Returns an object with methods for interacting with the global state.
 *
 * @returns An object with methods for interacting with the global state.
 */
export const SGlobal = () => {
  const { dispatch } = useAppStore();
  return {
    set: (values: TStateGlobal) => dispatch(globalSlice.actions.set(values)),
    setLanguage: (language: string) => dispatch(globalSlice.actions.setLanguage(language)),
    postLogin: (values: { username?: string; password?: string }) =>
      dispatch(reducers.postLogin.action(values)),
  };
};
