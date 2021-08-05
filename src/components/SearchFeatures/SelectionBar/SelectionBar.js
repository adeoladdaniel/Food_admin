import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { currentState } from '../../../utils/localStore';

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(1, 'auto'),
    padding: theme.spacing(0, 1),
  },

}));

const SelectionBar = ({ setQueries, queries }) => {
  const classes = useStyles();
  const { coops } = useSelector((state) => state.cooperatives);
  const { categories } = useSelector((state) => state.product);
  const handleChange = async (e) => {
    const { value, name } = e.target;
    setQueries((queries) => ({ ...queries, [name]: value }));
  };

  return (
    <>
      <FormControl
        fullWidth
        className={classes.form}
        variant="outlined"
      >
        <InputLabel id="state-id">State</InputLabel>
        <Select
          fullWidth
          labelId="state-id"
          id="state-name"
          margin="dense"
          value={queries.state}
          name="state"
          onChange={handleChange}
          label="State"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {currentState.map(({ name, id }) => (
            <MenuItem
              key={id}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        fullWidth
        className={classes.form}
        variant="outlined"
      >
        <InputLabel
          id="platform-id"
        >
          Platform
        </InputLabel>
        <Select
          fullWidth
          labelId="platform-id"
          id="platform-label"
          margin="dense"
          value={queries.platform}
          name="platform"
          onChange={handleChange}
          label="Platform"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {coops.map(({ name, _id }) => (
            <MenuItem
              key={_id}
              value={_id}
            >
              {name}

            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        fullWidth
        className={classes.form}
        variant="outlined"
      >
        <InputLabel id="category-id">Food Category</InputLabel>
        <Select
          fullWidth
          margin="dense"
          labelId="category-id"
          id="food-category"
          value={queries.category}
          name="category"
          onChange={handleChange}
          label="Food Category"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {categories.map(({ name, _id }) => (
            <MenuItem
              key={_id}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectionBar;
