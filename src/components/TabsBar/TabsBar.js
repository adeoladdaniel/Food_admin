import React from 'react';
import {
  Tabs, Box, Tab
} from '@material-ui/core';
import PropTypes from 'prop-types';

export function TabPanelView(props) {
  const {
    children,
    value, index,
    ...other
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

TabPanelView.propTypes = {
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  children: PropTypes.node.isRequired,
};

export const TabsBarView = ({
  a11yProps, tabLabel,
  value, handleChange
}) => (
  <Tabs
    value={value}
    textColor="primary"
    variant="scrollable"
    scrollButtons="auto"
    onChange={handleChange}
    indicatorColor="primary"
    aria-label="scrollable auto tabs example"
  >
    {tabLabel.map((tab, i) => (
      <Tab
        key={tab.label}
        label={tab.label}
        {...a11yProps(i)}
      />
    ))}
  </Tabs>
);

export function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`
  };
}
