import React, { useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useSelector } from 'react-redux';
import { _2NameOrId } from '../../../components/ProductUpload/Components/utils';

const Platforms = ({ data, classes }) => {
  const { coops } = useSelector((state) => state.cooperatives);
  const [platforms] = useState(data?.visibleTo);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography
          variant="h3"
          className={classes.heading}
        >
          Available Platform and Vendor
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item className={classes.listItem}>
            <Typography variant="strong" component="span">
              Vendor:
            </Typography>
            <Typography component="span">
              {data?.vendor.name}
            </Typography>
          </Grid>
          <Grid item className={classes.listItem}>
            <Typography variant="strong" component="span">
              Platforms
            </Typography>
            <div className={classes.demo}>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary={_2NameOrId(coops, platforms, 'id').join(' , ')}
                  />
                </ListItem>
              </List>
            </div>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default Platforms;
