import React, { useState } from 'react';
import {
  Button,
  CardActions,
  CardContent,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { toast } from 'react-toastify';
import { Alert } from '@material-ui/lab';
import Style from './Style';
import { settlementStatus } from '../../../utils/AccountStatus';
import { handleError } from '../../../errors/HandleError';
import BackDropLoader from '../../Backdrop/BackDrop';
import CustomModal from '../../custommodal/CustomModal';
import { BASE_URL } from '../../../services/config';
import useMutationQuery from '../../../hooks/api/useMutationQuery';

const useStyles = makeStyles((theme) => Style(theme));

const StatusChange = ({
  setRefetch,
  deliveryStatus,
  open, setOpen
}) => {
  const [status, setStatus] = useState('');
  const classes = useStyles();
  const { mutate, isLoading } = useMutationQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: '/settlement/status',
    type: 'patch'
  });

  const onError = (error) => {
    setOpen(true);
    const { message } = handleError(error);
    toast.error(message);
  };

  const onSuccess = () => {
    toast.success(`Delivery Status updated to "${status}"`);
    setRefetch(true);
  };

  const checkStatus = (status) => settlementStatus.filter((
    orderStatus
  ) => orderStatus !== status);

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const updateDeliveryStatus = async (e) => {
    e.preventDefault();
    setOpen(false);
    mutate(status, { onSuccess, onError });
  };

  return (
    <>
      {isLoading && <BackDropLoader />}
      <CustomModal
        setOpen={setOpen}
        open={open}
        addCloseIcon
        modalTitle="Update Invoice Status"
      >
        <form onSubmit={updateDeliveryStatus}>
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
              onClick={() => setOpen(false)}
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
      </CustomModal>
    </>
  );
};

export default StatusChange;
