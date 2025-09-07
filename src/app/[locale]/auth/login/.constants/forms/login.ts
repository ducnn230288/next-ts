import { EFormRuleType, EFormType } from '@/shared/enums';
import type { TFieldForm } from '@/shared/types';
import type { IRequestLogin } from '../../.interface';

export const form = (): TFieldForm<IRequestLogin>[] => [
  {
    name: 'username',
    title: 'Username',
    type: EFormType.Text,
    rules: [{ type: EFormRuleType.Required }],
  },
  {
    name: 'password',
    title: 'Password',
    type: EFormType.Password,
    notDefaultValid: true,
    rules: [{ type: EFormRuleType.Required }],
  },
];

export default form;
