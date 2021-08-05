/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer, useState } from 'react';
import {
  Card,
  CardHeader,
  makeStyles,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import CustomModal from '../../../../components/custommodal/CustomModal';
import CSVDownLoad from '../../../../components/DownLoad/CSVDownLoad';
import CustomerOrdersDetails from '../UserDetails/userDetailsModifed';
import { CSVheaders, giftsReducer } from './reducer';
import TableCard from './TableCard';
import Filters from './Filters';
import { Styles } from './Style';

const useStyles = makeStyles((theme) => (Styles(theme)));

const url = '/orders/delivery-status';
const GiftTableContent = ({
  data = [],
  history,
  pageNum,
  coopId,
  setCoopId,
  getData,
  loading,
  isCoopAdmin,
}) => {
  const classes = useStyles();
  const coops = useSelector((state) => state.cooperatives.coops);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState('');
  // const [state, setState] = useState('All');
  const [filteredData, dispatch] = useReducer(giftsReducer, []);
  const handlePageChange = (event, page) => {
    setPage(page);
  };
  const handleRowsPerPageChange = (event) => {
    const { value } = event.target;
    setRowsPerPage(value);
  };

  const handleCoopChange = (e) => {
    const { value } = e.target;
    setCoopId(value);
    history.replace(`?page-view=${pageNum}&cooperativeId=${value}`);
  };
  const querySearch = (e) => {
    if (e) {
      const { value } = e.target;
      dispatch({
        type: 'GET_BY_STATES',
        payload: {
          value,
          coopId,
          data
        }
      });
    }
    setPage(0);
  };

  const handleOpen = (data) => {
    setProductId(data);
    setOpen(true);
  };

  useEffect(() => {
    getData();
  }, [coopId]);

  useEffect(() => {
    if (data.length) {
      dispatch({
        type: 'GET_COOP_GIFT',
        payload: data
      });
    }
  }, [data]);

  return (
    <Card className={classes.root}>
      <CustomModal
        open={open}
        addCloseIcon
        outBoxClose
        setOpen={setOpen}
      >
        <CustomerOrdersDetails
          isAdmin
          url={url}
          data={productId}
        />
      </CustomModal>
      <CardHeader
        title={`(${filteredData.length}) Cooperatives Orders`}
        action={(
          <CSVDownLoad
            data={filteredData}
            CSVheaders={CSVheaders}
          />
        )}
      />
      <Filters
        data={data}
        coops={coops}
        coopId={coopId}
        setPage={setPage}
        classes={classes}
        dispatch={dispatch}
        isCoopAdmin={isCoopAdmin}
        querySearch={querySearch}
        handleCoopChange={handleCoopChange}
      />
      <TableCard
        data={data}
        page={page}
        classes={classes}
        loading={loading}
        handleOpen={handleOpen}
        rowsPerPage={rowsPerPage}
        filteredData={filteredData}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
      />
    </Card>
  );
};

export default GiftTableContent;
