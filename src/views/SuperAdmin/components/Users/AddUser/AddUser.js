/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import { Add as AddIcon } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { stateList } from '../../../../../utils/localStore';
import CustomizedDialogs from '../../../../../components/custommodal/CustomModal';
import BackDropLoader from '../../../../../components/Backdrop/BackDrop';
import PhoneNumberField from '../../../../../components/PhoneNumberInput/PhoneNumberField';
import { Styles } from './Styles';
import useAddUser from './hooks/useAddUser';

const useStyles = makeStyles((theme) => (Styles(theme)));

const AddUser = ({ refetch }) => {
  const {
    addUser,
    setOpen,
    userData,
    setPhoneNumber,
    handleChange,
    handleClickOpen,
    isLoading, open
  } = useAddUser({ refetch });
  const platform = useSelector((state) => state.cooperatives.coops);
  const [state] = useState(stateList);
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleClickOpen}
        endIcon={<AddIcon />}
      >
        Add USer
      </Button>
      <CustomizedDialogs
        open={open}
        addCloseIcon
        noBottomButton
        setOpen={setOpen}
        modalTitle="Add User to Platform"
      >
        {isLoading && <BackDropLoader />}
        <form onSubmit={addUser}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  className={classes.textField}
                  id="platform-id"
                  select
                  fullWidth
                  required
                  name="platformId"
                  value={userData.platformId}
                  onChange={handleChange}
                  SelectProps={{
                    native: true
                  }}
                  helperText="Please select user Platform"
                  variant="outlined"
                >
                  <option value="">
                    Please select user Platform
                  </option>
                  {platform.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  className={classes.textField}
                  id="outlined-select-name"
                  label="Name"
                  fullWidth
                  name="name"
                  required
                  value={userData.name}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  variant="outlined"
                  required
                  type="email"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <PhoneNumberField
                  fullWidth
                  required
                  label="Phone Number"
                  name="phoneNumber"
                  variant="outlined"
                  onChange={(value) => setPhoneNumber(value.replace('+', ''))}

                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  className={classes.textField}
                  id="outlined-select-state"
                  select
                  fullWidth
                  required
                  name="location"
                  value={userData.state}
                  onChange={handleChange}
                  SelectProps={{
                    native: true
                  }}
                  helperText="Please select your state"
                  variant="outlined"
                >
                  <option value="">
                    Choose state
                  </option>
                  {state.map((option) => (
                    <option
                      key={option.id}
                      value={option.name}
                    >
                      {option.name}
                    </option>
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
              fullWidth
              variant="contained"
            >
              SUBMIT
            </Button>
          </CardActions>
        </form>
      </CustomizedDialogs>
    </div>
  );
};

export default AddUser;
