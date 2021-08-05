import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  TableBody, TableHead, TableRow, TableCell, Table, Box
} from '@material-ui/core/';
import { formatter } from '../../../utils/localStore';
import { getProductTotal } from '../../../utils/product/product';

const useStyles = makeStyles({
  table: {
    width: 800
  },
  root: {
    margin: '1.4rem'
  }
});

export default function ProductsTable({ items = [] }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <PerfectScrollbar>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Product Title</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item._id}>
                <TableCell component="th" scope="item">
                  {item.title}
                </TableCell>
                <TableCell>{item.qty}</TableCell>
                <TableCell>{formatter.format(item.price)}</TableCell>
                <TableCell>{formatter.format(item.qty * item.price)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <strong>Total :</strong>
                {formatter.format(getProductTotal(items))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </PerfectScrollbar>
    </Box>
  );
}
