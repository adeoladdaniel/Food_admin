import React, { useState } from 'react';
import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { toast } from 'react-toastify';
import { Alert } from '@material-ui/lab';
import Style from './Style';
import { orderDeliveryStatus } from '../../utils/AccountStatus';
import { handleError } from '../../errors/HandleError';
import BackDropLoader from '../Backdrop/BackDrop';
import CustomizedDialogs from '../custommodal/CustomModal';
import useMutationQuery from '../../hooks/api/useMutationQuery';
import { BASE_URL } from '../../services/config';

const useStyles = makeStyles((theme) => Style(theme));

const UpdateDeliveryStatus = ({
  orderRef,
  deliveryStatus,
  url, isCoop, type
}) => {
  const [state, setState] = useState(false);
  const [status, setStatus] = useState('');
  const classes = useStyles();

  const { mutate, isLoading } = useMutationQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: url,
    type: 'patch'
  });

  const handleClose = () => setState(false);

  const checkStatus = (status) => orderDeliveryStatus.filter((
    orderStatus
  ) => orderStatus !== status && orderStatus !== 'set for delivery');

  const handleChange = (e) => {
    setStatus(e.target.value);
  };
  const handleClickOpen = () => {
    setState(true);
  };

  const onError = (error) => {
    const { message } = handleError(error);
    toast.error(message);
  };

  const onSuccess = () => {
    toast.success(`Delivery Status updated to "${status}"`);
    setState(false);
  };

  const updateDeliveryStatus = async (e) => {
    e.preventDefault();
    const getPostData = () => {
      let objValues = {};
      if (isCoop) {
        objValues = {
          deliveryStatus: status,
          orderRef,
          purchaseType: type
        };
      } else {
        objValues = {
          deliveryStatus: status,
          orderRef
        };
      }
      return objValues;
    };
    mutate(getPostData, { onSuccess, onError });
  };

  return (
    <>
      {isLoading && <BackDropLoader />}
      <Button
        variant="contained"
        color="primary"
        disabled={deliveryStatus === 'delivered' && true}
        className={classes.button}
        onClick={handleClickOpen}
      >
        {deliveryStatus === 'delivered' ? 'Delivered' : 'Update'}
      </Button>
      <CustomizedDialogs setOpen={setState} open={state}>
        <form onSubmit={updateDeliveryStatus}>
          <CardHeader title="Update Delivery Status" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <Alert severity="info">
                  Action Required Update delivery report
                </Alert>
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  className={classes.textField}
                  id="outlined-select-status"
                  select
                  fullWidth
                  required
                  name="state"
                  onChange={handleChange}
                  SelectProps={{
                    native: true
                  }}
                  helperText="Please select status"
                  variant="outlined"
                >
                  <option value="">Select</option>
                  {checkStatus(deliveryStatus).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              onClick={handleClose}
              color="primary"
            >
              CANCEL
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
            >
              Submit
            </Button>
          </CardActions>
        </form>
      </CustomizedDialogs>
    </>
  );
};

export default UpdateDeliveryStatus;
