import React from 'react';
import {
  Avatar, Button,
  Divider, Grid
} from '@material-ui/core';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import { Add, CalendarToday, Edit } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import DeleteProduct from '../components/DeleteProduct';

const ActionsPanel = ({ data, classes }) => {
  const history = useHistory();
  const onDelete = () => history.push('/products/');
  return (
    <Grid container spacing={3}>
      <Grid item md={3} xs={6} className={classes.listItem}>
        <Typography variant="strong" component="span">
          <CalendarToday
            fontSize="small"
            color="primary"
          />
          Created Date:
        </Typography>
        <Typography component="span">
          {moment(data.createdAt).format('LL')}
        </Typography>
      </Grid>
      <Grid item md={3} xs={6} className={classes.listItem}>
        <Typography variant="strong" component="span">
          <CalendarToday
            fontSize="small"
            color="primary"
          />
          Last Edited Date:
        </Typography>
        <Typography component="span">
          {moment(data.createdAt).format('LL')}
        </Typography>
      </Grid>
      <Grid item md={3} xs={6} className={classes.listItem}>
        <Typography variant="strong" component="span">
          <CalendarToday
            fontSize="small"
            color="primary"
          />
          Product Expiring Date:
        </Typography>
        <Typography component="span">
          {moment(data.expirationDate).format('LL')}
        </Typography>
      </Grid>
      <Divider />
      <Grid item md={12} xs={12}>
        <Grid container>
          <Grid item md={3} xs={6} className={classes.listItem}>
            <Typography variant="strong" component="span">
              Uploaded By:
              <Avatar
                title="user"
                alt="User"
              />
            </Typography>

          </Grid>
          <Grid item md={3} xs={6} className={classes.listItem}>
            <Typography variant="strong" component="span">
              Updated Last By:
              <Avatar
                title="user"
                alt="User"
              />
            </Typography>
          </Grid>
          <Grid
            item
            md={3}
            xs={6}
            className={classes.listItem}
          >
            <Button
              color="secondary"
              variant="contained"
              size="small"
              onClick={() => history.push(`/products/edit/${data._id}`)}
              endIcon={<Edit />}
            >
              Edit Product
            </Button>
          </Grid>
          <Grid
            item
            md={3}
            xs={6}
            className={classes.listItem}
          >
            <Button
              color="primary"
              variant="outlined"
              size="small"
              onClick={() => history.push('/products/new/')}
              endIcon={<Add />}
            >
              Add New Product
            </Button>
          </Grid>
          <Grid
            item
            md={3}
            xs={6}
            className={classes.listItem}
          >
            <DeleteProduct
              id={data?._id}
              refetch={onDelete}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ActionsPanel;
