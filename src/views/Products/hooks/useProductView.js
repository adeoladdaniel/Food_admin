import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Chip } from '@material-ui/core';
import moment from 'moment';
import _ from '../../../utils/functions/appUtils';
import theme from '../../../theme/palette';

const useProductView = () => {
  const productHeader = useMemo(() => [
    {
      Header: 'Image',
      Cell: ({ row }) => (
        <Avatar
          alt={row?.original?.title}
          src={row?.original?.image[0]}
          variant="square"
        />
      )
    },
    {
      Header: 'Name',
      accessor: 'title',
      Cell: ({ row }) => (
        _.reduceTitleLength(row.original.title)
      )
    },
    {
      Header: 'Vendor',
      Cell: ({ row }) => (
        _.reduceTitleLength(row.original.vendor.name)
      )
    },
    {
      Header: 'Available State',
      accessor: 'state'
    },
    {
      Header: 'Availability',
      Cell: ({ row }) => (
        <Chip
          component="span"
          size="small"
          label={row?.original?.isSoldOut ? 'N/A' : 'Available'}
          style={{
            background: row?.original?.isSoldOut
              ? theme.error.main
              : theme.success.main,
            color: theme.white
          }}
        />
      )
    },
    {
      Header: 'Created Date',
      Cell: ({ row }) => (
        moment(row.original.createdAt).format('LL')
      )
    },
  ], []);
  return {
    productHeader
  };
};

useProductView.propTypes = {
  props: PropTypes.object,
  refetch: PropTypes.func.isRequired
};

export default useProductView;
