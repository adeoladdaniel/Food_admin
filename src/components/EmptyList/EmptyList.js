import React from 'react';
import { makeStyles } from '@material-ui/core';
import emptyLogo from '../../assets/images/directory.svg';
import { Style } from './Style';

const useStyles = makeStyles((theme) => Style(theme));

const EmptyList = () => {
  const classes = useStyles();
  return (
    <span className={classes.root}>
      <img height="100" src={emptyLogo} alt="Empty List" />
    </span>
  );
};

export default EmptyList;
