import React, {
  useEffect, useReducer, useState, useMemo
} from 'react';
import { useSelector } from 'react-redux';
import OrderSummary from '../ordersSummary/OrderSummary';
import OrderTable from './CoopOrders';
import OrderToolBar from './filterOrders/OrderToolBar';
import { orderReducer } from './filterOrders/reducers';

// const useStyles = makeStyles((theme) => (Styles(theme)));

const CustomerOrders = ({
  data,
  loading,
  error,
  setCoopId,
  isCoopAdmin
}) => {
  const [state, setState] = useState('');
  const coops = useSelector((state) => state.cooperatives.coops);
  const [coopOrders, dispatch] = useReducer(orderReducer, []);
  const [totalDeliveryFee, setTotalDeliveryFee] = useState(0);
  const [totalProductFee, setTotalProductFee] = useState(0);

  const getTotalProductPrice = (data) => data.reduce((a, b) => a + b?.invoice?.totalPrice, 0);
  const getTotalDeliveryPrice = (data) => data.reduce((a, b) => a + b.invoice?.delivery?.price, 0);

  useMemo(() => {
    if (coopOrders.length) {
      setTotalDeliveryFee(getTotalDeliveryPrice(coopOrders));
      setTotalProductFee(getTotalProductPrice(coopOrders));
    }
  }, [coopOrders]);

  useEffect(() => {
    if (data?.length) {
      dispatch({
        type: 'GET_COOP_ORDERS',
        payload: data
      });
    }
  }, [data]);

  return (
    <div>
      <OrderSummary
        data={data}
        totalDeliveryFee={totalDeliveryFee}
        totalproductFee={totalProductFee}
      />
      <OrderToolBar
        data={data}
        state={state}
        coops={coops}
        classes={{}}
        dispatch={dispatch}
        setState={setState}
        setCoopId={setCoopId}
        isCoopAdmin={isCoopAdmin}
      />
      <OrderTable
        isAdmin
        error={error}
        data={coopOrders}
        loading={loading}
      />
    </div>
  );
};

export default CustomerOrders;
