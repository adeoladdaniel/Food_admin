import React, { useMemo } from 'react';
import { Add } from '@material-ui/icons';
import _ from '../../../../utils/functions/appUtils';

const useProductHeader = () => {
  const productHeader = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'title',
      Cell: ({ row }) => (
        _.reduceTitleLength(row.original.title)
      )
    },
    {
      Header: 'Category',
      accessor: 'category',
    },
    {
      Header: 'Actions',
      Cell: () => (
        <Add />
      )
    },
  ], []);
  return {
    productHeader
  };
};

export default useProductHeader;
