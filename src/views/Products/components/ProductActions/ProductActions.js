import React from 'react';
import { makeStyles } from '@material-ui/core';
import {
  Edit,
  NewReleasesOutlined
} from '@material-ui/icons';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
import DeleteProduct from '../DeleteProduct';

const useStyles = makeStyles((theme) => {
  return {
    menuItem: {
      '& > *': {
        margin: theme.spacing(0.2)
      }
    }
  };
});

const options = [
  {
    title: 'Edit Product',
    path: '/products/edit',
    icon: <Edit color="primary" />
  },
  {
    title: 'Re-Stock',
    path: '/products/re-upload',
    icon: <NewReleasesOutlined color="action" />
  },
];

function ActionMenu({ row, refetch }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
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
        {options.map(({ title, path, icon }) => (
          <Link to={`${path}/${row?.original._id}`} key={title}>
            <MenuItem className={classes.menuItem} onClick={handleClose}>
              {icon}
              {' '}
              {title}
            </MenuItem>
          </Link>

        ))}
        <DeleteProduct
          row={row}
          refetch={refetch}
          className={classes.menuItem}
        />
      </Menu>
    </div>
  );
}

export default ActionMenu;
