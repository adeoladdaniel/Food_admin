import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import ProductUpload from '../../components/ProductUpload/ProductUpload';
import { handleError } from '../../errors/HandleError';
import useMutationQuery from '../../hooks/api/useMutationQuery';
import { BASE_URL } from '../../services/config';
import ProductDialog from './components/ProductDialog/ProductDialog';
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

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

const NewProductUpload = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState('');
  const { mutate, isLoading } = useMutationQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: '/products',
  });

  const onSuccess = (res) => {
    toast.success(res?.data?.message);
    setProductId(res?.data?.data?._id);
    setOpen(!open);
  };

  const onMutate = (productValues) => {
    const formData = new FormData();
    const { form } = productValues;
    formData.append('state', form?.state);
    formData.append('title', form?.title);
    formData.append('category', form?.category);
    formData.append('image', form?.imageUrl?.files);
    formData.append('description', form?.description);
    formData.append('vendor', JSON.stringify(form?.vendor));
    formData.append('expirationDate', form?.expirationDate);
    formData.append('supply', JSON.stringify(form?.supply));
    formData.append('defaultVariant', form?.defaultVariant);
    formData.append('platform', JSON.stringify(form?.platform));
    if (form?.blogLink) formData.append('blogLink', form?.blogLink);
    if (form?.videoLink) formData.append('videoLink', form?.videoLink);
    formData.append('mutateVariantsOnPurchase', form?.mutateVariantsOnPurchase);
    formData.append('visibility', form?.isVisible?.open === true ? 'on' : 'off');
    mutate(formData, { onSuccess, onError });
  };

  return (
    <>
      {isLoading && <BackDropLoader />}
      <ProductDialog
        setOpen={setOpen}
        open={open}
        data={productId}
      />
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
        onSubmit={onMutate}
      />
    </>
  );
};

export default NewProductUpload;
