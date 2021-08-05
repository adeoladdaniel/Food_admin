import React from 'react';
import {
  Backdrop, Button,
  TextField, makeStyles, FormGroup,
  FormControlLabel, Checkbox
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { formatter } from '../../../../../utils/localStore';
import CustomModal from '../../../../../components/custommodal/CustomModal';
import useFundWallet from './useFundWallet';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  block: {
    margin: theme.spacing(2, 0)
  }
}));

const FundWallet = ({
  data, edit, setEdit, refetch
}) => {
  const classes = useStyles();
  const {
    handleChange,
    handleCheckBox,
    handleComplaints,
    error,
    loading, state,
  } = useFundWallet({ data, refetch });

  return (
    <div className={classes.root}>
      {loading && <Backdrop />}
      <CustomModal
        addCloseIcon
        modalTitle="User Wallet Setting"
        setOpen={setEdit}
        open={edit}
        noBottomButton
      >
        <form
          className={classes.root}
          onSubmit={handleComplaints}
        >
          {error && (
            <Alert
              severity="error"
            >
              {error}
            </Alert>
          )}
          <FormGroup row>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={state.status === 'enabled'}
                  onChange={handleCheckBox}
                  name="status"
                />
              )}
              label="Activate Wallet"
            />
            <TextField
              fullWidth
              label="Amount"
              name="amount"
              onChange={handleChange}
              required
              defaultValue={data?.wallet?.balance}
              type="number"
              variant="outlined"
              helperText={`Your current wallet balance is
               ${formatter.format(data?.wallet?.balance)}`}
              className={classes.block}
            />
            <Button
              color="primary"
              type="submit"
              fullWidth
              disabled={loading}
              className={classes.block}
              variant="contained"
            >
              Submit
            </Button>
          </FormGroup>
        </form>
      </CustomModal>
    </div>
  );
};

export default FundWallet;
