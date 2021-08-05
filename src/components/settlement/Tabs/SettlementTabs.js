import React from 'react';
import {
  Tabs, Box, Tab
} from '@material-ui/core';
import PropTypes from 'prop-types';

export function TabPanel(props) {
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

export const SalesTabs = ({ a11yProps, value, handleChange }) => (
  <Tabs
    value={value}
    onChange={handleChange}
    indicatorColor="primary"
    textColor="primary"
    variant="scrollable"
    scrollButtons="auto"
    aria-label="scrollable auto tabs example"
  >
    <Tab label="Due Payments" {...a11yProps(0)} />
    <Tab label="Paid Invoice" {...a11yProps(1)} />
    <Tab label="Processing Invoice" {...a11yProps(2)} />
  </Tabs>
);

export function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`
  };
}
