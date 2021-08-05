import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  list: {
    width: 450,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer({
  children, slider, BtnProps, btnText
}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => {
    return (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
      >
        {children}
      </div>
    );
  };

  return (
    <div>
      {[slider].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button {...BtnProps} onClick={toggleDrawer(anchor, true)}>{btnText || anchor}</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

TemporaryDrawer.defaultProps = {
  // slider: []

};
TemporaryDrawer.propTypes = {
  children: PropTypes.node.isRequired,
  slider: PropTypes.oneOf(['left', 'right', 'top', 'bottom']).isRequired

};
