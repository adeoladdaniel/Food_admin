import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Paper, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px'
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchInput = (props) => {
  const {
    value,
    className,
    onChange,
    style, ...rest
  } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.root} style={style}>
      <SearchIcon className={classes.icon} />
      <Input
        {...rest}
        value={value}
        disableUnderline
        onChange={onChange}
        className={classes.input}
      />
    </Paper>
  );
};

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired
};

export default SearchInput;
