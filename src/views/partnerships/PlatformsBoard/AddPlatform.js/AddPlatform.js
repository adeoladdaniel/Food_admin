import React from 'react';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import PropType from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { Styles } from './Style';
import usePlatform from '../hooks/usePlatform';
import CustomizedDialogs from '../../../../components/custommodal/CustomModal';
import Uploads from './Uploads/Uploads';
import BackDropLoader from '../../../../components/Backdrop/BackDrop';
import { permissions, platformTypes } from '../../../../utils/AccountStatus';
import AllStates from '../../../../utils/NigeriaState';

const useStyles = makeStyles((theme) => (Styles(theme)));

const AddPlatform = ({
  refetch,
  setOpen,
  actionButton
}) => {
  const classes = useStyles();
  const { isOpen: open } = useSelector((state) => state.cooperatives);
  const { platformById } = useSelector((state) => state.cooperatives);
  const {
    handleChange,
    platFormInfo, onAddPlatform,
    updateImage, primaryCr, secondaryCr,
    setPrimaryCr, setSecondaryCr, isLoading
  } = usePlatform({
    refetch,
    setOpen,
    platformById
  });

  return (
    <>
      {actionButton}
      <CustomizedDialogs
        open={open}
        addCloseIcon
        noBottomButton
        modalTitle="Add Platform"
        setOpen={setOpen}
      >
        {isLoading && <BackDropLoader text="Uploading Platform" />}
        <form onSubmit={onAddPlatform}>
          <Grid className={classes.grid} container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                className={classes.textField}
                id="id-name"
                label="Name"
                fullWidth
                name="name"
                required
                value={platFormInfo.name}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>

              <TextField
                className={classes.textField}
                id="platform-state"
                select
                fullWidth
                required
                name="location"
                defaultValue={platFormInfo.location}
                onChange={handleChange}
                helperText="Please select user Platform"
                variant="outlined"
              >
                <MenuItem value="">
                  Please select  Platform State
                </MenuItem>
                {AllStates.map((option) => (
                  <MenuItem
                    key={option.state.id}
                    value={option.state.name}
                  >
                    {option.state.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                className={classes.textField}
                id="platform-type"
                select
                fullWidth
                required
                name="type"
                value={platFormInfo.type}
                onChange={handleChange}
                variant="outlined"
              >
                <MenuItem value="">
                  Please select  Platform Type
                </MenuItem>
                {platformTypes.map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                  >
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                className={classes.textField}
                id="platform-permission"
                select
                fullWidth
                required
                name="permission"
                value={platFormInfo.permission}
                onChange={handleChange}
                variant="outlined"
              >
                <MenuItem value="">
                  Please select  Platform Permission
                </MenuItem>
                {permissions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Percentage Profit"
                name="percentageProfit"
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Access Key"
                name="accessKey"
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            {platFormInfo.type === platformTypes[0] && (
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Sub Domain"
                  name="subdomain"
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </Grid>
            )}
            <Uploads
              platformById={platformById}
              handleChange={handleChange}
              updateImage={updateImage}
              primaryCr={primaryCr}
              secondaryCr={secondaryCr}
              setPrimaryCr={setPrimaryCr}
              platFormInfo={platFormInfo}
              setSecondaryCr={setSecondaryCr}
            />
          </Grid>
          <Divider />
          <Button
            type="submit"
            color="primary"
            fullWidth
            className={classes.button}
            disabled={!!isLoading}
            variant="contained"
          >
            SUBMIT
          </Button>
        </form>
      </CustomizedDialogs>
    </>
  );
};

AddPlatform.prototype = {
  refetch: PropType.func.isRequired,
  setOpen: PropType.func.isRequired,
  open: PropType.bool.isRequired,
  actionButton: PropType.node.isRequired
};

export default AddPlatform;
