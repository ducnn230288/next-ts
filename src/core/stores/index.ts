import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';

import globalSlice from './global';
export * from './global';
/**
 * Sets up the store for the application.
 */
const setupStore = () => configureStore({ reducer: globalSlice.reducer });
export default setupStore;
export type AppStore = ReturnType<typeof setupStore>;
/**
 * Custom hook that returns the app dispatch function.
 */
export const useAppDispatch = () => useDispatch.withTypes<AppStore['dispatch']>();
/**
 * Custom hook that provides type-safe access to the Redux store state.
 */
export const useAppSelector = useSelector.withTypes<ReturnType<AppStore['getState']>>();
export const useAppStore = useStore.withTypes<AppStore>();
