import React from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { FilePond } from 'react-filepond';
import { Alert } from '@material-ui/lab';
import CustomizedProgressBars from '../../../components/ProgressBar/ProgressBar';
import CustomizedDialogs from '../../../components/custommodal/CustomModal';

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1, 'auto'),
    padding: theme.spacing(1, 1.3)
  }
}));

const AddGift = ({
  uploadProduct, handleChange, loading,
  updateImage, open, setOpen, error
}) => {
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleClickOpen}
        endIcon={<AddIcon />}
      >
        Add
      </Button>
      <CustomizedDialogs
        modalTitle="Add Cooperative Gifts"
        open={open}
        setOpen={setOpen}
      >
        {(loading) && <CustomizedProgressBars />}
        <form onSubmit={uploadProduct}>
          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}
          <TextField
            className={classes.textField}
            id="outlined-select-name"
            label="Title"
            fullWidth
            name="name"
            required
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            className={classes.textField}
            id="outlined-select-name"
            label="Batch"
            fullWidth
            aria-readonly
            name="tagName"
            required
            type="date"
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            className={classes.textField}
            id="outlined-select-name"
            label="Quantity"
            fullWidth
            name="qty"
            required
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            className={classes.textField}
            id="outlined-select-name"
            label="unit"
            fullWidth
            name="unit"
            required
            onChange={handleChange}
            variant="outlined"
          />
          <FilePond
            allowFileSizeValidation
            maxFileSize="500KB"
            allowMultiple={false}
            maxFiles={1}
            required
            labelMaxFileSize="Maximum file size is 500KB"
            onupdatefiles={updateImage}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!!loading}
            className={classes.textField}
          >
            Upload Product
          </Button>
        </form>
      </CustomizedDialogs>
    </div>
  );
};

export default AddGift;
