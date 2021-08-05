import React from 'react';
import { Divider, TextField } from '@material-ui/core';
import { stateLocation } from '../../../../utils/localStore';
import { SearchInput } from '../../../../components';
import { orderDeliveryStatus } from '../../../../utils/AccountStatus';

const Filters = ({
  handleCoopChange,
  coops, querySearch,
  classes, data, setPage,
  dispatch, isCoopAdmin, coopId
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
      {!isCoopAdmin && (
        <TextField
          id="outlined-native"
          select
          required
          size="small"
          onChange={handleCoopChange}
          name="state"
          variant="outlined"
          SelectProps={{
            native: true
          }}
        >
          <option value="">Select Cooperative</option>
          {coops.map((option) => (
            <option key={option.name} value={option._id}>
              {option.name}
            </option>
          ))}
        </TextField>
      )}

      <TextField
        id="outlined-query"
        select
        required
        size="small"
        onChange={(e) => querySearch(e)}
        name="state"
        variant="outlined"
        SelectProps={{
          native: true
        }}
      >
        <option value="All">
          All
        </option>
        {stateLocation.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </TextField>
      <TextField
        id="outlined-query"
        select
        required
        size="small"
        onChange={(e) => {
          const { value } = e.target;
          dispatch({
            type: 'DELIVERY_STATUS',
            payload: {
              data,
              value,
              coopId
            }
          });
          setPage(0);
        }}
        name="status"
        variant="outlined"
        SelectProps={{
          native: true
        }}
      >
        <option value="All">
          All
        </option>
        {orderDeliveryStatus.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </TextField>
      <div className={classes?.SearchBar}>
        <SearchInput
          style={{ width: '70%' }}
          placeholder="Search by customer name"
          className=""
          onChange={handleSearch}
        />
      </div>
      <Divider />
    </div>
  );
};

export default Filters;
