import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Fab, Grid, useMediaQuery } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import DrawerPanel from './Products/DrawerPanel';
import QuickForm from './Form/QuickForm';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64,
    }
  },
  // shiftContent: {
  //   paddingLeft: 240
  // },
  content: {
    flex: 0.5,
    // width: 600,
    height: '100%',
    textAlign: 'center',
  }
}));

const MarketForm = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;
  return (
    <div className={clsx({
      [classes.root]: true,
      [classes.shiftContent]: isDesktop
    })}
    >
      <Grid container spacing={2}>
        <Grid item md={7} xs={12}>
          <Fab
            onClick={handleSidebarOpen}
            role="button"
            variant="extended"
          >
            <AddIcon />
            Navigate
          </Fab>
          <QuickForm />
        </Grid>
        <Grid
          className={classes.content}
          item
          md={6}
          xs={12}
        >
          <DrawerPanel
            onClose={handleSidebarClose}
            open={shouldOpenSidebar}
            variant={
              isDesktop
                ? 'persistent'
                : 'temporary'
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default MarketForm;
