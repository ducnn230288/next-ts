import { EFormRuleType, EFormType } from '@/shared/enums';
import type { MUser } from '@/shared/models';
import type { TFieldForm } from '@/shared/types';

export const form = ({
  isDisable,
  isEdit,
}: {
  isDisable: boolean;
  isEdit: boolean;
}): TFieldForm<MUser>[] => [
  {
    name: 'email',
    title: 'Email',
    type: EFormType.Text,
    col: 6,
    disabled: () => isDisable,
    rules: [{ type: EFormRuleType.Required }, { type: EFormRuleType.Email }],
  },
  {
    name: 'username',
    title: 'Username',
    type: EFormType.Text,
    col: 6,
    disabled: () => isDisable,
    condition: () => !isEdit,
    rules: [
      { type: EFormRuleType.Required },
      { type: EFormRuleType.Underscore },
      { type: EFormRuleType.Min, value: 3 },
      { type: EFormRuleType.Max, value: 20 },
    ],
  },
  {
    name: 'password',
    title: 'Password',
    type: EFormType.Password,
    col: 6,
    disabled: () => isDisable,
    condition: () => !isEdit,
    rules: [{ type: EFormRuleType.Required }],
  },
  {
    name: 'role_id',
    title: 'Role',
    type: EFormType.Select,
    col: 6,
    disabled: () => isDisable,
    rules: [{ type: EFormRuleType.Required }],
    api: {
      keyApi: 'Roles',
      format: item => ({ value: item?.code, label: item?.name }),
    },
  },
  {
    name: 'full_name',
    title: 'Fullname',
    type: EFormType.Text,
    col: 6,
    disabled: () => isDisable,
    rules: [{ type: EFormRuleType.Required }],
  },
  {
    name: 'tel',
    title: 'Phone',
    type: EFormType.Text,
    col: 6,
    disabled: () => isDisable,
    rules: [{ type: EFormRuleType.Phone }],
  },
];

export default form;
