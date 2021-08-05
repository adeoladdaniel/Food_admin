/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useReducer, useState
} from 'react';
import {
  Card,
  CardHeader,
  makeStyles,
} from '@material-ui/core';
import { CSVheaders, giftsReducer } from './reducer';
import TableCard from './TableCard';
import Filters from './Filters';
import { Styles } from './Style';
import CSVDownLoad from '../../../components/DownLoad/CSVDownLoad';
import { BASE_URL } from '../../../services/config';
import useGetQuery from '../../../hooks/api/useGetQuery';

const useStyles = makeStyles((theme) => (Styles(theme)));

const PurchaseTableContent = () => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [filteredData, dispatch] = useReducer(giftsReducer, {});
  const { data, isLoading } = useGetQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: '/purchase/all-purchased-products',
    queryKey: '/purchase/all-purchased-products',
  });

  const handlePageChange = (_, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    const { value } = event.target;
    setRowsPerPage(value);
  };

  useEffect(() => {
    if (data?.data) {
      dispatch({
        type: 'GET_ALL',
        payload: data?.data
      });
    }
  }, [data]);

  return (
    <Card className={classes.root}>
      <CardHeader
        title={`(${filteredData?.details?.length}) Purchase History`}
        action={(
          <CSVDownLoad
            data={filteredData.details}
            CSVheaders={CSVheaders}
          />
        )}
      />
      <Filters
        data={data}
        setPage={setPage}
        classes={classes}
        dispatch={dispatch}
      />
      <TableCard
        data={data?.data}
        page={page}
        classes={classes}
        loading={isLoading}
        rowsPerPage={rowsPerPage}
        filteredData={filteredData}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
      />
    </Card>
  );
};

export default PurchaseTableContent;
