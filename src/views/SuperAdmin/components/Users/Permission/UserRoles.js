import React from 'react';
import {
  Chip, FormControl, Input, InputLabel, MenuItem, Select, useTheme
} from '@material-ui/core';
import { accountRoles } from '../../../../../utils/AccountStatus';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const UserRoles = ({
  classes, roles,
  handleRoles,
}) => {
  const theme = useTheme();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="account-roles-id">Roles</InputLabel>
      <Select
        labelId="account-roles-id"
        id="account-roles"
        multiple
        value={roles}
        onChange={handleRoles}
        input={<Input id="select-multiple-chip" />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                className={classes.chip}
              />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {accountRoles.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, roles, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default UserRoles;
