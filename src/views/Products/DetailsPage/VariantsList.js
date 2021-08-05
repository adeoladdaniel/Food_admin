import { Paper } from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import CustomizableTable from '../../../components/CustomTable/CustomTable';

const VariantsList = ({ variants }) => {
  const [data] = useState(variants);

  const productHeader = useMemo(() => [
    {
      Header: 'Variant ID',
      accessor: 'variantId',
    },
    {
      Header: 'Unit',
      accessor: 'unit',
    },
    {
      Header: 'Conversion Unit',
      accessor: 'conversionUnit',
    },
    {
      Header: 'Quantity',
      accessor: 'quantity',
    },
    {
      Header: 'Base Price',
      accessor: 'basePrice',
    },

    {
      Header: 'Price',
      accessor: 'marketPrice'
    },

  ], []);

  return (
    <Paper>
      <CustomizableTable
        data={data}
        withoutSearchBar
        columns={productHeader}
        tableTitle="Product Variants"
      />
    </Paper>
  );
};

export default VariantsList;
