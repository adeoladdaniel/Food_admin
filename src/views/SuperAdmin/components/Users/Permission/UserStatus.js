import React from 'react';
import {
  FormControl, InputLabel,
  MenuItem, Select, Typography,
} from '@material-ui/core';
import { AccountStatus } from '../../../../../utils/AccountStatus';

const UserStatus = ({
  classes,
  handleClose,
  setOpen, open,
  accountStatus,
  handleAccountStatus,
}) => {
  return (
    <FormControl
      className={classes.formControl}
    >
      <Typography
        component="span"
        variant="h5"
        display="block"
      >
        Account Status
      </Typography>
      <InputLabel
        id="account-status-id"
      >
        Status
      </InputLabel>
      <Select
        fullWidth
        onClose={handleClose}
        value={accountStatus}
        id="account-status-id"
        open={open.accountStatus}
        labelId="account-status-id"
        onChange={handleAccountStatus}
        onOpen={() => setOpen({ accountStatus: true })}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {AccountStatus.map((list) => (
          <MenuItem
            key={list}
            value={list}
          >
            {list}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default UserStatus;
