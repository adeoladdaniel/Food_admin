import React from 'react';
import { TableCell, TableHead, TableRow } from '@material-ui/core';

export const columnsHeader = [
  {
    id: 'Order Ref',
    label: 'Order Ref',
    minWidth: 170
  },
  {
    id: 'Name',
    label: 'Customer Name',
    minWidth: 170
  },
  {
    id: 'Phone Number',
    label: 'Phone Number',
    minWidth: 170
  },
  {
    id: 'Amount',
    label: 'Amount',
    minWidth: 100
  },
  {
    id: 'State',
    label: 'Location',
    minWidth: 100
  },
  {
    id: 'Status',
    label: 'Payment Status',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'Delivery Status',
    label: 'Delivery Status',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'Statuslll',
    label: 'Payment Type',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'Delivery Fee',
    label: 'Delivery Fee',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'Date',
    label: 'Date',
    minWidth: 170,
    align: 'right',
  },
];

const TableHeaders = () => {
  return (
    <TableHead>
      <TableRow>
        {columnsHeader.map((column) => (
          <TableCell
            key={column.id}
            style={{ minWidth: column.minWidth }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeaders;
