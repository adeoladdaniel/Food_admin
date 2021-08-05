import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { BASE_URL } from '../../services/config';
import useMutationQuery from '../../hooks/api/useMutationQuery';
import { handleError } from '../../errors/HandleError';
import ProductUpload from '../../components/ProductUpload/ProductUpload';
import useGetQuery from '../../hooks/api/useGetQuery';

const useStyles = makeStyles((theme) => ({
  breadCrumbs: {
    flexGrow: 1,
    width: '90%',
    margin: theme.spacing(0.5, 'auto'),
    backgroundColor: theme.palette.background.default,
  }
}));

const onError = (error) => {
  const { message } = handleError(error);
  toast.error(message);
};

const onSuccess = (res) => {
  toast.success(res?.data?.message);
};

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

const ReUploadProduct = (props) => {
  const { match: { params } } = props;
  const classes = useStyles();
  const { mutate, isLoading: loading } = useMutationQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: `/products/re-upload-stock/${params?.id}`,
    type: 'put'
  });

  const { data: response, isLoading } = useGetQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: `/products/${params?.id}`,
    queryKey: `/products/${params?.id}`,
    options: {
      refetchOnWindowFocus: false
    }
  });

  const onMutate = (productValues) => {
    const { form } = productValues;
    // TODO: Add owner object
    const data = {
      price: form?.price,
      quantity: form?.quantity,
      basePrice: form?.basePrice,
      marketPrice: form?.marketPrice,
      expirationDate: form?.expirationDate,
      supply: form?.supply,
      ref: []
    };
    mutate(data, { onSuccess, onError });
  };

  return (
    <div>
      {isLoading ? 'loading....' : (
        <>
          <Breadcrumbs
            className={classes.breadCrumbs}
            aria-label="breadcrumb"
          >
            <LinkRouter to="/products">
              all product
            </LinkRouter>
          </Breadcrumbs>
          <ProductUpload
            {...props}
            type="Mtype"
            onSubmit={onMutate}
            loading={loading}
            productById={response?.data}
          />
        </>
      )}
    </div>
  );
};

ReUploadProduct.propTypes = {
  props: PropTypes.object.isRequired
};

export default ReUploadProduct;
