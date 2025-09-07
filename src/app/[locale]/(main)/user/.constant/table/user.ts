import type { ColumnDef } from '@tanstack/react-table';

import type { MUser } from '@/shared/model';

export const table = (): ColumnDef<MUser>[] => [
  {
    accessorKey: 'username',
    header: 'Username',
    meta: { sorter: true },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    meta: { sorter: true },
  },
  {
    accessorKey: 'full_name',
    header: 'Fullname',
    meta: { sorter: true },
  },
  {
    accessorKey: 'tel',
    header: 'Phone',
    meta: { sorter: true },
  },
  {
    accessorKey: 'role_id',
    header: 'Role',
    meta: { sorter: true },
  },
];

export default table;
