import React, { useEffect, useReducer } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {
  Chip, Divider, Grid, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CustomDialog from '../custommodal/CustomModal';
import { formatter } from '../../utils/localStore';
import EmptyList from '../EmptyList/EmptyList';
import { invoiceReducer } from './reducer';
import SearchInput from '../SearchInput';

const useStyles = makeStyles((theme) => ({
  gridSpace: {
    padding: theme.spacing(2, 0),
  }
}));

const columns = [
  { field: 'title', headerName: 'Title', width: 300 },
  { field: 'qtySold', headerName: 'Qty Sold' },
  { field: 'profit', headerName: 'Profit(N)' },
];

const columns2 = [
  { field: 'title', headerName: 'Title', width: 300 },
  { field: 'basePrice', headerName: 'base Price(N)' },
  { field: 'qty', headerName: 'Quantity', width: 100 },
];

const addIndexID = (arr) => {
  if (arr && arr.length) {
    return arr.map((item) => ({
      ...item,
      id: Math.random()
    }));
  }
  return [];
};
const InvoiceDetails = ({
  isOpen, setIsOpen, isAdmin, data
}) => {
  const [state, dispatch] = useReducer(invoiceReducer, []);
  const { gridSpace } = useStyles();

  useEffect(() => {
    if (data) {
      dispatch({
        type: 'GET_ALL',
        payload: data
      });
    }
  }, [data]);

  return (
    <CustomDialog
      open={isOpen}
      addCloseIcon
      modalTitle={(
        <Typography
          variant="h4"
          component="strong"
        >
          Sales History
        </Typography>
      )}
      outBoxClose
      setOpen={setIsOpen}
    >
      <div>
        {state ? (
          <>
            <Grid container spacing={2}>
              <Grid className={gridSpace} item md={6} sm={12}>
                <Typography variant="body1">
                  <strong>Gross  Price :</strong>
                  {formatter.format(state?.grossPrice || 0)}
                </Typography>
              </Grid>
              <Grid item md={6} sm={12}>
                <Typography variant="body1">
                  <strong>Total  Price :</strong>
                  {formatter.format(state?.totalPrice || 0)}
                </Typography>
                <Chip color="primary" size="small" label="Payable" />
              </Grid>
              <Grid item md={6} sm={12}>
                {isAdmin && (
                  <Typography variant="body1">
                    <strong>Company Profit :</strong>
                    {formatter.format(state?.profit?.companysProfit?.totalProfit || 0)}
                  </Typography>
                )}
              </Grid>
              <Grid item md={6} sm={12}>
                <Typography variant="body1">
                  <strong>Coop Profit :</strong>
                  {formatter.format(data?.profit?.coopProfit || 0)}
                </Typography>
              </Grid>
            </Grid>
            <SearchInput
              style={{ width: '70%' }}
              placeholder="Search by customer name"
              className=""
              // onChange={handleSearch}
            />
            <div style={{ height: 300, width: 500 }}>
              <DataGrid
              // loading
                columns={columns}
                rows={state?.profit?.companysProfit?.details || []}
                pageSize={5}
              />
            </div>
            <Typography
              variant="h4"
              component="strong"
            >
              Return of Capital
            </Typography>
            <Divider />
            <Grid container spacing={1}>
              <Grid item md={6} sm={12}>
                <Typography variant="body1">
                  <strong>Total Amount :</strong>
                  {formatter.format(state?.returnOfCapital?.totalAmount || 0)}
                </Typography>
              </Grid>
              <Grid item md={6} sm={12}>
                <Typography variant="body1">
                  <strong>Total  Quantity :</strong>
                  {state?.returnOfCapital?.details[0]?.quantity}
                </Typography>
              </Grid>
            </Grid>
            <SearchInput
              style={{ width: '70%' }}
              placeholder="Search by customer name"
              className=""
              onChange="handleSearch"
            />
            <div style={{ height: 300, width: 500 }}>
              <DataGrid
                rows={addIndexID(
                  state?.returnOfCapital?.details[0]?.productDetails
                )}
                columns={columns2}
                pageSize={3}
              />
            </div>
          </>
        ) : <EmptyList /> }
      </div>
    </CustomDialog>
  );
};

export default InvoiceDetails;
