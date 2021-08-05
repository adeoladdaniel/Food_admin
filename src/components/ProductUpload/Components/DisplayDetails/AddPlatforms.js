import React, { useEffect, useState } from 'react';
import {
  Box,
  Button, Checkbox, FormControlLabel, FormGroup
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { AddBox, Save } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import CustomizedDialogs from '../../../custommodal/CustomModal';
import { initialFields, validateVariants, _2NameOrId } from '../utils';
import AddVariant from './AddVariant';

const AddPlatforms = ({
  coopIds, variant,
  open, setOpen,
  allVariants,
  formValue,
  setAllVariants
}) => {
  const [selected, setSelected] = useState([]);
  const [checked, setChecked] = useState([]);
  const [message, setMessage] = useState('');
  const { coops } = useSelector((state) => state.cooperatives);
  const [variants, setVariants] = useState([initialFields]);

  const onSaveVariant = () => {
    const isNotValid = validateVariants(variants);
    if (!checked.length) {
      return setMessage('Please Choose platform');
    }
    if (isNotValid) {
      return setMessage('Please Enter initial Purchase quantity');
    }
    const platformId = _2NameOrId(coops, checked, 'name');
    if (variant?.type !== null) {
      const { type: { id } } = variant;
      const updatedItem = allVariants.map((item, idx) => (
        idx === id ? {
          ...item,
          platformId,
          variant: variants
        } : item
      ));
      setAllVariants(updatedItem);
    } else {
      setAllVariants([...allVariants, {
        platformId,
        variant: variants
      }]);
    }
    setOpen(!open);
  };

  const handleAddInputs = () => {
    const values = [...variants];
    values.push(initialFields);
    setVariants(values);
  };

  const handleCheckBox = (e) => {
    const { checked: isChecked, name } = e.target;
    if (isChecked) {
      setChecked([...checked, name]);
    } else {
      const removedItem = checked.filter((item) => item !== name);
      setChecked(removedItem);
    }
  };

  useEffect(() => {
    const businesses = coops.map((item) => (item.name));
    if (variant?.data?.platformId) {
      const { data: { platformId } } = variant;
      const checked = _2NameOrId(coops, platformId, 'id');
      setSelected(businesses);
      setChecked(checked);
    } else {
      const businesses = coops.map((item) => (item.name));
      setSelected(businesses);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coopIds, variant]);

  const slt = (data) => checked.some((item) => item === data);

  return (
    <>
      <CustomizedDialogs
        open={open}
        addCloseIcon
        noBottomButton
        setOpen={setOpen}
      >
        <div>
          <FormGroup row>
            {selected.map((item) => (
              <FormControlLabel
                key={item}
                control={(
                  <Checkbox
                    name={item}
                    checked={slt(item)}
                    onChange={handleCheckBox}
                  />
                )}
                label={item}
              />
            ))}
          </FormGroup>
        </div>
        {message && (
          <Alert severity="error">
            {message}
          </Alert>
        )}

        <AddVariant
          variants={variants}
          variant={variant?.data}
          formValue={formValue}
          initialFields={initialFields}
          setVariants={setVariants}
        />
        <Box
          display="flex"
          style={{
            margin: '1rem 0 0 0'
          }}
          justifyContent="space-between"
        >
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<AddBox />}
            onClick={handleAddInputs}
          >
            Add Variant
          </Button>
          <Button
            color="secondary"
            variant="contained"
            size="small"
            startIcon={<Save />}
            onClick={onSaveVariant}
          >
            Save
          </Button>
        </Box>

      </CustomizedDialogs>
    </>
  );
};

export default AddPlatforms;
