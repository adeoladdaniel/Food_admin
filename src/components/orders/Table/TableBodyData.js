import React from 'react';
import {
  Table, TableBody,
  TableCell, TableContainer, TablePagination, TableRow
} from '@material-ui/core';
import moment from 'moment';
import TableHeaders from './TableHeaders';
import StatusBullet from '../../StatusBullet/StatusBullet';
import { statusColors } from '../../../utils/AccountStatus';

const TableBodyData = ({
  page, rowsPerPage, classes, formatter, data,
  handleChangePage, handleOpen, handleChangeRowsPerPage,
}) => {
  return (
    <>
      <TableContainer className={classes.container}>
        <Table>
          <TableHeaders />
          <TableBody>
            {data.slice(page * rowsPerPage,
              page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow onClick={() => handleOpen(row)} hover key={row._id}>
                  <TableCell>
                    {row.orderRef}
                  </TableCell>
                  <TableCell>
                    {row?.invoice?.user?.name}
                  </TableCell>
                  <TableCell>
                    {row?.invoice?.user?.phoneNumber}
                  </TableCell>
                  <TableCell>
                    {formatter.format(row.amount)}
                  </TableCell>
                  <TableCell>
                    {row?.invoice?.delivery?.state}
                  </TableCell>
                  <TableCell>
                    {row.status}
                    <StatusBullet
                      size="sm"
                      color={statusColors[row.status]}
                    />
                  </TableCell>
                  <TableCell>
                    {row.deliveryStatus}
                    <StatusBullet
                      size="sm"
                      color={statusColors[row.deliveryStatus]}
                    />
                  </TableCell>
                  <TableCell>
                    {row.paymentType}
                  </TableCell>
                  <TableCell>
                    {formatter.format(row?.invoice?.delivery?.price || 0)}
                  </TableCell>
                  <TableCell>
                    {moment(row.createdAt).format('LL')}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        page={page}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        rowsPerPageOptions={[10, 25, 100]}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TableBodyData;
