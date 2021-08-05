import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card, CardContent, Grid, Typography, Avatar
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import { MoneyOutlined, MotorcycleOutlined, ShoppingBasketRounded } from '@material-ui/icons';
import { formatter } from '../../utils/localStore';
import { orderHistoryStyle } from './Style';

const useStyles = makeStyles((theme) => (orderHistoryStyle(theme)));

const OrderSummary = ({
  totalDeliveryFee,
  totalproductFee,
  data,
}) => {
  const classes = useStyles();

  return (
    <Grid container className={(classes.root)} spacing={4}>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <Card
          className={(classes.card)}
        >
          <CardContent>
            <Grid container justify="space-between">
              <Grid item>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >
                  Total Orders
                </Typography>
                <Typography
                  variant="h4"
                >
                  {data?.length}

                </Typography>
              </Grid>
              <Grid item>
                <Avatar className={classes.totalOrder}>
                  <InsertChartIcon className={classes.icon} />
                </Avatar>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <Card
          className={(classes.card)}
        >
          <CardContent>
            <Grid container justify="space-between">
              <Grid item>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >
                  Total Delivery Fee
                </Typography>
                <Typography variant="h4">
                  {formatter.format(totalDeliveryFee)}
                </Typography>
              </Grid>
              <Grid item>
                <Avatar className={classes.delivery}>
                  <MotorcycleOutlined className={classes.icon} />
                </Avatar>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <Card
          className={(classes.card)}
        >
          <CardContent>
            <Grid container justify="space-between">
              <Grid item>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >
                  Total Product Price
                </Typography>
                <Typography variant="h4">
                  {formatter.format(totalproductFee - totalDeliveryFee)}
                </Typography>
              </Grid>
              <Grid item>
                <Avatar className={classes.productPrice}>
                  <ShoppingBasketRounded className={classes.icon} />
                </Avatar>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <Card
          className={(classes.card)}
        >
          <CardContent>
            <Grid container justify="space-between">
              <Grid item>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >
                  Total
                </Typography>
                <Typography variant="h4">
                  {formatter.format(totalproductFee)}
                </Typography>
              </Grid>
              <Grid item>
                <Avatar className={classes.total}>
                  <MoneyOutlined className={classes.icon} />
                </Avatar>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

  );
};

OrderSummary.propTypes = {
  totalDeliveryFee: PropTypes.number.isRequired,
  totalproductFee: PropTypes.number.isRequired,
  // data: PropTypes.array.isRequired,
};

export default OrderSummary;
