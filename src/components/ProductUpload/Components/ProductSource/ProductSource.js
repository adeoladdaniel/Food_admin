import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers';
import { useForm } from 'react-hook-form';
import Divider from '@material-ui/core/Divider';
import {
  Grid,
  TextField,
  Button,
  makeStyles,
} from '@material-ui/core';
import { productSourceValidator } from '../Validator';
import Style from './Style';
import stateList from '../../../../utils/NigeriaState';

const useStyles = makeStyles((theme) => Style(theme));

const ProductSource = ({
  dispatch, productValues, handleEdit,
  setValue, value: stepNumber, type
}) => {
  const classes = useStyles();
  const [product, setProduct] = useState('');
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(productSourceValidator)
  });

  const saveProductInfo = (value) => {
    const data = {
      supply: value
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

  useEffect(() => {
    setProduct(productValues);
  }, [productValues]);

  if (!product?.form?.supply && (type === 'edit' || type === 'addMeasurement')) {
    return <p>Loading... Source.</p>;
  }

  return (
    <form onSubmit={handleSubmit(saveProductInfo)}>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="Bought by"
            name="purchasedBy"
            placeholder="e.g who purchased the product"
            inputRef={register}
            onChange={handleEdit}
            helperText={errors?.purchasedBy ? errors.purchasedBy.message : ''}
            error={errors?.purchasedBy}
            defaultValue={productValues?.form?.supply?.purchasedBy}
            id="purchase-id"
            variant="outlined"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            id="unit-id"
            fullWidth
            label="Measurement Type (unit)"
            defaultValue={productValues?.form?.supply?.unit}
            name="unit"
            className={classes.TextField}
            inputRef={register}
            onChange={handleEdit}
            helperText={errors?.unit ? errors.unit.message : ''}
            error={errors?.unit}
            variant="outlined"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            id="State-id"
            select
            fullWidth
            name="location"
            label=""
            className={classes.TextField}
            inputRef={register}
            onChange={handleEdit}
            helperText={errors?.location ? errors.location.message : ''}
            error={errors?.location}
            variant="outlined"
            SelectProps={{
              native: true
            }}
          >
            <option value={productValues?.form?.state}>
              {productValues?.form?.state || 'Choose State'}
            </option>
            {stateList.map((option) => (
              <option
                key={option.state.id}
                value={option.state.name}
              >
                {option.state.name}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            id="qty-id"
            fullWidth
            label="Quantity"
            name="quantity"
            defaultValue={productValues?.form?.supply?.quantity}
            inputRef={register}
            onChange={handleEdit}
            variant="outlined"
            type="number"
            helperText={errors?.quantity ? errors.quantity.message : ''}
            error={errors?.quantity}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            id="landingCost-id"
            fullWidth
            label="Landing Cost"
            name="landingCost"
            type="number"
            defaultValue={productValues?.form?.supply?.landingCost}
            inputRef={register}
            onChange={handleEdit}
            variant="outlined"
            helperText={errors?.landingCost ? errors.landingCost.message : ''}
            error={errors?.landingCost}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            id="transportation-id"
            fullWidth
            label="Transportation"
            name="transportation"
            defaultValue={productValues?.form?.supply?.transportation}
            inputRef={register}
            onChange={handleEdit}
            type="number"
            variant="outlined"
            helperText={errors?.transportation ? errors.transportation.message : ''}
            error={errors?.transportation}
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

export default ProductSource;
