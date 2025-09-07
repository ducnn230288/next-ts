import type { ColumnDef } from '@tanstack/react-table';

import { ETableFilterType } from '@/shared/enums';
import type { MUser } from '@/shared/models';

export const table = (): ColumnDef<MUser>[] => [
  {
    accessorKey: 'username',
    header: 'Username',
    meta: {
      sorter: true,
      filter: ETableFilterType.Text,
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    meta: {
      sorter: true,
      filter: ETableFilterType.Text,
    },
  },
  {
    accessorKey: 'full_name',
    header: 'Fullname',
    meta: {
      sorter: true,
      filter: ETableFilterType.Text,
    },
  },
  {
    accessorKey: 'tel',
    header: 'Phone',
    meta: {
      sorter: true,
      filter: ETableFilterType.Text,
    },
  },
  {
    accessorKey: 'role_id',
    header: 'Role',
    meta: {
      sorter: true,
      filter: ETableFilterType.Text,
    },
  },
];

export default table;
