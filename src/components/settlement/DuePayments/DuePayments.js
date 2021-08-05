/* eslint-disable*/
import React, { useEffect, useState } from 'react';
import MakePayment from '../MakePayments/MakePayment';
import TableParent from '../Table/TableParent';

const headCells = [
  {
    id: 'invociesId', numeric: true, disablePadding: false, label: 'Invoice ID'
  },
  {
    id: 'InvoiceDate', numeric: true, disablePadding: false, label: 'Invoice Date'
  },
  {
    id: 'Status', numeric: true, disablePadding: false, label: 'Status'
  },
  {
    id: 'Deatils', numeric: true, disablePadding: false, label: 'Details'
  },
  {
    id: 'Amount', numeric: true, disablePadding: false, label: 'Amount'
  },
  {
    id: 'Pay', numeric: true, disablePadding: false, label: 'Pay'
  },
];

const DuePayments = ({
  data, dispatch, isPaid,
  invoices, setRefetch
}) => {
  const [id, setId] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (data?.length) {
      dispatch({
        type: 'OUTSTANDING',
        payload: data
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div>
      <MakePayment
        id={id}
        open={open}
        setRefetch={setRefetch}
        setOpen={setOpen}
      />
      <TableParent
        rowsDatarows={invoices}
        headerData={headCells}
        setId={setId}
        isPaid={isPaid}
        setOpen={setOpen}
        title="Due Payments"
      />
    </div>
  );
};

export default DuePayments;
