import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import TableBodyData from './Table/TableBodyData';
import CustomModal from '../custommodal/CustomModal';
import EmptyList from '../EmptyList/EmptyList';
import { formatter } from '../../utils/localStore';
import LoadingCenter from '../LoadingCenter/LoadingCenter';
import OrderDetails from './Details/Details';
import CSVDownLoad from '../DownLoad/CSVDownLoad';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 1000,
    width: 'auto',
  },
});

const url = '/orders/delivery-status';

const CoopOrders = ({
  data, loading, error, isAdmin
}) => {
  const classes = useStyles();
  const [open, setopen] = useState(false);
  const [productId, setProductId] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = (data) => {
    setProductId(data);
    setopen(true);
  };

  const CSVheaders = [
    { label: 'fishy', key: 'invoice[products]' },
    { label: 'OrderRef', key: 'orderRef' },
    { label: 'Name', key: 'invoice.user.name' },
    { label: 'Email', key: 'invoice.user.email' },
    { label: 'Amount', key: 'amount' },
    { label: 'Delivery Fee', key: 'invoice.delivery.price' },
    { label: 'Address', key: 'invoice.delivery.address' },
    { label: 'Phone Number', key: 'invoice.user.phoneNumber' },
    { label: 'Payment Status', key: 'status' },
    { label: 'Delivery status', key: 'deliveryStatus' },
    { label: 'Products', key: 'deliveryStatus' },
    { label: 'Order Date', key: 'createdAt' },
  ];

  return (
    <div>
      <CustomModal
        addCloseIcon
        setOpen={setopen}
        outBoxClose
        open={open}
      >
        <OrderDetails
          url={url}
          isAdmin={isAdmin}
          data={productId}
        />
      </CustomModal>
      <Card>
        <CardHeader
          title={(
            <Typography variant="h4">
              Cooperative Orders
            </Typography>
          )}
          action={(
            <CSVDownLoad
              CSVheaders={CSVheaders}
              data={data}
              filename="Coop_Orders.csv"
            />
          )}
        />
        {error && <Alert severity=" error">{error}</Alert>}
        <CardContent>
          {loading ? <LoadingCenter /> : (
            <>
              {data.length ? (
                <TableBodyData
                  classes={classes}
                  data={data}
                  formatter={formatter}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  rowsPerPage={rowsPerPage}
                  handleOpen={handleOpen}
                  page={page}

                />
              ) : <EmptyList />}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

CoopOrders.defaultProps = {
  data: [],
};

export default CoopOrders;
