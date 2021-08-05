import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import useMutationQuery from '../../hooks/api/useMutationQuery';
import { BASE_URL } from '../../services/config';
import { handleError } from '../../errors/HandleError';
import ProductUpload from '../../components/ProductUpload/ProductUpload';
import useGetQuery from '../../hooks/api/useGetQuery';
import BackDropLoader from '../../components/Backdrop/BackDrop';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '90%',
    margin: theme.spacing(0.5, 'auto'),
    backgroundColor: theme.palette.background.default,
  },
  form: {
    margin: theme.spacing(1),
  },
  Paper: {
    backgroundColor: theme.palette.background.paper,
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto'
  }
}));

const onError = (error) => {
  const { message } = handleError(error);
  toast.error(message);
};

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

const EditProduct = (props) => {
  const [/* editedValue */, setEditedValue] = useState({});
  const { match: { params } } = props;
  const classes = useStyles();
  const { mutate, isLoading: loading } = useMutationQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: `/products/${params?.id}`,
    type: 'patch'
  });
  const { data: response, isLoading, refetch } = useGetQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: `/products/${params?.id}`,
    queryKey: `/products/${params?.id}`,
    options: {
      refetchOnWindowFocus: false
    }
  });

  const onSuccess = (res) => {
    toast.success(res?.data?.message);
    refetch();
  };

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setEditedValue((item) => ({ ...item, [name]: value }));
  };

  const onMutate = (productValues) => {
    const formData = new FormData();
    const { form } = productValues;
    delete form?.supply.unitDescription;
    formData.append('title', form?.title);
    formData.append('state', form?.state);
    formData.append('category', form?.category);
    formData.append('description', form?.description);
    formData.append('vendor', JSON.stringify(form?.vendor));
    formData.append('expirationDate', form?.expirationDate);
    formData.append('defaultVariant', form?.defaultVariant);
    formData.append('supply', JSON.stringify(form?.supply));
    if (form?.blogLink) formData.append('blogLink', form?.blogLink);
    if (form?.videoLink) formData.append('videoLink', form?.videoLink);
    formData.append('platform', JSON.stringify(form.platform));
    formData.append('mutateVariantsOnPurchase', form?.mutateVariantsOnPurchase);
    formData.append('visibility', form?.isVisible?.open === true ? 'on' : 'off');
    if (form?.imageUrl?.files?.name) formData.append('image', form?.imageUrl?.files);
    mutate(formData, { onSuccess, onError });
  };

  return (
    <div className={classes.root}>
      {loading && <BackDropLoader />}
      {isLoading ? 'loading....' : (
        <>
          <Breadcrumbs className={classes.root} aria-label="breadcrumb">
            <LinkRouter to="/products">
              all product
            </LinkRouter>
            <LinkRouter to={`/products/add-measurement-type/${params?.id}`}>
              Add Measurement type
            </LinkRouter>
          </Breadcrumbs>
          <ProductUpload
            {...props}
            type="edit"
            refetch={refetch}
            onSubmit={onMutate}
            handleEdit={handleEdit}
            productById={response?.data}
          />
        </>
      )}
    </div>
  );
};

export default EditProduct;
