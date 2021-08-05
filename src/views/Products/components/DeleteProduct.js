import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from 'react-toastify';
import { handleError } from '../../../errors/HandleError';
import useMutationQuery from '../../../hooks/api/useMutationQuery';
import { BASE_URL } from '../../../services/config';
import theme from '../../../theme/palette';
import CustomModal from '../../../components/custommodal/CustomModal';
import BackDropLoader from '../../../components/Backdrop/BackDrop';

const onError = (error) => {
  const { message } = handleError(error);
  toast.error(message);
};

const DeleteProduct = ({ refetch, id, className }) => {
  const [open, setOpen] = useState(false);
  const { mutate, isLoading } = useMutationQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: `/products/${id}`,
    type: 'delete'
  });

  const onSuccess = (res) => {
    toast.success(res?.data?.message);
    refetch();
    setOpen(!open);
  };

  const deleteCategory = () => {
    mutate(null, { onSuccess, onError });
  };

  return (
    <>
      <Button
        title="Delete Product"
        className={className}
        onClick={() => {
          setOpen(!open);
        }}
        endIcon={<DeleteIcon color="error" />}
      >
        Delete
      </Button>
      <CustomModal
        addCloseIcon
        noBottomButton
        outBoxClose
        open={open}
        setOpen={setOpen}
      >
        <Alert severity="warning">
          Note that you are about this Product from FoodCrowdy Platform
        </Alert>
        {isLoading && <BackDropLoader />}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ margin: '1rem auto', background: theme.error.main }}
          disabled={!!isLoading}
          onClick={deleteCategory}
        >
          Delete
        </Button>
      </CustomModal>
    </>
  );
};

DeleteProduct.propTypes = {
  refetch: PropTypes.func.isRequired
};

export default DeleteProduct;
