import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const ProductForm = ({
  classes, register,
  errors, form,
  coops, categories
}) => {
  return (
    <Grid item md={12} xs={12}>
      <Grid container spacing={3}>
        <Grid item md={4} xs={12}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            defaultValue={form?.title}
            variant="outlined"
            inputRef={register}
            helperText={errors?.title ? errors?.title?.message : ''}
            error={!!(errors?.title)}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            id="category-id"
            select
            fullWidth
            name="category"
            required
            defaultValue={form.category}
            className={classes.TextField}
            inputRef={register}
            helperText={errors?.category?.message}
            error={errors?.category}
            variant="outlined"
            SelectProps={{
              native: true
            }}
          >
            <option value="">Choose  Category</option>
            {categories.map((option) => (
              <option
                key={option._id}
                value={option.name}
              >
                {option.name}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            id="vendor-id"
            select
            fullWidth
            name="owner"
            className={classes.TextField}
            defaultValue="foodcrowdy"
            inputRef={register}
            helperText={
              errors?.owner?.message
              || form?.vendor?.name
            }
            error={errors && errors.owner}
            variant="outlined"
            SelectProps={{
              native: true
            }}
          >
            <option value="">Product Owner</option>
            {coops.map((option) => (
              <option
                key={option._id}
                value={option._id}
              >
                {option.name}
              </option>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductForm;
