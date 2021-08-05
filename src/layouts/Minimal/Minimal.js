import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import { Topbar } from './components';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4, 0, 0, 0),
    height: '100%'
  },
  content: {
    height: '100%'
    // margin:theme.spacing(2,0),
  }
}));

const Minimal = (props) => {
  const { children } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Topbar />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

Minimal.propTypes = {
  children: PropTypes.node.isRequired
};

export default Minimal;
