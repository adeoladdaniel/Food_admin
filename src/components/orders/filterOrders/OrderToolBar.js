import React from 'react';
import { TextField } from '@material-ui/core';
import { stateLocation } from '../../../utils/localStore';
import { SearchInput } from '../..';
import { orderDeliveryStatus } from '../../../utils/AccountStatus';

const OrderToolBar = ({
  data,
  state,
  coops,
  classes,
  setState,
  dispatch,
  isCoopAdmin,

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
  };

  return (
    <>
      {!isCoopAdmin && (
        <TextField
          id="order-state"
          select
          required
          size="small"
          onChange={(e) => {
            dispatch({
              type: 'GET_BY_COOP',
              payload: {
                data,
                state,
                coopId: e.target.value,
              }
            });
          }}
          name="state"
          className={classes.textInput}
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
        id="deliveryStatus-query"
        select
        required
        size="small"
        onChange={(e) => {
          const { value } = e.target;
          dispatch({
            type: 'DELIVERY_STATUS',
            payload: {
              data,
              value
            }
          });
        }}
        name="state"
        value={state}
        variant="outlined"
        SelectProps={{
          native: true
        }}
        className={classes.textInput}
      >
        <option value="">
          All
        </option>
        {orderDeliveryStatus.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </TextField>
      <TextField
        id="outlined-query"
        select
        required
        size="small"
        onChange={(e) => {
          setState(e.target.value);
          const { value } = e.target;
          dispatch({
            type: 'GET_BY_STATES',
            payload: {
              data,
              value
            }
          });
        }}
        name="state"
        value={state}
        variant="outlined"
        SelectProps={{
          native: true
        }}
        className={classes.textInput}
      >
        <option value="">
          All
        </option>
        {stateLocation.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
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
    </>
  );
};

export default OrderToolBar;
