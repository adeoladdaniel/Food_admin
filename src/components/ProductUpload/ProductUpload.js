import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { DisplayDetails, ProductSource, SalesInformation } from './Components';
import { initialState, productReducer } from './Components/reducer/productReducer';
import Categories from './Categories/Categories';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      hidden={value !== index}
      id={`scroll-able-auto-tab-panel-${index}`}
      aria-labelledby={`scroll-able-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  // children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scroll-able-auto-tab-${index}`,
    'aria-controls': `scroll-able-auto-tab-panel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '90%',
    margin: theme.spacing(0.5, 'auto'),
    backgroundColor: theme.palette.background.default,
  },
  form: {
    margin: theme.spacing(1),
  },
  Paper: {
    backgroundColor: theme.palette.background.paper,
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto'
  }
}));

export default function ProductUpload(props) {
  const {
    type,
    loading,
    onSubmit,
    handleEdit,
    stepNumber,
    productById,
    AddMeasurementType,
  } = props;
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [productValues, dispatch] = useReducer(productReducer, initialState);

  const uploadProps = {
    type,
    value,
    ...props,
    dispatch,
    setValue,
    handleEdit,
    productValues
  };
  const uploadProduct = () => onSubmit(productValues);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (productById) {
      dispatch({
        type: 'GET_ALL',
        payload: productById
      });
    }
    if (stepNumber) {
      setValue(stepNumber);
    }
  }, [productById, stepNumber]);

  return (
    <div className={classes.root}>
      <Categories />
      <Paper className={classes.paper}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          style={{ color: 'red' }}
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Product Source" {...a11yProps(0)} />
          <Tab label="Sales Information" {...a11yProps(1)} />
          <Tab label="Display" {...a11yProps(2)} />
        </Tabs>
        <Divider />

        <TabPanel
          value={value}
          index={0}
        >
          <ProductSource
            {...uploadProps}
            uploadProduct={uploadProduct}
          />
        </TabPanel>
        <TabPanel
          value={value}
          index={1}
        >
          <SalesInformation
            {...uploadProps}
          />
        </TabPanel>
        <TabPanel
          value={value}
          index={2}
        >
          <DisplayDetails
            {...uploadProps}
            loading={loading}
            uploadProduct={uploadProduct}
            AddMeasurementType={AddMeasurementType}
          />
        </TabPanel>
      </Paper>
    </div>
  );
}

ProductUpload.prototype = {
  onSubmit: PropTypes.func.isRequired
};
