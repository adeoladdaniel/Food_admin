import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import EditCategory from '../CategoryTable/EditCategrory';
import DeleteCategory from '../CategoryTable/DeleteCategory';

const useTablePattern = ({ refetch }) => {
  const memoizedHeader = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: 'Edit',
      Cell: (values) => (
        <EditCategory
          refetch={refetch}
          {...values}
        />
      )

    },
    {
      Header: 'Delete',
      Cell: (values) => (
        <DeleteCategory
          refetch={refetch}
          {...values}
        />
      )
    },
  ], [refetch]);

  return {
    memoizedHeader,
  };
};

useTablePattern.propTypes = {
  refetch: PropTypes.func.isRequired
};

export default useTablePattern;
