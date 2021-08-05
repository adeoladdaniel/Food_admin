import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

// Inspired by the former Facebook spinners.
const useStylesFacebook = makeStyles((theme) => ({
  root: {
    position: 'relative'
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700]
  },
  top: {
    color: '#1a90ff',
    animationDuration: '550ms',
    position: 'absolute',
    left: 0
  },
  circle: {
    strokeLinecap: 'round'
  }
}));

function LoadingCenterIcon(props) {
  const classes = useStylesFacebook();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default function LoadingCenter({ text }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LoadingCenterIcon />
      <span>{text}</span>
    </div>
  );
}
