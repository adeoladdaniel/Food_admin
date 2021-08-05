import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import CustomModal from '../../../../components/custommodal/CustomModal';

const useStyles = makeStyles((theme) => {
  return {
    links: {
      display: 'block',
      margin: theme.spacing(1.4, 'auto'),
    },
    linkWrapper: {
      height: 300
    }
  };
});

const ProductDialog = ({ open, setOpen, data }) => {
  const classes = useStyles();

  return (
    <CustomModal
      styles={{ padding: '0 3rem' }}
      addCloseIcon
      noBottomButton
      outBoxClose
      open={open}
      setOpen={setOpen}
    >
      <div className={classes.linkWrapper}>
        <Button
          className={classes.links}
          href="/products"
          variant="contained"
          color="secondary"
          fullWidth
        >
          View Products
        </Button>
        <Button
          className={classes.links}
          href={`/products/edit/${data}`}
          variant="contained"
          color="primary"
          fullWidth
        >
          Edit Products
        </Button>
      </div>
    </CustomModal>
  );
};

export default ProductDialog;
