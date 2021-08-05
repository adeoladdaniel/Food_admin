import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Profile, SidebarNav } from './components';
import useNavBar from './components/useNavBar';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 200,
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = (props) => {
  const {
    open,
    variant,
    onClose,
    ...rest
  } = props;
  const { user } = useSelector((state) => state.userAuth);
  const { navBar: data } = useNavBar(user?.role);
  const classes = useStyles();

  return (
    <Drawer
      open={open}
      anchor="left"
      onClose={onClose}
      variant={variant}
      classes={{ paper: classes.drawer }}
    >
      <div {...rest} className={(classes.root)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={data} />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
