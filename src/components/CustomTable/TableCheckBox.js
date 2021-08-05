import React, { forwardRef, useEffect, useRef } from 'react';
import { Checkbox } from '@material-ui/core';

const IndeterminateCheckbox = forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <Checkbox aria-hidden ref={resolvedRef} {...rest} />
      </>
    );
  }
);

export const checkBoxResolver = (hooks) => {
  hooks.allColumns.push((columns) => [
    // Let's make a column for selection
    {
      id: 'selection',
      // The header can use the table's getToggleAllRowsSelectedProps method
      // to render a checkbox.  Pagination is a problem since this will select all
      // rows even though not all rows are on the current page.  The solution should
      // be server side pagination.  For one, the clients should not download all
      // rows in most cases.  The client should only download data for the current page.
      // In that case, getToggleAllRowsSelectedProps works fine.
      Header: ({ getToggleAllRowsSelectedProps }) => (
        <div>
          <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
        </div>
      ),
      // The cell can use the individual row's getToggleRowSelectedProps method
      // to the render a checkbox
      Cell: ({ row }) => (
        <div>
          <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        </div>
      )
    },
    ...columns
  ]);
};

export default IndeterminateCheckbox;
