import React, { useEffect, useState } from 'react';
import StatusChange from '../StatusChange/StatusChange';
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
    id: 'Actions', numeric: true, disablePadding: false, label: 'Actions'
  },
];

const Processing = ({
  data, dispatch,
  invoices, setRefetch,
  updateStatus
}) => {
  const [id, setId] = useState('');
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  useEffect(() => {
    if (data?.length) {
      dispatch({
        type: 'PROCESSING',
        payload: data
      });
    }
  }, [data, dispatch, setRefetch]);

  return (
    <div>
      <StatusChange
        id={id}
        open={open}
        setOpen={setOpen}
        setRefetch={setRefetch}
        deliveryStatus={status}
      />
      <TableParent
        updateStatus={updateStatus}
        setId={setId}
        setOpen={setOpen}
        title="Due Payments"
        setStatus={setStatus}
        headerData={headCells}
        rowsDatarows={invoices}
      />
    </div>
  );
};

export default Processing;
