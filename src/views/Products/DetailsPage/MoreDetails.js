import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const MoreDetails = ({ data, classes }) => {
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
          Other  Information
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item className={classes.listItem}>
            <Typography variant="strong" component="span">
              category:
            </Typography>
            <Typography component="span">
              {data?.category}
            </Typography>
          </Grid>
          <Grid item className={classes.listItem}>
            <Typography variant="strong" component="span">
              Title:
            </Typography>
            <Typography component="span">
              {data?.title}
            </Typography>
          </Grid>
          <Grid item className={classes.listItem}>
            <Typography variant="strong" component="span">
              State:
            </Typography>
            <Typography component="span">
              {data?.state}
            </Typography>
          </Grid>
          <Grid item className={classes.listItem}>
            <Typography variant="strong" component="span">
              Default Variant:
            </Typography>
            <Typography component="span">
              {data?.defaultVariant}
            </Typography>
          </Grid>
          <Grid item className={classes.listItem}>
            <Typography variant="strong" component="span">
              Change Variants On Purchase:
            </Typography>
            <Typography component="span">
              {data?.mutateVariantsOnPurchase ? 'ON' : 'OFF'}
            </Typography>
          </Grid>
          <Grid item className={classes.listItem}>
            <Typography variant="strong" component="span">
              Blog Link:
            </Typography>
            <Typography component="span">
              {data?.blogLink}
            </Typography>
          </Grid>
          <Grid item className={classes.listItem}>
            <Typography variant="strong" component="span">
              Video Link:
            </Typography>
            <Typography component="span">
              {data?.videoLink}
            </Typography>
          </Grid>
          <Grid item className={classes.listItem}>
            <Typography variant="strong" component="span">
              Sold Out:
            </Typography>
            <Typography component="span">
              {data?.isSoldOut ? (
                'N/A'
              ) : (
                'Available'
              )}
            </Typography>
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
            className={classes.listItem}
          >
            <Typography variant="strong">
              Description:
            </Typography>
            <Typography variant="body1">
              {data?.description}
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default MoreDetails;
