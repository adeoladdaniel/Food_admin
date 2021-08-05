import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { FilePond } from 'react-filepond';
import TextField from '@material-ui/core/TextField';
import ColorSelector from 'react-color-selector';
import { platformTypes } from '../../../../../utils/AccountStatus';

const pickerData = {
  col: 6,
  row: 10,
  width: 220,
  height: 150,
};

const Uploads = ({
  updateImage,
  handleChange,
  setPrimaryCr,
  platFormInfo,
  setSecondaryCr,
  platformById
}) => {
  return (
    <>
      {platFormInfo.type === platformTypes[1] && (
        <Grid item md={12} xs={12}>
          <TextField
            fullWidth
            label="Delivery WebhookUrl"
            name="deliveryWebhookUrl"
            onChange={handleChange}
            variant="outlined"
            required
          />
        </Grid>
      )}
      <Grid item md={12} xs={12}>
        <TextField
          fullWidth
          label="Auth Url"
          name="authUrl"
          onChange={handleChange}
          variant="outlined"
          required
        />
      </Grid>
      <Grid item md={12} xs={12}>
        <FilePond
          maxFiles={3}
          maxFileSize="100KB"
          label
          files={platformById?.logo}
          allowMultiple={false}
          allowFileSizeValidation
          onupdatefiles={updateImage}
          labelMaxFileSize="Maximum file size is 100KB"
        />
      </Grid>
      {platFormInfo.type === platformTypes[0] && (
        <>
          <Grid item md={6} xs={12}>
            <Typography variant="h4">Primary Color</Typography>
            <ColorSelector
              pallet={pickerData}
              selectedColor={setPrimaryCr}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="h4">Secondary Color</Typography>
            <ColorSelector
              pallet={pickerData}
              selectedColor={setSecondaryCr}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default Uploads;
