import React, { useEffect } from 'react';
import TableParent from '../Table/TableParent';

const headCells = [
  {
    id: 'invoiceId', numeric: true, disablePadding: false, label: 'Invoice ID'
  },
  {
    id: 'InvoiceDate', numeric: true, disablePadding: false, label: 'Invoice Date'
  },
  {
    id: 'Status', numeric: true, disablePadding: false, label: 'Status'
  },
  {
    id: 'Details', numeric: true, disablePadding: false, label: 'Details'
  },
  {
    id: 'Amount', numeric: true, disablePadding: false, label: 'Amount'
  },
  {
    id: 'Pay', numeric: true, disablePadding: false, label: 'Pay'
  },
];

const withoutPaidBtn = (header) => header.filter((head) => head.label !== 'Pay');

const PaidBills = ({ data, dispatch, invoices }) => {
  useEffect(() => {
    dispatch({
      type: 'PAID',
      payload: data
    });
  }, [data, dispatch]);

  return (
    <div>
      <TableParent
        rowsDatarows={invoices}
        headerData={withoutPaidBtn(headCells)}
        title="Paid "
      />
    </div>
  );
};

export default PaidBills;
