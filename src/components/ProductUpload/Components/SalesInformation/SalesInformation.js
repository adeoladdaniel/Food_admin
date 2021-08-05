import React from 'react';
import {
  Divider,
  Grid,
  Button,
  TextField,
  makeStyles,
} from '@material-ui/core';
import { yupResolver } from '@hookform/resolvers';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import Style from './Style';
import { salesInformationValidator } from '../Validator';
import { currentState } from '../../../../utils/localStore';

const useStyles = makeStyles((theme) => Style(theme));

const SalesInformation = ({
  dispatch, productValues,
  setValue, value: stepNumber
}) => {
  const classes = useStyles();
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(salesInformationValidator)
  });

  const saveProductInfo = (values) => {
    const modifiedDate = moment(values.expirationDate).format('YYYY-MM-DD');
    values.expirationDate = modifiedDate;
    const data = {
      ...values,
    };
    dispatch({
      type: 'ADD_PRODUCT',
      payload: { data }
    });
    dispatch({
      type: 'MOVE_STEP',
      payload: { steps: stepNumber + 1 }
    });
    setValue((c) => c + 1);
  };

  return (
    <form onSubmit={handleSubmit(saveProductInfo)}>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <TextField
            id="State-id"
            select
            fullWidth
            name="state"
            inputRef={register}
            error={errors?.state}
            variant="outlined"
            SelectProps={{
              native: true
            }}
            defaultValue={productValues?.form?.state}
            helperText={
              errors?.state
                ? errors.state.message
                : 'Enter available state'
            }
          >
            <option value={productValues?.form?.state}>
              {productValues?.form?.state || 'Choose State'}
            </option>
            {currentState.map((option) => (
              <option
                key={option.id}
                value={option.name}
              >
                {option.name}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            type="date"
            name="expirationDate"
            placeholder="e.g product expiration date"
            inputRef={register}
            helperText={errors?.expirationDate ? errors.expirationDate.message : 'Product Expiring Date'}
            error={errors?.expirationDate}
            defaultValue={moment(productValues?.form?.expirationDate).format('YYYY-MM-DD')}
            id="expirationDate-id"
            variant="outlined"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            id="blogLink-id"
            fullWidth
            type="url"
            label="Blog Link"
            name="blogLink"
            placeholder="https://example.com"
            defaultValue={productValues?.form?.blogLink}
            inputRef={register}
            variant="outlined"
            helperText={errors?.blogLink ? errors?.blogLink?.message : ''}
            error={errors?.blogLink}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            id="video-id"
            fullWidth
            type="url"
            placeholder="https://example.com"
            label=" Video Link"
            name="videoLink"
            defaultValue={productValues?.form?.videoLink}
            inputRef={register}
            variant="outlined"
            helperText={errors?.videoLink ? errors.videoLink.message : ''}
            error={errors?.videoLink}
          />
        </Grid>
      </Grid>
      <Divider />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Continue
      </Button>
    </form>
  );
};

export default SalesInformation;
