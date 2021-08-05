import React from 'react';
import { CSVLink } from 'react-csv';
import { Button } from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';

const CSVDownLoad = ({
  CSVheaders,
  data, label,
  title, filename
}) => {
  return (

    <CSVLink
      headers={CSVheaders}
      data={data}
      style={{ color: '#fff' }}
      title={title}
      filename={filename}
    >
      <Button
        variant="contained"
        color="primary"
        endIcon={<CloudDownload />}
      >
        {' '}
        {label}
      </Button>
    </CSVLink>
  );
};

CSVDownLoad.defaultProps = {
  title: 'Download excel sheet',
  filename: 'Cooperative_Gifts.csv',
  label: 'Export',
  data: [],
};

export default CSVDownLoad;
