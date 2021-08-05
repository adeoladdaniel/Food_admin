import React, { useState } from 'react';
import {
  AppBar,
  makeStyles
} from '@material-ui/core';

import {
  a11yPropsForCAdmin,
  CoopAdminTabPanel, CoopAdminTabs
} from './CoopAdminTabs/CoopAdminTabs';
import Cooperatives from '../Sales/Cooperatives/Cooperatives';
import { getUserData } from '../../utils/functions/userData';
import { useQuery } from '../../hooks/useQuery';
import GiftTableContent from '../Sales/Cooperatives/Table/GiftTableContent';
import useGetQuery from '../../hooks/api/useGetQuery';
import { BASE_URL } from '../../services/config';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

const coopId = getUserData('cooperative');

const apiKey = process.env.REACT_APP_COOPERATIVE_API_KEY;

export default function CoopAdmin(props) {
  const { history, location } = props;
  const classes = useStyles();
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
        <CoopAdminTabs
          value={value}
          handleChange={handleChange}
          a11yProps={a11yPropsForCAdmin}
        />
      </AppBar>
      <CoopAdminTabPanel value={value} index={0}>
        <Cooperatives
          {...props}
          isCoopAdmin
          pageNum={value}
          coopId={coopId}
        />
      </CoopAdminTabPanel>
      <CoopAdminTabPanel
        value={value}
        index={1}
      >
        <GiftTableContent
          {...props}
          isCoopAdmin
          coopId={coopId}
          data={res}
          getData={refetch}
          loading={isLoading}
          pageNum={value}
        />
      </CoopAdminTabPanel>
    </div>
  );
}
