import React, { useEffect, useMemo, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { Button, makeStyles, /* MenuItem */ } from '@material-ui/core';
import useProductView from './hooks/useProductView';
import useGetQuery from '../../hooks/api/useGetQuery';
import CustomizableTable from '../../components/CustomTable/CustomTable';
import { BASE_URL } from '../../services/config';
import LoadingCenter from '../../components/LoadingCenter/LoadingCenter';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '96%',
    margin: theme.spacing(0.5, 'auto'),
  },
  Paper: {
    backgroundColor: theme.palette.background.paper,
  },
  addBtn: {
    margin: theme.spacing(1, 'auto'),
  },
}));

const ProductsView = (props) => {
  const { history } = props;
  const classes = useStyles();
  const { data: response, refetch, isLoading } = useGetQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: '/products',
    queryKey: 'all-products',
  });

  const { productHeader } = useProductView({ refetch });
  const [data, setData] = useState(useMemo(() => [], []));
  const [skipPageReset] = useState(false);

  const addProducts = () => history.push('/products/new');

  const productDetails = (prop) => history.push(`/products/${prop}`);

  useEffect(() => {
    setData(response);
  }, [response]);

  return (
    <div className={classes.root}>
      <div>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          onClick={addProducts}
          className={classes.addBtn}
        >
          Add New Products
        </Button>
      </div>
      <Paper>
        {isLoading ? <LoadingCenter /> : (
          <CustomizableTable
            actionKey="id"
            setData={setData}
            columns={productHeader}
            onClick={productDetails}
            data={data?.data?.docs || []}
            skipPageReset={skipPageReset}
            tableTitle={`${data?.data?.docs.length} Products`}
          />
        )}
      </Paper>
    </div>
  );
};

export default ProductsView;
