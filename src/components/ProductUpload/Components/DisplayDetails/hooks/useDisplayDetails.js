import { yupResolver } from '@hookform/resolvers';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useEditor from '../../../../markdown/useEditor';
import { purgeDbIds } from '../../utils';
import { displayParametersValidator } from '../../Validator';

const useDisplayDetails = ({
  dispatch,
  uploadProduct,
  productValues: { form },
}) => {
  const [isVisible, setIsVisible] = useState({ open: false });
  const [imageUrl, setImageUrl] = useState({ files: '' });
  const [allVariants, setAllVariants] = useState([]);
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(displayParametersValidator)
  });
  const {
    editEditorText,
    getMarkDown,
    setEditorText, setMDContent
  } = useEditor();
  const { categories } = useSelector((state) => state.product);
  const { coops } = useSelector((state) => state.cooperatives);

  const saveDisplayDetails = (values) => {
    const markDownString = getMarkDown();
    if (!markDownString) return toast.error('Description must not be empty');
    const owner = coops.find((item) => item._id === values.owner);
    const vendor = {};
    if (owner) {
      vendor.name = owner.name;
      vendor.id = owner._id;
    }
    const data = {
      ...values,
      imageUrl,
      isVisible,
      platform: allVariants,
      description: markDownString,
      vendor: vendor.name ? vendor : form?.vendor
    };
    dispatch({
      type: 'ADD_PRODUCT',
      payload: { data }
    });
    uploadProduct();
  };
  const updateImage = (fileItems) => {
    if (fileItems.length) {
      setImageUrl({
        files: fileItems[0]?.file
      });
    }
  };

  useEffect(() => {
    if (form?.description) {
      setMDContent(form?.description);
      setIsVisible({ open: form?.visibility === 'on' });
      setAllVariants(purgeDbIds(form?.platform));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    editEditorText,
    setEditorText,
    categories,
    handleSubmit,
    updateImage,
    saveDisplayDetails,
    register,
    errors,
    setIsVisible,
    coops,
    allVariants,
    setAllVariants
  };
};

export default useDisplayDetails;
