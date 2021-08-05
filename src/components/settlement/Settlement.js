/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar
} from '@material-ui/core';

import { a11yProps, SalesTabs, TabPanel } from './Tabs/SettlementTabs';
import { useQuery } from '../../hooks/useQuery';
import DuePayments from './DuePayments/DuePayments';
import PaidBills from './PaidBills/PaidBills';
import { settlementReducer } from './Tabs/reducers';
import LoadingCenter from '../LoadingCenter/LoadingCenter';
import Processing from './Processing/Processing';
import useGetQuery from '../../hooks/api/useGetQuery';
import { BASE_URL } from '../../services/config';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(1),
    backgroundColor: theme.palette.background.paper
  }
}));

export default function Settlement(props) {
  const {
    location, history,
    isPaid, updateStatus
  } = props;
  const classes = useStyles();
  const page = useQuery(location).get('page-view');
  const [value, setValue] = useState(() => (page ? Number(page) : 0));
  const { data, isLoading, refetch } = useGetQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: '/settlement',
    queryKey: 'settlement',
  });
  const [invoices, dispatch] = useReducer(settlementReducer, []);

  const handleChange = (e, value) => {
    setValue(value);
    history.replace(`?page-view=${value}`);
  };

  return (
    <div className={classes.root}>
      <AppBar
        style={{
          borderRadius: '.7rem',
          margin: '.4rem 0'
        }}
        position="static"
        color="default"
      >
        <SalesTabs
          value={value}
          handleChange={handleChange}
          a11yProps={a11yProps}
        />
      </AppBar>
      {isLoading && <LoadingCenter />}
      <TabPanel value={value} index={0}>
        <DuePayments
          data={data?.data}
          isPaid={isPaid}
          setRefetch={refetch}
          dispatch={dispatch}
          invoices={invoices}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PaidBills
          data={data?.data}
          dispatch={dispatch}
          invoices={invoices}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Processing
          data={data?.data}
          updateStatus={updateStatus}
          setRefetch={refetch}
          dispatch={dispatch}
          invoices={invoices}
        />
      </TabPanel>
    </div>
  );
}
