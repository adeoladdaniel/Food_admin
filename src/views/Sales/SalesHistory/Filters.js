import React from 'react';
import { SearchInput } from '../../../components';

const Filters = ({
  classes, data, setPage,
  dispatch,
}) => {
  const handleSearch = (e) => {
    e.preventDefault();
    const { value } = e.target;
    dispatch({
      type: 'QUERY',
      payload: {
        data,
        value
      }
    });
    setPage(0);
  };
  return (
    <div>
      <div className={classes?.SearchBar}>
        <SearchInput
          style={{ width: '70%', margin: '.8rem' }}
          placeholder="Search by customer name"
          className=""
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default Filters;
