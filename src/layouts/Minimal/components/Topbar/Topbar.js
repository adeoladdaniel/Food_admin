import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none'
  }
}));

const TopBar = () => {
  const classes = useStyles();

  return (
    <AppBar className={(classes.root)} color="primary" position="fixed">
      <Toolbar>
        <RouterLink to="/">
          <img
            alt="Food crowdy agents"
            src="https://res.cloudinary.com/cmcwebcode/image/upload/v1594111180/logo_lbdjst.svg"
          />
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
