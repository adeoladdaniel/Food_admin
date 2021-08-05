import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    position: 'relative',
    top: '20%',
    bottom: '0%'
    // background: theme.palatte.background.default
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="body1">
        &copy;
        <Link
          component="a"
          href={process.env.REACT_APP_BASE_URL_CLIENT}
          target="_blank"
        >
          Food Crowdy
        </Link>
        2020
      </Typography>
      <Typography
        variant="caption"
      >
        This is our Admin platforms
      </Typography>
    </div>
  );
};

export default Footer;
