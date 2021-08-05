import React from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  makeStyles, Tooltip,
  Toolbar, Typography
} from '@material-ui/core';
import clsx from 'clsx';
import { Delete } from '@material-ui/icons';
import { toolBarStyles } from '../Styes';
import CSVDownLoad from '../../DownLoad/CSVDownLoad';
import { CSVsettlement } from '../Tabs/reducers';

const useToolbarStyles = makeStyles((theme) => (toolBarStyles(theme)));

const TableToolBar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, title, data } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="h4"
          component="h4"
        >
          {numSelected}
          {' '}
          selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          id="tableTitle"
          variant="h4"
          component="h4"
        >
          {title}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <Delete />
          </IconButton>
        </Tooltip>
      ) : (
        <CSVDownLoad
          data={data}
          CSVheaders={CSVsettlement}
          filename="Invoice.csv"

        />
        // <Tooltip title="Filter list">
        //   <IconButton aria-label="filter list">
        //     <FilterList />
        //   </IconButton>
        // </Tooltip>
      )}
    </Toolbar>
  );
};

TableToolBar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default TableToolBar;
