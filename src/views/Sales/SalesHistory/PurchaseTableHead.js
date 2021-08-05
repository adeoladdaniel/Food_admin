import React from 'react';
import { TableCell, TableHead, TableRow } from '@material-ui/core';

const GiftTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Title</TableCell>
        <TableCell>Qty Sold</TableCell>
        <TableCell>Profit (₦)</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default GiftTableHead;
