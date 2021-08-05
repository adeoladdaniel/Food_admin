import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';
import { useSelector } from 'react-redux';
// import { useUtils } from '@material-ui/pickers';
import Cooperatives from './Cooperatives/Cooperatives';
import { useQuery } from '../../hooks/useQuery';
import GiftTableContent from './Cooperatives/Table/GiftTableContent';
import { a11yProps, SalesTabs, TabPanel } from './TabPanel/SalesTabs';
import PurchaseTableContent from './SalesHistory/PurchaseTableContent';
import useGetQuery from '../../hooks/api/useGetQuery';
import { BASE_URL } from '../../services/config';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

const apiKey = process.env.REACT_APP_COOPERATIVE_API_KEY;

export default function SalesDashBoard(props) {
  const { history, location } = props;
  const classes = useStyles();
  const coops = useSelector((state) => state.cooperatives.coops);
  const [coopId, setCoopId] = useState(() => (coops.length ? coops[1]?._id : ''));
  const page = useQuery(location).get('page-view');
  const [value, setValue] = useState(() => (page ? Number(page) : 0));
  const { data: res, isLoading, refetch } = useGetQuery({
    baseUrl: BASE_URL.COOPERATIVE,
    endpoint: `/gift/claim?api_key=${apiKey}&cooperativeId=${coopId}`,
    queryKey: '/gift-all',
  });

  const handleChange = (_, value) => {
    setValue(value);
    history.replace(`?page-view=${value}`);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <SalesTabs
          value={value}
          handleChange={handleChange}
          a11yProps={a11yProps}
        />
      </AppBar>
      <TabPanel value={value} index={0}>
        <Cooperatives
          {...props}
          pageNum={value}
          coopId={coopId}
          setCoopId={setCoopId}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GiftTableContent
          {...props}
          coopId={coopId}
          setCoopId={setCoopId}
          data={res}
          getData={refetch}
          loading={isLoading}
          pageNum={value}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PurchaseTableContent
          {...props}
        />
      </TabPanel>
    </div>
  );
}
