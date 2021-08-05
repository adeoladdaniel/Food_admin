import React, { useState } from 'react';
import {
  makeStyles, Table,
  TableContainer,
  TablePagination,
  Paper,
  FormControlLabel,
  Switch
} from '@material-ui/core/';
import { TableStyles } from '../Styes';
import TableToolBar from './TableToolBar';
import TableHeader from './TableHeader';
import TableContent from './TableContent';
import { getComparator, stableSort } from './utils/tableFuncs';
import useTableActions from './TableActions';
import EmptyList from '../../EmptyList/EmptyList';

const useStyles = makeStyles((theme) => (TableStyles(theme)));

export default function TableParent({
  rowsDatarows,
  headerData,
  contentBody,
  isPaid, setId,
  setOpen, updateStatus,
  title, setStatus
}) {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {
    emptyRows,
    handleChangeDense,
    handleChangePage,
    handleChangeRowsPerPage,
    handleClick, handleRequestSort,
    handleSelectAllClick,
    isSelected
  } = useTableActions({
    order,
    orderBy,
    setDense,
    setOrder,
    setOrderBy,
    setSelected,
    selected,
    setRowsPerPage,
    setPage,
    rowsDatarows
  });

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolBar
          title={title}
          numSelected={selected.length}
          data={rowsDatarows}
        />
        {rowsDatarows.length
          ? (
            <>
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size={dense ? 'small' : 'medium'}
                  aria-label="enhanced table"
                >
                  <TableHeader
                    order={order}
                    classes={classes}
                    orderBy={orderBy}
                    headerData={headerData}
                    numSelected={selected.length}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rowsDatarows.length}
                  />
                  <TableContent
                    dense={dense}
                    emptyRows={emptyRows}
                    getComparator={getComparator}
                    handleClick={handleClick}
                    isSelected={isSelected}
                    order={order}
                    orderBy={orderBy}
                    page={page}
                    setId={setId}
                    setOpen={setOpen}
                    isPaid={isPaid}
                    setStatus={setStatus}
                    updateStatus={updateStatus}
                    contentBody={contentBody}
                    rows={rowsDatarows}
                    rowsPerPage={rowsPerPage}
                    stableSort={stableSort}
                  />
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rowsDatarows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </>
          )
          : <EmptyList />}
      </Paper>
      <FormControlLabel
        control={(
          <Switch
            checked={dense}
            onChange={handleChangeDense}
          />
        )}
        label="Dense padding"
      />
    </div>
  );
}
