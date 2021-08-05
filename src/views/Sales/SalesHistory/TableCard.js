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
import PerfectScrollbar from 'react-perfect-scrollbar';
import GiftTable from './PurchaseTableHead';
import LoadingCenter from '../../../components/LoadingCenter/LoadingCenter';
import EmptyList from '../../../components/EmptyList/EmptyList';

const TableCard = ({
  classes,
  page, loading,
  filteredData,
  rowsPerPage,
  handlePageChange,
  handleRowsPerPageChange,
}) => {
  return (
    <>
      {loading && <LoadingCenter />}
      {filteredData?.details ? (
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <GiftTable />
                <TableBody>
                  {(filteredData.details)
                    .slice(page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage)
                    .map((order) => (
                      <TableRow
                        key={order.id}
                        hover
                      >
                        <TableCell>{order.title}</TableCell>
                        <TableCell>{order.qtySold}</TableCell>
                        <TableCell>
                          {order.profit}
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
                  count={filteredData?.details.length}
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

TableCard.defaultProps = {
  filteredData: {
    details: []
  }
};
export default TableCard;
