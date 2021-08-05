import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import { useHistory } from 'react-router';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
}));

const PlatformCard = ({ platform, link }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card
      className={(classes.root)}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          mb={3}
        >
          <Avatar
            alt="platform"
            src={platform.logo}
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {platform.name}
        </Typography>
      </CardContent>
      <Divider />
      <Box p={2}>
        <Button
          fullWidth
          color="primary"
          variant="outlined"
          onClick={() => history.push(`${link}?business=${platform._id}`)}
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
};

export default PlatformCard;
