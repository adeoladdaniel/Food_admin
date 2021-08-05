import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Drawer } from '@material-ui/core';
import { SearchFeatures } from '../../../../../components';
import SelectionBar from '../../../../../components/SearchFeatures/SelectionBar/SelectionBar';
import ProductTable from './ProductTable';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 400,
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    padding: theme.spacing(1),
    margin: theme.spacing(2, 0)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const DrawerPanel = (props) => {
  const {
    open,
    variant,
    onClose,
  } = props;
  const classes = useStyles();
  const [queries, setQueries] = useState({
    state: '',
    platform: '',
    category: ''
  });
  const [data, setData] = useState(useMemo(() => [], []));
  const [search, setSearched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const CategoryBar = (
    <SelectionBar
      queries={queries}
      setQueries={setQueries}
    />
  );

  return (
    <Drawer
      open={open}
      elevation={3}
      anchor="right"
      onClose={onClose}
      variant={variant}
      classes={{ paper: classes.drawer }}
    >
      <div className={(classes.root)}>
        <SearchFeatures
          data={data}
          setData={setData}
          queries={queries}
          endPoint="/products"
          selectTray={CategoryBar}
          setSearched={setSearched}
          setIsLoading={setIsLoading}
          searchList={['title', 'category']}
        />
      </div>
      <ProductTable
        data={data}
        search={search}
        setData={setData}
        isLoading={isLoading}
      />
    </Drawer>
  );
};

DrawerPanel.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default DrawerPanel;
