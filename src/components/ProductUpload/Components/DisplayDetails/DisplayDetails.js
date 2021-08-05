/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Grid, makeStyles } from '@material-ui/core';
import Style from './Style';
import RichTextEditor from '../../../markdown/Editor';
import VariantList from './VariantList';
import VariantSetting from './VariantSettings';
import ProductImage from '../ProductImage/ProductImage';
import useDisplayDetails from './hooks/useDisplayDetails';
import ProductForm from './ProductForm';
import LoadingCenter from '../../../LoadingCenter/LoadingCenter';

const useStyles = makeStyles((theme) => Style(theme));

const DisplayDetails = (props) => {
  const {
    type,
    loading,
    productValues: { form },
  } = props;
  const classes = useStyles();
  const {
    categories,
    editEditorText,
    errors, handleSubmit,
    register, saveDisplayDetails,
    setEditorText, updateImage,
    allVariants, coops,
    setAllVariants, setIsVisible
  } = useDisplayDetails(props);

  if (!form?.category && (type === 'Mtype')) {
    return <LoadingCenter />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(saveDisplayDetails)}>
        <FormGroup row>
          <FormControlLabel
            control={(
              <Checkbox
                onChange={(e) => setIsVisible({ open: e.target.checked })}
                name="checkedA"
                color="primary"
                defaultChecked={form?.visibility === 'on'}
              />
            )}
            label="Make Product Visible"
          />
        </FormGroup>
        <Grid container spacing={2}>
          <ProductForm
            form={form}
            coops={coops}
            errors={errors}
            classes={classes}
            register={register}
            categories={categories}
          />
          <Grid item md={3} xs={12}>
            <ProductImage
              updateImage={updateImage}
            />
          </Grid>
          <Grid item md={9} xs={12}>
            <RichTextEditor
              state={editEditorText}
              setState={setEditorText}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <VariantList
              formValue={form}
              allVariants={allVariants}
              setAllVariants={setAllVariants}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <VariantSetting
              form={form}
              classes={classes}
              errors={errors}
              register={register}
              allVariants={allVariants}
            />
          </Grid>
        </Grid>
        <img src={form?.image} height="100" alt={form.title} />
        <Divider />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!!loading}
          className={classes.button}
        >
          {type === 'edit' ? 'Update Product' : 'Upload Product'}
        </Button>
      </form>

    </>
  );
};

export default DisplayDetails;
