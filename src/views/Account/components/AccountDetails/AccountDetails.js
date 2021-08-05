import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  MenuItem
} from '@material-ui/core';
import { toast } from 'react-toastify';
import { Alert } from '@material-ui/lab';
import { BASE_URL } from '../../../../services/config';
import allStates from '../../../../utils/NigeriaState';
import useMutationQuery from '../../../../hooks/api/useMutationQuery';
import { handleError } from '../../../../errors/HandleError';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = (props) => {
  const { data } = props;
  const [message, setMessage] = useState('');
  const classes = useStyles();

  const [values, setValues] = useState({});
  const { mutate, isLoading: loader } = useMutationQuery({
    baseUrl: BASE_URL.USERS,
    endpoint: '/user/edit-profile/',
    type: 'put'
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onError = (error) => {
    const { message } = handleError(error);
    setMessage(message);
  };

  const onSuccess = () => {
    toast.success('Account Profile Successfully Edited', { toastId: '330' });
  };

  const updateProfile = (event) => {
    event.preventDefault();
    const data = {
      name: values.name,
      location: values.location,
      phoneNumber: values.phoneNumber
    };
    mutate(data, {
      onSuccess,
      onError,
    });
  };

  useEffect(() => {
    setValues(data);
  }, [data]);

  return (
    <Card className={classes.root}>
      <form autoComplete="off" noValidate onSubmit={updateProfile}>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          {message && (
            <Alert severity="error">
              {message}
            </Alert>
          )}
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                margin="dense"
                name="email"
                disabled
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                margin="dense"
                name="phoneNumber"
                onChange={handleChange}
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                margin="dense"
                name="location"
                defaultValue="Abia"
                onChange={handleChange}
                required
                select
                variant="outlined"
              >
                <MenuItem value="">
                  Choose state
                </MenuItem>
                {allStates.map((option) => (
                  <MenuItem key={option.state.id} value={option.state.name}>
                    {option.state.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            type="submit"
            color="primary"
            disabled={!!loader}
            variant="contained"
          >
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default AccountDetails;
