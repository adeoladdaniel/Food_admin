import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card, CardContent, Typography, Divider, Avatar
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    margin: 'auto',
    height: 100,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  word: {
    textAlign: 'center',
    margin: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const AccountProfile = (props) => {
  const { data, ...rest } = props;
  const classes = useStyles();

  return (
    <Card {...rest} className={classes.root}>
      <CardContent>
        <div className={classes.details}>
          <Avatar alt="FoodCrowdy" className={classes.avatar} />
          <Typography className={classes.word} variant="h4">
            {data?.name}
          </Typography>
        </div>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default AccountProfile;
