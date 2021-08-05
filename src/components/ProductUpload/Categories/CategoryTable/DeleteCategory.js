import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from 'react-toastify';
import IconButton from '@material-ui/core/IconButton';
import CustomModal from '../../../custommodal/CustomModal';
import { BASE_URL } from '../../../../services/config';
import { handleError } from '../../../../errors/HandleError';
import useMutationQuery from '../../../../hooks/api/useMutationQuery';

const onError = (error) => {
  const { message } = handleError(error);
  toast.error(message);
};

const DeleteCategory = ({ refetch, row }) => {
  const [open, setOpen] = useState(false);
  const { mutate, isLoading } = useMutationQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: `/products/categories/${row?.original?._id}`,
    type: 'delete'
  });

  const onSuccess = (res) => {
    toast.success(res?.data?.message);
    refetch();
    setOpen(!open);
  };

  const deleteCategory = () => {
    mutate({}, { onSuccess, onError });
  };

  return (
    <>
      <IconButton onClick={() => {
        setOpen(!open);
      }}
      >
        <DeleteIcon color="error" />
      </IconButton>
      <CustomModal open={open} setOpen={setOpen}>
        <Alert severity="warning">
          Note that you are about this food item category from this platform
        </Alert>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!!isLoading}
          onClick={deleteCategory}
        >
          Delete
        </Button>
      </CustomModal>
    </>
  );
};

DeleteCategory.propTypes = {
  row: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired
};

export default DeleteCategory;
