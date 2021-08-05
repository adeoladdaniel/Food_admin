import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core';
import { BASE_URL } from '../../services/config';
import useMutationQuery from '../../hooks/api/useMutationQuery';
import { handleError } from '../../errors/HandleError';
import ProductUpload from '../../components/ProductUpload/ProductUpload';
import useGetQuery from '../../hooks/api/useGetQuery';
import BackDropLoader from '../../components/Backdrop/BackDrop';

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

const AddMeasurementType = (props) => {
  const { match: { params } } = props;
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { mutate, isLoading: loading } = useMutationQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: '/products/unit-selling-price',
  });
  const { data: response, isLoading } = useGetQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: `/products/${params?.id}`,
    queryKey: `/products/${params?.id}`,
    options: {
      refetchOnWindowFocus: false
    }
  });

  const onSuccess = (res) => {
    toast.success(res?.data?.message);
    setOpen(!open);
    // history.push('/products');
  };

  const onMutate = (productValues) => {
    const formData = new FormData();
    const { form } = productValues;
    // TODO: Add owner object
    formData.append('unit', form?.unit);
    formData.append('title', form?.title);
    formData.append('price', form?.price);
    formData.append('productId', form?._id);
    formData.append('image', form?.imageUrl?.files);
    formData.append('marketPrice', form?.marketPrice);
    formData.append('description', form?.description);
    formData.append('conversionUnit', form?.conversionUnit);
    formData.append('visibility', form?.isVisible?.open === true ? 'on' : 'off');
    mutate(formData, { onSuccess, onError });
  };

  return (
    <div>
      {loading && <BackDropLoader />}
      {isLoading ? 'Fetching Data....' : (
        <>
          <Breadcrumbs className={classes.breadCrumbs} aria-label="breadcrumb">
            <Link color="inherit" href="/products">
              all product
            </Link>
            <Link color="inherit" href={`/products/edit/${params?.id}`}>
              Edit products
            </Link>
          </Breadcrumbs>
          <ProductUpload
            {...props}
            type="Mtype"
            stepNumber={2}
            onSubmit={onMutate}
            loading={loading}
            productById={response?.data}
          />
        </>
      )}
    </div>
  );
};

AddMeasurementType.propTypes = {
  props: PropTypes.object.isRequired
};

export default AddMeasurementType;
