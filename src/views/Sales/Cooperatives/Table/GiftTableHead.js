import React from 'react';
import { TableCell, TableHead, TableRow } from '@material-ui/core';

const GiftTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Customer</TableCell>
        <TableCell>Phone No.</TableCell>
        <TableCell>Gift Status</TableCell>
        <TableCell>Date </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default GiftTableHead;
