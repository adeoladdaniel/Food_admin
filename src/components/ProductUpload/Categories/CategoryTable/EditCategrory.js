import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { toast } from 'react-toastify';
import CustomModal from '../../../custommodal/CustomModal';
import useMutationQuery from '../../../../hooks/api/useMutationQuery';
import { handleError } from '../../../../errors/HandleError';
import { BASE_URL } from '../../../../services/config';

const onError = (error) => {
  const { message } = handleError(error);
  toast.error(message);
};

const EditCategory = ({ row, refetch }) => {
  const [state, setState] = useState('');
  const { mutate, isLoading } = useMutationQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: `/products/categories/${state?._id}`,
    queryKey: 'all-product-category',
    type: 'put'
  });
  const [open, setOpen] = useState(false);

  const onSuccess = (res) => {
    toast.success(res?.data?.message);
    refetch();
    setOpen(!open);
  };

  const editCategory = () => {
    mutate({ name: state?.name }, { onSuccess, onError });
  };

  return (
    <>
      <IconButton onClick={() => {
        setState(row.original);
        setOpen(!open);
      }}
      >
        <EditIcon />
      </IconButton>
      <CustomModal open={open} setOpen={setOpen}>
        <TextField
        // fullWidth
          label="Title"
          size="small"
          name="title"
          onChange={(e) => setState({ ...state, name: e.target.value })}
          value={state.name}
          variant="outlined"
        />
        <Button
          type="submit"
          size="medium"
          variant="contained"
          color="primary"
          disabled={!!isLoading}
          onClick={editCategory}
        >
          Continue
        </Button>
      </CustomModal>
    </>
  );
};

EditCategory.propTypes = {
  row: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired
};

export default EditCategory;
