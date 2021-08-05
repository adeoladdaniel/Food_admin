import React, { useEffect } from 'react';
import {
  Grid,
  Typography,
  Divider,
  makeStyles,
  CardContent,
  CardHeader
} from '@material-ui/core';
import moment from 'moment';
import { productsDataStyles } from './Styles';
import { formatter } from '../../../../utils/localStore';
import { statusColors } from '../../../../utils/AccountStatus';
import { StatusBullet } from '../../../../components';
import UpdateDeliveryStatus from '../../../../components/OrderUpdateAction/Actions';

const useStyles = makeStyles((theme) => productsDataStyles(theme));

const CustomerOrdersDetails = ({ data, isAdmin, url }) => {
  const classes = useStyles();

  useEffect(() => {

  }, []);
  return (
    <div className={classes.root}>
      {data ? (
        <>
          <CardHeader
            title={(
              <>
                <Typography
                  className={classes.content}
                  variant="h3"
                  color="primary"
                >
                  Order Information
                </Typography>
                <span className={classes.chip}>{data?.status}</span>
                <StatusBullet
                  color={statusColors[data?.status]}
                  size="sm"
                />
              </>
            )}
          />
          <CardContent>
            <div>
              {isAdmin && (
                <UpdateDeliveryStatus
                  url={url}
                  type="coop_gift"
                  isCoop
                  orderRef={data?.code}
                  deliveryStatus={data?.status}
                />
              )}
              <Grid container className={classes.content} spacing={3}>
                <Grid item lg={4} md={12} xl={6} xs={12}>
                  <Typography className={classes.content} variant="h5" color="primary">
                    Customer Details
                  </Typography>
                  <div className={classes.imageCard}>
                    <div className={classes.slots}>
                      <span className={classes.slotTitle}>
                        <strong>Gift Code: </strong>
                        {' '}
                        {data.code}
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
                        {data.user?.name}
                      </span>
                    </div>
                    <Divider />
                    <div className={classes.slots}>
                      <span className={classes.slotTitle}>
                        <strong> Email : </strong>
                        {data.user?.email}
                      </span>
                    </div>
                    <Divider />
                    <div className={classes.slots}>
                      <span className={classes.slotTitle}>
                        <strong> Phone Number : </strong>
                        {data.user?.phoneNumber}
                      </span>
                    </div>
                    <Divider />
                  </div>
                </Grid>

                <Grid item lg={6} md={12} xl={6} xs={12}>
                  <Typography className={classes.content} variant="h5" color="primary">
                    Delivery Details
                  </Typography>
                  <>
                    <Divider />
                    <div className={classes.slots}>
                      <span className={classes.slotTitle}>
                        <strong>Delivery Fee : </strong>
                        {formatter.format(data?.delivery?.price)}
                      </span>
                    </div>
                    <Divider />
                    <div className={classes.slots}>
                      <span className={classes.slotTitle}>
                        <strong>Delivery State (Office Location) : </strong>
                        {data?.delivery?.state}
                      </span>
                    </div>
                    <div className={classes.slots}>
                      <span className={classes.slotTitle}>
                        <strong>Delivery Address : </strong>
                        {data?.delivery?.address}
                      </span>
                    </div>
                    <div className={classes.slots}>
                      <span className={classes.slotTitle}>
                        <strong>Delivery Type : </strong>
                        {data?.delivery?.type}
                      </span>
                    </div>
                  </>

                  <Divider />
                  <div className={classes.slots}>
                    <span className={classes.slotTitle}>
                      <strong>Gift Tag : </strong>
                      {data?.tagName}
                    </span>
                  </div>
                  <div className={classes.slots}>
                    <span className={classes.slotTitle}>
                      <strong>Gift Code : </strong>
                      {data?.code}
                    </span>
                  </div>
                  <Divider />
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </>
      ) : ''}
    </div>
  );
};

export default CustomerOrdersDetails;
