import React from 'react';
import {
  withStyles, FormGroup, FormControlLabel, Switch
} from '@material-ui/core/';
import PropTypes from 'prop-types';

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1)
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none'
      }
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff'
    }
  },
  thumb: {
    width: 24,
    height: 24
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border'])
  },
  checked: {},
  focusVisible: {}
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked
      }}
      {...props}
    />
  );
});

export default function SwitchButton({
  setVisiblity, visibility, onLabel, hideLabel, open
}) {
  const handleChange = (event) => {
    setVisiblity({ [event.target.name]: event.target.checked });
  };

  return (
    <>
      {open ? (
        <FormGroup>
          <FormControlLabel
            control={
              <IOSSwitch checked={visibility.checked} onChange={handleChange} name="checked" />
            }
            label={`${visibility.checked ? onLabel : hideLabel}`}
          />
        </FormGroup>
      ) : (
        <span>&rsquo;</span>
      )}
    </>
  );
}

SwitchButton.defaultProps = {
  onLabel: 'Hide Product',
  hideLabel: 'Open To All'
};

SwitchButton.prototype = {
  onLabel: PropTypes.string,
  hideLabel: PropTypes.string,
  open: PropTypes.bool,
  visibility: PropTypes.shape({
    checked: PropTypes.bool.isRequired
  })
};
