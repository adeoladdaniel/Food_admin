import React from 'react';
import { FilePond } from 'react-filepond';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  image: {
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
}));

const ProductImage = ({ updateImage }) => {
  const classes = useStyles();
  return (
    <>
      <FilePond
        maxFiles={3}
        maxFileSize="100KB"
        allowMultiple={false}
        allowFileSizeValidation
        className={classes.image}
        onupdatefiles={updateImage}
        labelMaxFileSize="Maximum file size is 100KB"
      />
    </>
  );
};

export default ProductImage;
