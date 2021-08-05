import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const ProductSource = ({ productValues, classes }) => {
  return (
    <>
      <Typography variant="h5">
        Product Source
      </Typography>
      <Divider />
      <div className={classes.section}>
        <strong>
          Purchase By
        </strong>
        <Typography variant="body1">
          {productValues?.supply?.purchasedBy}
        </Typography>
      </div>
      <div className={classes.section}>
        <strong>
          Location
        </strong>
        <Typography variant="body1">
          {productValues?.supply?.state}
        </Typography>
      </div>
      <div className={classes.section}>
        <strong>
          Unit
        </strong>
        <Typography variant="body1">
          {productValues?.supply?.unit}
        </Typography>
      </div>
      <div className={classes.section}>
        <strong>
          Landing Cost
        </strong>
        <Typography variant="body1">
          {productValues?.supply?.landingCost}
        </Typography>
      </div>
      <div className={classes.section}>
        <strong>
          Quantity
        </strong>
        <Typography variant="body1">
          {productValues?.supply?.quantity}
        </Typography>
      </div>
      <div className={classes.section}>
        <strong>
          Transportation
        </strong>
        <Typography variant="body1">
          {productValues?.supply?.transportation}
        </Typography>
      </div>
    </>
  );
};

ProductSource.propTypes = {
  productValues: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default ProductSource;
