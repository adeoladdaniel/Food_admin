import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar, Toolbar, Badge, Hidden, IconButton, Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { useCookies } from 'react-cookie';
import ImgLogo from '../../../../assets/images/logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none'
    // background:
  },
  flexGrow: {
    flexGrow: 1
  },
  header: {
    color: theme.palette.white,
    margin: theme.spacing(0, 2)
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = (props) => {
  const { className, onSidebarOpen, ...rest } = props;
  const history = useHistory();
  const [, , removeCookie] = useCookies(['x-auth-token']);
  const classes = useStyles();

  const logoutUser = () => {
    localStorage.clear();
    removeCookie(['x-auth-token']);
    history.push('/sign-in');
  };
  const [notifications] = useState([]);

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/">
          <img alt="food Crowdy agent" height="60" width="60" src={ImgLogo} />
        </RouterLink>
        <Typography variant="h3" component="h1" className={classes.header}>
          ADMIN DASHBOARD
        </Typography>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge badgeContent={notifications.length} color="primary" variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={logoutUser} className={classes.signOutButton} color="inherit">
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func.isRequired
};

export default Topbar;
