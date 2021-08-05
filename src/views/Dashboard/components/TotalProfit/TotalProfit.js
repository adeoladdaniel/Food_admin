import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card, CardContent, Grid, Typography
} from '@material-ui/core';
import { formatter } from '../../../../utils/localStore';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  }
}));

const TotalProfit = (props) => {
  const { ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={classes.root}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography className={classes.title} color="inherit" gutterBottom variant="body2">
              TOTAL PROFIT
            </Typography>
            <Typography color="inherit" variant="h5">
              {formatter.format(0)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TotalProfit;
