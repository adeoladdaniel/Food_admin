import React, { useState } from 'react';
import {
  Card,
  Table, TableBody, TableCell, TableHead, TableRow
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import Pagination from '../../../components/Pagination/Pagination';

const GiftTable = ({ data }) => {
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageLimit = 6;

  return (
    <Card>
      <PerfectScrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Registration Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(offset, offset + pageLimit).map((coperative) => (
                <TableRow hover key={coperative._id}>
                  <TableCell>
                    <img
                      height="70"
                      src={coperative.image.secureUrl}
                      alt={coperative.name}
                    />
                  </TableCell>
                  <TableCell>{coperative.name}</TableCell>
                  <TableCell>{coperative.qty}</TableCell>
                  <TableCell>
                    {moment(coperative.createdAt)
                      .format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Pagination
          pageLimit={pageLimit}
          setOffset={setOffset}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          data={data.length}
        />
      </PerfectScrollbar>
    </Card>
  );
};

export default GiftTable;
