import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import ProductSource from './ProductSource';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0)
  }
}));

const Summary = ({ productValues }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item md={6}>
          <ProductSource
            classes={classes}
            productValues={productValues}
          />
        </Grid>
        <Grid item md={6}>
          k lxc kxc
        </Grid>
      </Grid>
    </div>
  );
};

export default Summary;
