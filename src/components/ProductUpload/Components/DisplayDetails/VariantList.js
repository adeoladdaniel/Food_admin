import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { Button, IconButton } from '@material-ui/core';
import { AddOutlined, DeleteForeverOutlined, Edit } from '@material-ui/icons';
import { _2NameOrId } from '../utils';
import AddPlatforms from './AddPlatforms';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function VariantList({
  formValue,
  allVariants = [],
  setAllVariants
}) {
  const classes = useStyles();
  const [variant, setVariant] = useState('');
  const [open, setOpen] = useState(false);
  const { coops } = useSelector((state) => state.cooperatives);

  const onSelectVariant = (data, id) => {
    const type = {
      id,
      action: 'edit'
    };
    setVariant({ data, type });
    setOpen(!open);
  };
  const deleteVariant = (idx) => {
    const data = allVariants.filter((_, i) => i !== idx);
    setAllVariants(data);
  };

  return (
    <>
      <AddPlatforms
        open={open}
        variant={variant}
        setOpen={setOpen}
        formValue={formValue}
        allVariants={allVariants}
        setAllVariants={setAllVariants}
      />
      <Button
        startIcon={<AddOutlined color="primary" />}
        variant="text"
        size="small"
        onClick={() => {
          setVariant({ data: null, type: null });
          setOpen(!open);
        }}
      >
        Add Product Variants
      </Button>
      <List className={classes.root}>
        {allVariants.map((list, index) => (
          <ListItem key={Math.random()} alignItems="flex-start">
            <ListItemText
              primary={`${_2NameOrId(coops, list.platformId, 'id').join(',')}`}
              secondary={(
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Variants:
                  </Typography>
                  {list.variant.length}
                </React.Fragment>
              )}
            />
            <IconButton
              color="primary"
              onClick={() => onSelectVariant(list, index)}
            >
              <Edit />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => deleteVariant(index)}
            >
              <DeleteForeverOutlined color="error" />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}
