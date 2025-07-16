import type {
  DeepKeys,
  DeepValue,
  FieldApi,
  FieldAsyncValidateOrFn,
  FieldValidateOrFn,
  FormAsyncValidateOrFn,
  FormValidateOrFn,
} from '@tanstack/react-form';

export type TField<T> = FieldApi<
  T,
  DeepKeys<T>,
  DeepValue<T, DeepKeys<T>>,
  FieldValidateOrFn<T, DeepKeys<T>, DeepValue<T, DeepKeys<T>>> | undefined,
  FieldValidateOrFn<T, DeepKeys<T>, DeepValue<T, DeepKeys<T>>> | undefined,
  FieldAsyncValidateOrFn<T, DeepKeys<T>, DeepValue<T, DeepKeys<T>>> | undefined,
  FieldValidateOrFn<T, DeepKeys<T>, DeepValue<T, DeepKeys<T>>> | undefined,
  FieldAsyncValidateOrFn<T, DeepKeys<T>, DeepValue<T, DeepKeys<T>>> | undefined,
  FieldValidateOrFn<T, DeepKeys<T>, DeepValue<T, DeepKeys<T>>> | undefined,
  FieldAsyncValidateOrFn<T, DeepKeys<T>, DeepValue<T, DeepKeys<T>>> | undefined,
  FormValidateOrFn<T> | undefined,
  FormValidateOrFn<T> | undefined,
  FormAsyncValidateOrFn<T> | undefined,
  FormValidateOrFn<T> | undefined,
  FormAsyncValidateOrFn<T> | undefined,
  FormValidateOrFn<T> | undefined,
  FormAsyncValidateOrFn<T> | undefined,
  FormAsyncValidateOrFn<T> | undefined,
  unknown
>;
