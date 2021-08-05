/* eslint-disable array-callback-return */
export const _2NameOrId = (allCoop, comparedValue = [], type) => {
  const test = [];
  if (!comparedValue.length) return test;

  for (let index = 0; index < comparedValue.length; index++) {
    if (type === 'id') {
      allCoop.map((name) => {
        if (name._id === comparedValue[index]) {
          return test.push(name.name);
        }
      });
    } else if (type === 'name') {
      allCoop.map((name) => {
        if (name.name === comparedValue[index]) {
          return test.push(name._id);
        }
      });
    }
  }
  return test;
};

/**
 * Form to validate Added Variants...
 */

export const purgeDbIds = (data) => {
  const modifiedVariants = data.map((item) => ({
    ...item,
    variant: item.variant.map(({
      _id,
      __v,
      variantId,
      platformId,
      ...rest
    }) => (rest))
  }));
  return modifiedVariants;
};

export const validateVariants = (variants) => {
  const isError = variants.some((item) => {
    return Object.values(item).some((value) => value === '' || value === 0);
  });

  return isError;
};

/**
 * Calculate Profit for Variants
 */

export const variantProfit = (field) => {
  let profit = '';
  const {
    price,
    basePrice
  } = field;
  if (price && basePrice) {
    const diff = (Number(price) - Number(basePrice)) / Number(basePrice);
    profit = Math.floor(diff * 100);
  }
  return profit;
};

export const initialFields = {
  price: '',
  unit: '',
  basePrice: '',
  quantity: 0,
  marketPrice: '',
  conversionUnit: '',
  // unitDescription: ''
};
