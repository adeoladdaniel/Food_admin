import React, { useEffect } from 'react';
import {
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import Style from './Style';
import { variantProfit } from '../utils';

const useStyles = makeStyles((theme) => Style(theme));

const AddVariant = ({
  variant,
  variants,
  formValue,
  setVariants
}) => {
  const classes = useStyles();

  function handleChange(event, i) {
    event.persist();
    const { name, value } = event.target;
    const values = variants.map((item, index) => {
      if (index === i && name === 'conversionUnit') {
        return {
          ...item,
          [name]: value,
          quantity: value * (formValue?.supply?.quantity || 0)
        };
      } if (index === i) {
        return {
          ...item,
          [name]: value,
        };
      }
      return item;
    });
    setVariants(values);
  }

  const handleDelete = (index) => {
    if (variants.length === 1) return;
    const items = [...variants];
    items.splice(index, 1);
    setVariants(items);
  };

  useEffect(() => {
    if (variant) {
      setVariants(variant?.variant);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant]);

  return (
    <>
      <div>
        {variants.map((field, idx) => {
          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={`${field}-${idx}`}
              className={classes.variantsBox}
            >
              <input
                className={classes.variant}
                type="text"
                name="unit"
                value={field.unit}
                placeholder="Unit"
                id={`id-${Math.random()}`}
                onChange={(e) => handleChange(e, idx)}
              />
              {/* <input
                className={classes.variant}
                type="text"
                name="unitDescription"
                value={field.unitDescription}
                placeholder="Unit Desc."
                id={`id-${Math.random()}`}
                onChange={(e) => handleChange(e, idx)}
              /> */}
              <input
                className={classes.variant}
                id={`id-${Math.random()}`}
                name="conversionUnit"
                type="number"
                value={field?.conversionUnit}
                placeholder="Conversion Unit"
                onChange={(e) => handleChange(e, idx)}
              />
              <input
                className={classes.variant}
                id={`id-${Math.random()}`}
                value={field?.basePrice}
                onChange={(e) => handleChange(e, idx)}
                placeholder="Cost Price"
                name="basePrice"
                type="number"
              />
              <input
                className={classes.variant}
                id={`id-${Math.random()}`}
                value={field?.price}
                onChange={(e) => handleChange(e, idx)}
                name="price"
                placeholder="Selling price"
                type="number"
              />
              <input
                className={classes.variant}
                id={`id-${Math.random()}`}
                value={field?.marketPrice}
                onChange={(e) => handleChange(e, idx)}
                name="marketPrice"
                placeholder="Market Price"
                type="number"
              />
              <IconButton
                onClick={() => handleDelete(idx)}
              >
                <Delete
                  color="error"
                />
              </IconButton>
              <div className={classes.formFoot}>
                <Typography variant="subtitle1">
                  Profit:
                  {variantProfit(field)}
                  {' '}
                  %
                </Typography>
                <Typography variant="subtitle1">
                  Available Qty:
                  {field?.quantity}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AddVariant;
