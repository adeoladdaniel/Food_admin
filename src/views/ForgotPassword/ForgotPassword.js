import React, { useState } from 'react';
import { Alert } from '@material-ui/lab/';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
  TextField,
  makeStyles,
  Typography,
  IconButton,
  Container
} from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import Style from './Style';
import BackDropLoader from '../../components/Backdrop/BackDrop';
import { handleError } from '../../errors/HandleError';
import useMutationQuery from '../../hooks/api/useMutationQuery';
import { BASE_URL } from '../../services/config';
import { MessageResponse } from './Actions';

const useStyles = makeStyles((theme) => Style(theme));

const Password = ({ history }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [checkMail, setCheckMail] = useState(false);
  const [message, setMessage] = useState('');
  const { mutate, isLoading } = useMutationQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: '/auth/password-reset',
  });

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const goBack = () => {
    history.goBack();
  };

  const onError = (error) => {
    const { message } = handleError(error);
    setMessage(message);
  };

  const onSuccess = () => {
    setCheckMail(true);
  };

  const sendPasswordResetLink = async (e) => {
    e.preventDefault();
    mutate({ email }, { onSuccess, onError });
  };

  return (
    <Container className={classes.root} component="main" maxWidth="xs">
      {isLoading && <BackDropLoader />}
      <Card className={classes.checkMail}>
        <CardHeader
          action={(
            <IconButton onClick={goBack}>
              <ArrowForward />
            </IconButton>
          )}
          title={(
            <Typography
              variant="h4"
            >
              {!checkMail ? 'Password Recovery' : 'Check Your Mail'}
            </Typography>
          )}
        />
        <Divider />
        <CardContent>
          {message && (
            <Alert variant="outlined" severity="error">
              {message}
            </Alert>
          )}
          {checkMail ? (
            <MessageResponse setCheckMail={setCheckMail} />
          ) : (
            <>
              <form onSubmit={sendPasswordResetLink}>
                <TextField
                  fullWidth
                  label="Enter Your Email"
                  name="email"
                  onChange={handleChange}
                  style={{ marginTop: '1rem' }}
                  type="email"
                  variant="outlined"
                  required
                />
                <Button
                  className={classes.btn}
                  color="secondary"
                  type="submit"
                  fullWidth
                  disabled={!!isLoading}
                  variant="contained"
                >
                  Reset Password
                </Button>
              </form>
            </>
          )}
        </CardContent>
      </Card>

    </Container>
  );
};
export default Password;
