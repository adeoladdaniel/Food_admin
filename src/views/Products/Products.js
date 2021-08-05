import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { AppBar } from '@material-ui/core';
import { useQuery } from '../../hooks/useQuery';
import { TabPanelView, TabsBarView, a11yProps } from '../../components/TabsBar/TabsBar';
import ProductsView from './ProductsView';
import QuickMarket from './QuickMarket/QuickMarket';

const useStyles = makeStyles(({
  root: {
    flexGrow: 1,
  }
}));

const data = [
  {
    label: 'Food Products'
  },
  {
    label: 'Quick Market Products'
  }
];
const Products = (props) => {
  const { location, history } = props;
  const classes = useStyles();
  const page = useQuery(location).get('page-view');
  const [value, setValue] = useState(() => (page ? Number(page) : 0));

  const handleChange = (_, value) => {
    setValue(value);
    history.replace(`?page-view=${value}`);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color="transparent"
      >
        <TabsBarView
          value={value}
          tabLabel={data}
          a11yProps={a11yProps}
          handleChange={handleChange}
        />
      </AppBar>
      <TabPanelView
        value={value}
        index={0}
      >
        <ProductsView
          {...props}
        />
      </TabPanelView>
      <TabPanelView
        value={value}
        index={1}
      >
        <QuickMarket
          {...props}
        />
      </TabPanelView>
    </div>
  );
};

export default Products;
