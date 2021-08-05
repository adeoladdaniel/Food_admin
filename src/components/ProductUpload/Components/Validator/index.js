import * as yup from 'yup';

export const productSourceValidator = yup.object().shape({
  unit: yup.string().required(),
  quantity: yup.number().typeError('quantity is required').required(),
  location: yup.string().label('location').required(),
  purchasedBy: yup.string().label('purchased By').required(),
  landingCost: yup.number().typeError('Landing Cost is required').required(),
  transportation: yup.number().typeError('transportation is required').required(),
});

export const expendituresValidator = yup.object().shape({
  lahdah: yup.number().required().label('lahdah'),
  transport: yup.number().required(),
  miscellaneous: yup.number().required(),
  loadingFee: yup.number().required(),
  offLoadingFee: yup.number().required()
});

export const displayParametersValidator = yup.object().shape({
  title: yup.string().required(),
  category: yup.string().required(),
  defaultVariant: yup.string().required(),
  mutateVariantsOnPurchase: yup.boolean().optional()
});

export const salesInformationValidator = yup.object().shape({
  state: yup.string().optional(),
  expirationDate: yup.date()
    .typeError('Expiration date should be a valid date (e.g 12-12-2021)').required(),
  blogLink: yup.string().url().optional(),
  videoLink: yup.string().url().optional(),
});
