import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const SupplyInfo = ({ data, classes }) => {
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
          Supply Information
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item className={classes.listItem}>
            <Typography variant="strong" component="span">
              Supplier:
            </Typography>
            <Typography component="span">
              {data?.supply?.purchasedBy}
            </Typography>
          </Grid>
          <Grid item className={classes.listItem}>
            <Typography variant="strong" component="span">
              Landing Cost:
            </Typography>
            <Typography component="span">
              {data?.supply?.landingCost}
            </Typography>
          </Grid>
          <Grid item className={classes.listItem}>
            <Typography variant="strong" component="span">
              Location:
            </Typography>
            <Typography component="span">
              {data?.supply?.location}
            </Typography>
          </Grid>
          <Grid item className={classes.listItem}>
            <Typography variant="strong" component="span">
              Quantity:
            </Typography>
            <Typography component="span">
              {data?.supply?.quantity}
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default SupplyInfo;
