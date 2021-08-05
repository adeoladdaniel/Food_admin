import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { AccountProfile, AccountDetails } from './components';
import useGetQuery from '../../hooks/api/useGetQuery';
import { BASE_URL } from '../../services/config';
import LoadingCenter from '../../components/LoadingCenter/LoadingCenter';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Account = () => {
  const classes = useStyles();
  const { data, refetch, isLoading } = useGetQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: '/users',
    queryKey: 'userId',
    options: {
      refetchOnWindowFocus: false
    }
  });

  return (
    <div className={classes.root}>
      {isLoading ? <LoadingCenter /> : (
        <Grid container spacing={4}>
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <AccountProfile data={data} />
          </Grid>
          <Grid item lg={8} md={6} xl={8} xs={12}>
            <AccountDetails
              data={data}
              refetch={refetch}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Account;
