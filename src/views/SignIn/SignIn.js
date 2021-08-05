import React, { useState } from 'react';
import {
  makeStyles,
  Divider,
  Paper,
  Button,
  TextField,
  Typography,
  Container,
  Avatar
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Style from './Style';
import { handleError } from '../../errors/HandleError';
import { BASE_URL } from '../../services/config';
import { getPrevLocation } from '../../utils/functions/userData';
import useMutationQuery from '../../hooks/api/useMutationQuery';
import { onSuccess as authentication } from '../../redux/reducers/slicers/auth';

const useStyles = makeStyles((theme) => Style(theme));

const SignIn = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState({});
  const dispatch = useDispatch();
  const { mutate, isLoading } = useMutationQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: '/auth/login',
  });

  const handleChange = (event) => {
    event.persist();
    setFormState((formState) => ({
      ...formState,
      [event.target.name]: event.target.value
    }));
  };

  const onError = (error) => {
    const { message } = handleError(error);
    setMessage(message);
  };

  const onSuccess = (res) => {
    const token = res.headers['x-auth-token'] || res.headers['X-Auth-Token'];
    const userData = res.data;
    dispatch(authentication({ token, userData }));
    const prevLocationPath = getPrevLocation();
    if (prevLocationPath) {
      history.push(prevLocationPath);
    } else {
      history.push('/');
    }
  };

  const handleSignIn = (event) => {
    event.preventDefault();

    mutate(formState, { onSuccess, onError });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Typography variant="h3">Admin Login</Typography>
        <Divider />
        <Avatar
          className={classes.img}
          height="100"
          alt="admin"
        />
        <form className={classes.form} onSubmit={handleSignIn}>
          {message && (
            <Alert variant="outlined" severity="error">
              {message}
            </Alert>
          )}
          <Typography
            align="center"
            className={classes.sugestion}
            color="textSecondary"
            variant="body1"
          >
            login with email address
          </Typography>
          <TextField
            className={classes.textField}
            fullWidth
            required
            label="Email address"
            name="email"
            onChange={handleChange}
            type="text"
            value={formState.email || ''}
            variant="outlined"
          />
          <TextField
            className={classes.textField}
            fullWidth
            required
            label="Password"
            name="password"
            onChange={handleChange}
            type="password"
            value={formState.password || ''}
            variant="outlined"
          />
          <Button
            className={classes.textField}
            color="primary"
            disabled={!!isLoading}
            fullWidth
            required
            size="large"
            type="submit"
            variant="contained"
          >
            Sign in now
          </Button>
        </form>
        <Typography color="textPrimary" variant="h6">
          <Link to="/forgot-password">Forgot Password ?</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default SignIn;
