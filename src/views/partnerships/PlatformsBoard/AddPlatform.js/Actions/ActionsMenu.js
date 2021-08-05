import React, { useEffect, useState } from 'react';
import {
  IconButton, makeStyles, Menu, MenuItem
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch } from 'react-redux';
import { getPlatformById } from '../../../../../redux/reducers/slicers/cooperatives';

const useStyles = makeStyles((theme) => {
  return {
    menuItem: {
      '& > *': {
        margin: theme.spacing(1)
      }
    }
  };
});

function ActionMenu({ row }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openW, setOpenW] = useState(false);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {

  }, []);

  const handleFundWallet = () => {
    dispatch(getPlatformById(row.original));
    setOpenW(!openW);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          className={classes.menuItem}
          onClick={handleFundWallet}
        >
          <Edit color="primary" />
          Edit Platform
        </MenuItem>
      </Menu>
    </>
  );
}

export default ActionMenu;
