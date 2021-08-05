import React from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import PlatformCard from './PlatFormCard';
import Toolbar from './ToolBar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const PlatformView = ({ link }) => {
  const classes = useStyles();
  const { coops: platforms } = useSelector((state) => state.cooperatives);

  return (
    <Container maxWidth={false}>
      <Toolbar />
      <Box mt={3}>
        <Grid
          container
          spacing={3}
        >
          {platforms.map((platform) => (
            <Grid
              item
              key={platform._id}
              lg={4}
              md={6}
              xs={12}
            >
              <PlatformCard
                link={link}
                className={classes.productCard}
                platform={platform}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default PlatformView;
