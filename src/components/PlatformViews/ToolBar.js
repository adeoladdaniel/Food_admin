import React from 'react';
import {
  Box,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
}));

const Toolbar = () => {
  const classes = useStyles();

  return (
    <div
      className={(classes.root)}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      />

    </div>
  );
};

export default Toolbar;
