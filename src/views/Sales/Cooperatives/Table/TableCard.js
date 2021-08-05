import React from 'react';
import {
  Button,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import EmptyList from '../../../../components/EmptyList/EmptyList';
import { statusColors } from '../../../../utils/AccountStatus';
import { StatusBullet } from '../../../../components';
import LoadingCenter from '../../../../components/LoadingCenter/LoadingCenter';
import GiftTable from './GiftTableHead';

const TableCard = ({
  data, classes,
  page, loading,
  filteredData,
  rowsPerPage,
  handleOpen,
  handlePageChange,
  handleRowsPerPageChange,
}) => {
  return (
    <>
      {loading && <LoadingCenter />}
      {data.length ? (
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <GiftTable />
                <TableBody>
                  {(filteredData)
                    .slice(page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage)
                    .map((order) => (
                      <TableRow
                        onClick={() => handleOpen(order)}
                        key={order._id}
                      >
                        <TableCell>{order.user.name}</TableCell>
                        <TableCell>{order.user.phoneNumber}</TableCell>
                        <TableCell>
                          {order.payment}
                          <StatusBullet
                            color={statusColors[order.status]}
                            size="sm"
                          />
                        </TableCell>
                        <TableCell>
                          {moment(order.createdAt).format('LLL')}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
            <CardActions className={classes.actions}>
              <Button href="#">
                <TablePagination
                  component="div"
                  count={filteredData.length}
                  onChangePage={handlePageChange}
                  onChangeRowsPerPage={handleRowsPerPageChange}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[5, 10, 25, 50, 100]}
                />
              </Button>
            </CardActions>
          </PerfectScrollbar>
        </CardContent>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default TableCard;
