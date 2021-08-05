import React from 'react';
import {
  Grid,
  Typography,
  Divider,
  makeStyles,
  CardContent,
  CardHeader
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import moment from 'moment';
import ProductsTable from '../Products/ProductsOrders';
import { orderDetails } from './Style';
import StatusBullet from '../../StatusBullet/StatusBullet';
import { statusColors } from '../../../utils/AccountStatus';
import { formatter } from '../../../utils/localStore';
import EmptyList from '../../EmptyList/EmptyList';
import UpdateDeliveryStatus from '../../OrderUpdateAction/Actions';

const useStyles = makeStyles((theme) => orderDetails(theme));

const Details = ({
  url,
  data,
  isAdmin,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      {data ? (
        <>
          <CardHeader
            title={(
              <>
                <Typography
                  className={classes.content}
                  variant="h5"
                  color="primary"
                >
                  Order Information
                </Typography>
                <span className={classes.chip}>{data.deliveryStatus}</span>
                <StatusBullet color={statusColors[data.deliveryStatus]} size="sm" />
              </>
            )}
          />
          <CardContent>
            <div>
              {data.status === 'successful' ? (
                <Alert color="success">
                  <AlertTitle>This order was successfully paid for</AlertTitle>
                </Alert>
              ) : (
                <Alert color="error">
                  <AlertTitle>This order was not successfully paid for</AlertTitle>
                </Alert>
              )}
            </div>
            {isAdmin && (
              <UpdateDeliveryStatus
                url={url}
                type="coop_product"
                isCoop
                orderRef={data?.orderRef}
                deliveryStatus={data?.deliveryStatus}
              />
            )}
            <div>
              <Grid container className={classes.content} spacing={1}>
                <Grid item lg={4} md={12} xl={6} xs={12}>
                  <Typography className={classes.content} variant="h6" color="primary">
                    Customer Details
                  </Typography>
                  <div className={classes.imageCard}>
                    <div className={classes.slots}>
                      <span className={classes.slotTitle}>
                        <strong>Order Ref: </strong>
                        {' '}
                        {data.orderRef}
                      </span>
                    </div>
                    <Divider />
                    <div className={classes.slots}>
                      <span className={classes.slotTitle}>
                        <strong>Date: </strong>
                        {moment(data.createdAt).format('LLLL')}
                      </span>
                    </div>
                    <Divider />
                    <div className={classes.slots}>
                      <span className={classes.slotTitle}>
                        <strong> Customer Name: </strong>
                        {data?.invoice?.user?.name}
                      </span>
                    </div>
                    <Divider />
                    <div className={classes.slots}>
                      <span className={classes.slotTitle}>
                        <strong> Email : </strong>
                        {data?.invoice?.user?.email}
                      </span>
                    </div>
                    <Divider />
                    <div className={classes.slots}>
                      <span className={classes.slotTitle}>
                        <strong> Phone Number : </strong>
                        {data?.invoice?.user?.phoneNumber}
                      </span>
                    </div>
                    <Divider />
                  </div>
                </Grid>
                <Grid item lg={6} md={12} xl={6} xs={12}>
                  <Typography className={classes.content} variant="h6" color="primary">
                    Delivery Details
                  </Typography>

                  <div className={classes.slots}>
                    <span className={classes.slotTitle}>
                      <strong>Delivery Fee : </strong>
                      {formatter.format(data?.invoice?.delivery?.price)}
                    </span>
                  </div>
                  <Divider />
                  <div className={classes.slots}>
                    <span className={classes.slotTitle}>
                      <strong>Delivery State (Office Location) : </strong>
                      {data?.invoice?.delivery?.address}
                    </span>
                  </div>
                  <Divider />
                </Grid>
                <Grid item lg={12} md={12} xl={12} xs={12}>
                  <Typography className={classes.content} variant="h6" color="primary">
                    Products Details
                  </Typography>
                  <p>{`TOTAL ITEMS :${data?.invoice?.products.length}`}</p>
                  <ProductsTable items={data?.invoice?.products} />
                  <div className={classes.slots}>
                    <span className={classes.slotTitle}>
                      <strong>
                        TOTAL :
                        {' '}
                        {formatter.format(data.amount)}
                      </strong>
                    </span>
                  </div>
                  <Divider />
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </>
      ) : (
        <div style={{ width: '100%' }}>
          <EmptyList />
        </div>
      )}
    </div>
  );
};

export default Details;
