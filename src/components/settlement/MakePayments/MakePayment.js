import React, { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { FilePond } from 'react-filepond';
import { toast } from 'react-toastify';
import { Alert } from '@material-ui/lab';
import CustomModal from '../../custommodal/CustomModal';
import LoadingCenter from '../../LoadingCenter/LoadingCenter';
import { paymentStyles } from '../Styes';
import useMutationQuery from '../../../hooks/api/useMutationQuery';
import { BASE_URL } from '../../../services/config';
import { handleError } from '../../../errors/HandleError';

const useStyles = makeStyles((theme) => paymentStyles(theme));

const MakePayment = ({
  open, setOpen, id, setRefetch
}) => {
  const [imageUrl, setImageUrl] = useState({ files: '' });
  const { mutate, isLoading } = useMutationQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: '/settlement/receipt',
  });

  const classes = useStyles();

  const updateImage = (fileItems) => {
    setImageUrl({
      files: fileItems[0]
    });
  };

  const onError = (error) => {
    const { message } = handleError(error);
    toast.error(message);
  };

  const onSuccess = (res) => {
    setOpen(false);
    setRefetch(true);
    toast.success(res.message);
  };

  const UploadReceipt = async (e) => {
    e.preventDefault();
    const { files } = imageUrl;

    const formData = new FormData();
    formData.append('settlementId', id);
    formData.append('receipt', files?.file);
    mutate(formData, { onSuccess, onError });
  };

  return (
    <>
      <CustomModal
        addCloseIcon
        setOpen={setOpen}
        outBoxClose
        open={open}
        modalTitle="Upload Payment Receipt"
      >
        <div className={classes.root}>
          {isLoading && <LoadingCenter />}
          <form onSubmit={UploadReceipt}>
            <Alert severity="info">
              Upload an evidence of payment here
            </Alert>
            <FilePond
              allowFileSizeValidation
              maxFileSize="500KB"
              allowMultiple={false}
              maxFiles={1}
              required
              onupdatefiles={updateImage}
              labelMaxFileSize="Maximum file size is 500KB"
            />
            <Button
              fullWidth
              type="submit"
              color="primary"
              disabled={isLoading}
              variant="contained"
            >
              Submit
            </Button>
          </form>
        </div>
      </CustomModal>
    </>
  );
};

export default MakePayment;
