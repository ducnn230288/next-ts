import { EFormRuleType, EFormType } from '@/shared/enum';
import type { MUser } from '@/shared/model';
import type { TFieldForm } from '@/shared/types';

export const form = ({
  isDisable = false,
  isEdit = false,
  isChangePassword = false,
}: {
  isDisable?: boolean;
  isEdit?: boolean;
  isChangePassword?: boolean;
}): TFieldForm<MUser>[] => [
  {
    name: 'email',
    title: 'Email',
    type: !isDisable ? EFormType.Text : EFormType.Customize,
    col: 6,
    isDisabled: isDisable,
    rules: [{ type: EFormRuleType.Required }, { type: EFormRuleType.Email }],
    customize: ({ values }) => (
      <>
        <h1>{values?.email}</h1>
        <p>{values?.description}</p>
      </>
    ),
  },
  {
    name: 'username',
    title: 'Username',
    type: EFormType.Text,
    col: 6,
    isDisabled: isDisable,
    isShow: !isEdit,
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
    col: isChangePassword ? 12 : 6,
    isDisabled: isDisable,
    isShow: !isEdit,
    rules: [{ type: EFormRuleType.Required }],
  },
  {
    name: 'role_id',
    title: 'Role',
    type: EFormType.Select,
    col: 6,
    isDisabled: isDisable,
    rules: [{ type: EFormRuleType.Required }],
    api: {
      keyApi: 'Roles',
      format: { value: 'code', label: 'name' },
    },
  },
  {
    name: 'full_name',
    title: 'Fullname',
    type: EFormType.Text,
    col: 6,
    isDisabled: isDisable,
    rules: [{ type: EFormRuleType.Required }],
  },
  {
    name: 'tel',
    title: 'Phone',
    type: EFormType.Text,
    col: 6,
    isDisabled: isDisable,
    rules: [{ type: EFormRuleType.Phone }],
  },
  {
    name: 'skills',
    title: 'Skills',
    type: EFormType.Tags,
    isDisabled: isDisable,
  },
  {
    name: 'description',
    title: 'Description',
    type: EFormType.Textarea,
    isDisabled: isDisable,
  },
];

export default form;
