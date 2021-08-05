import { Skeleton } from '@material-ui/lab';
import React from 'react';
import CustomizableTable from '../../../../../components/CustomTable/CustomTable';
import useProductHeader from '../../hooks/useProductHeader';

const ListSkeleton = () => {
  return (
    <>
      {Array.from(new Array(10)).map((_, i) => (
        <Skeleton
          key={i++}
          variant="rect"
          width="90%"
          height="50"
          animation="wave"
          style={{ margin: '.3rem auto' }}
        />
      ))}
    </>
  );
};

const ProductTable = ({
  data, setData, search,
  isLoading
}) => {
  const { productHeader } = useProductHeader();
  return (
    <>
      {isLoading ? <ListSkeleton /> : (
        <CustomizableTable
          setData={setData}
          columns={productHeader}
          withoutSearchBar
          data={search.length || data}
          tableTitle={`${data.length} Products`}
        />
      )}
    </>
  );
};

export default ProductTable;
