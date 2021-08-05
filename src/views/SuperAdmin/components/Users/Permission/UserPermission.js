import React from 'react';
import {
  FormControl, InputLabel, MenuItem, Select, Typography
} from '@material-ui/core';

const UserPermission = ({
  classes, open, setOpen,
  handleClose, permissions,
  handlePermission,
  accountPermission
}) => {
  return (
    <div>
      <Typography
        component="span"
        variant="h5"
        display="block"
      >
        Permission
      </Typography>
      <FormControl
        className={classes.formControl}
      >
        <InputLabel
          id="account-permission-id"
        >
          Permission
        </InputLabel>
        <Select
          labelId="account-permission-id"
          id="account-permission"
          open={open.permissions}
          onClose={handleClose}
          onOpen={() => setOpen({ permissions: true })}
          value={accountPermission}
          fullWidth
          onChange={handlePermission}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {permissions.map((list) => (
            <MenuItem
              key={list}
              value={list}
            >
              {list}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default UserPermission;
