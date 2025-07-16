import type {
  DeepKeys,
  DeepValue,
  FieldAsyncValidateOrFn,
  FieldMeta,
  FieldValidateOrFn,
  FormAsyncValidateOrFn,
  FormValidateOrFn,
} from '@tanstack/react-form';

export type TFieldMeta<T> = FieldMeta<
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
  FormAsyncValidateOrFn<T> | undefined
>;
