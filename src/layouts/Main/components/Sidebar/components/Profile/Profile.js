import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = (props) => {
  const { ...rest } = props;
  const { user } = useSelector((state) => state.userAuth);
  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root)}>
      <Avatar
        alt={user?.name}
        className={classes.avatar}
        component={RouterLink}
        to="/settings"
      />
      <Typography className={classes.name} variant="h4">
        {user?.name}
      </Typography>
    </div>
  );
};

export default Profile;
