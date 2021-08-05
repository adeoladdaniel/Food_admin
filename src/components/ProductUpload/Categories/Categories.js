import React, { useState, useEffect, useMemo } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import useTablePattern from './hooks/useTablePattern';
import TemporaryDrawer from '../../Drawer/Temporary/Temporary';
import CustomizableTable from '../../CustomTable/CustomTable';
import useMutationQuery from '../../../hooks/api/useMutationQuery';
import { handleError } from '../../../errors/HandleError';
import { BASE_URL } from '../../../services/config';
import useGetQuery from '../../../hooks/api/useGetQuery';
import { getProductCategory } from '../../../redux/reducers/slicers/Products';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400
  },
  title: {
    textAlign: 'center',
    margin: theme.spacing(0.6, 0),
    padding: theme.spacing(1.2, 0),
  },
  form: {
    textAlign: 'center',
    margin: theme.spacing(1, 0),
    '& > *': {
      margin: theme.spacing(0, 0.7),
    }
  },
}));

const BtnProps = {
  variant: 'outlined',
  color: 'primary'
};

const onError = (error) => {
  const { message } = handleError(error);
  toast.error(message);
};

const Categories = () => {
  const classes = useStyles();
  const { mutate, isLoading } = useMutationQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: '/products/categories',
  });

  const { data: response, refetch } = useGetQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: '/products/categories',
    queryKey: 'all-product-category',
    options: {
      refetchOnWindowFocus: false
    }
  });
  const { memoizedHeader } = useTablePattern({ refetch });
  const [state, setState] = useState('');
  const [data, setData] = useState(useMemo(() => [], []));
  const [skipPageReset] = useState(false);
  const dispatch = useDispatch();

  const onSuccess = (res) => {
    toast.success(res?.data?.message);
    refetch();
  };

  const addCategory = (e) => {
    e.preventDefault();
    mutate({ name: state }, { onSuccess, onError });
  };

  useEffect(() => {
    setData(response);
    dispatch(getProductCategory(response?.data));
  }, [dispatch, response]);

  return (
    <TemporaryDrawer
      btnText="Add Category"
      BtnProps={BtnProps}
      slider="right"
    >
      <div>
        <Typography className={classes.title} variant="h4">
          Product Categories
        </Typography>
        <Divider />
        <form className={classes.form} onSubmit={addCategory}>
          <div>
            <TextField
              required
              size="small"
              label="Title"
              name="title"
              onChange={(e) => setState(e.target.value)}
              variant="outlined"
            />
            <Button
              size="medium"
              type="submit"
              variant="contained"
              color="primary"
              disabled={!!isLoading}
              classes={classes.button}
            >
              Add
            </Button>
          </div>
        </form>
        <div style={{ margin: '.5rem' }}>
          <CustomizableTable
            data={data?.data || []}
            withoutSearchBar
            setData={setData}
            columns={memoizedHeader}
            skipPageReset={skipPageReset}
          />
        </div>
      </div>
    </TemporaryDrawer>

  );
};

Categories.propTypes = {

};

export default Categories;
