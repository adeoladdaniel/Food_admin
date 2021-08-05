import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const VariantSetting = ({
  register,
  errors, classes,
  form, allVariants = []
}) => {
  return (
    <Grid container>
      <Grid item md={6} xs={12}>
        <TextField
          id="defaultVariant-id"
          select
          fullWidth
          name="defaultVariant"
          className={classes.TextField}
          defaultValue={form.defaultVariant}
          inputRef={register}
          helperText={errors?.defaultVariant?.message
            || form?.defaultVariant}
          error={errors && errors.defaultVariant}
          variant="outlined"
          SelectProps={{
            native: true
          }}
        >
          <option value="">Default Variant</option>
          {allVariants.map((option) => (
            option?.variant ? option.variant.map(((item, i) => (
              <option
                key={i++}
                value={item.unit}
              >
                {item.unit}
              </option>
            )))
              : <></>
          ))}
        </TextField>
      </Grid>
      <Grid item md={6} xs={12}>
        <FormGroup row>
          <FormControlLabel
            className={classes.TextField}
            control={(
              <Checkbox
                color="primary"
                inputRef={register}
                name="mutateVariantsOnPurchase"
                defaultChecked={form?.mutateVariantsOnPurchase}
              />
            )}
            label="Automated Variants quantity update"
          />
        </FormGroup>
      </Grid>
    </Grid>

  );
};

export default VariantSetting;
