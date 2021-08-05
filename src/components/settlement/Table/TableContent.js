import React, { useState } from 'react';
import moment from 'moment';
import {
  Button,
  // Checkbox,
  Chip, makeStyles,
  TableBody, TableCell, TableRow
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { TableStyles } from '../Styes';
import { formatter } from '../../../utils/localStore';
import InvoiceDetails from '../../invoiceDetails/InvoiceDetails';

const useStyles = makeStyles((theme) => TableStyles(theme));

const TableContent = ({
  rows, getComparator,
  order, orderBy,
  rowsPerPage,
  stableSort,
  // handleClick,
  isPaid,
  isSelected,
  page, dense,
  emptyRows, setStatus,
  setId, updateStatus,
  setOpen
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState('');

  const routeToDetailsPage = (ids) => history.push(`/settlements/products?orderRef=${ids}`);
  return (
    <>
      <InvoiceDetails
        isOpen={isOpen}
        data={data}
        isAdmin
        setIsOpen={setIsOpen}
      />
      <TableBody>
        {stableSort(rows, getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => {
            const isItemSelected = isSelected(row.name);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <TableRow
                hover
                onClick={() => {
                  setData(row);
                  setIsOpen(!isOpen);
                }}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row._id}
                selected={isItemSelected}
              >
                {/* <TableCell padding="checkbox">
                <Checkbox
                  checked={isItemSelected}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </TableCell> */}
                <TableCell
                  className={classes.invoiceId}
                  id={labelId}
                  align="right"
                >
                  {row._id.split('').splice(7, 10)}
                </TableCell>
                <TableCell align="right">
                  {' '}
                  {moment(row.createdAt).format('LL')}
                </TableCell>
                <TableCell align="right">
                  <Chip
                    className={classes[row.status]}
                    label={row.status}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    className={classes.smallText}
                    onClick={() => {
                      routeToDetailsPage(row._id);
                    }}
                    color="primary"
                  >
                    view details
                  </Button>
                </TableCell>
                <TableCell
                  align="right"
                >
                  {formatter.format(row.totalPrice)}
                </TableCell>
                <TableCell align="right">
                  <>
                    {updateStatus && (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          setId(row._id);
                          setStatus(row.status);
                          setOpen(true);
                        }}
                        color="primary"
                      >
                        update
                      </Button>
                    ) }
                    {isPaid && (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          setId(row._id);
                          setOpen(true);
                        }}
                        color="primary"
                      >
                        Pay Now
                      </Button>
                    )}
                  </>
                </TableCell>
              </TableRow>
            );
          })}
        {emptyRows > 0 && (
          <TableRow
            style={{ height: (dense ? 33 : 53) * emptyRows }}
          >
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
    </>
  );
};

export default TableContent;
