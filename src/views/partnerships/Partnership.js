/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, Tabs, Tab, Box
} from '@material-ui/core';
import ClaimGift from './Claimgift/ClaimGift';
import { useQuery } from '../../hooks/useQuery';
import PlatformBoards from './PlatformsBoard/PlatformBoards';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function Patnership({ history, location, ...rest }) {
  const classes = useStyles();
  const page = useQuery(location).get('page-view');
  const [value, setValue] = useState(() => (page ? Number(page) : 0));

  const props = {
    history,
    location,
    ...rest
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.replace(`?page-view=${newValue}`);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Cooperatives" {...a11yProps(0)} />
          <Tab label="Cooperatives Gifts" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <PlatformBoards />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ClaimGift {...props} />
      </TabPanel>
    </div>
  );
}
