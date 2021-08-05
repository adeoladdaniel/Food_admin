import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Alert } from '@material-ui/lab/';
import {
  Divider,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import { Link, useHistory } from 'react-router-dom';
import Style from './Style';
import { handleError } from '../../../errors/HandleError';
import BackDropLoader from '../../../components/Backdrop/BackDrop';
import useMutationQuery from '../../../hooks/api/useMutationQuery';
import { BASE_URL } from '../../../services/config';

const useStyles = makeStyles((theme) => Style(theme));

const Password = ({ location }) => {
  const classes = useStyles();
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const history = useHistory();
  const { mutate, isLoading: loading } = useMutationQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: '/auth/change-password',
  });

  const handleChange = (event) => {
    const passwordStrength = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (!event.target.value.match(passwordStrength)) {
      setError(' password strength is too weak');
    } else {
      setError('');
    }
    setPassword(event.target.value);
  };

  const onError = (error) => {
    const { message } = handleError(error);
    setMessage(message);
  };

  const onSuccess = () => {
    history.push('/sign-in');
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    const resetId = queryString.parse(location.search).token || null;
    if (password !== confirmPassword) {
      return toast.error('Please your password doest not match', {
        toastId: 'wrong'
      });
    }
    if (!resetId) {
      return toast.error('Something went wrong', {
        toastId: 'wrong'
      });
    }
    const data = {
      token: resetId,
      password
    };
    mutate(data, { onSuccess, onError });
  };

  const checkPasswordMatch = (e) => {
    setConfirmPassword(e.target.value);
    if (password === e.target.value) {
      setMessage('');
    } else {
      setMessage('Password does not match');
    }
  };

  return (
    <>
      {loading && <BackDropLoader />}
      <Divider />
      {message && (
        <Alert variant="outlined" severity="error">
          {message}
        </Alert>
      )}
      <form className={classes.card} onSubmit={updatePassword}>
        <TextField
          label="Password"
          name="password"
          fullWidth
          error={!!error}
          helperText={error}
          onChange={handleChange}
          className={classes.textField}
          type="password"
          variant="filled"
          required
        />

        <TextField
          label="Confirm Password"
          fullWidth
          name="confirmPassword"
          value={confirmPassword}
          onChange={checkPasswordMatch}
          className={classes.textField}
          type="password"
          required
          variant="filled"
        />
        <div>
          <Button
            className={classes.textField}
            color="secondary"
            type="submit"
            fullWidth
            disabled={!!loading}
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </form>
      <Divider />
      <div>
        <Typography color="textPrimary" variant="h6">
          Having issues ? click
          {' '}
          <Link to="/forgot-password">here</Link>
          {' '}
          to try again
        </Typography>
      </div>
    </>
  );
};

export default Password;
