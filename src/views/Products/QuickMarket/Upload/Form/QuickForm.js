import React, { useState } from 'react';
import { Button, Divider, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { FilePond } from 'react-filepond';
import { makeStyles } from '@material-ui/styles';
import { useDispatch } from 'react-redux';
import { getData } from '../../../../../redux/reducers/slicers/cooperatives';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0, 0, 5)
  },
}));

const QuickForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [, setImageUrl] = useState({ files: '' });
  const updateImage = (fileItems) => {
    if (fileItems.length) {
      setImageUrl({
        files: fileItems[0]?.file
      });
    }
  };

  return (
    <div className={classes.root}>
      <form>
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              variant="outlined"
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <FilePond
              maxFiles={3}
              maxFileSize="100KB"
              allowMultiple={false}
              allowFileSizeValidation
              onupdatefiles={updateImage}
              labelMaxFileSize="Maximum file size is 100KB"
            />
          </Grid>
        </Grid>
        <Divider />
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Upload Product
        </Button>
        <button
          style={{ padding: '40px', }}
          type="button"
          onClick={() => dispatch(getData('queries'))}
        >
          Fetch API

        </button>
      </form>
    </div>

  );
};

export default QuickForm;
