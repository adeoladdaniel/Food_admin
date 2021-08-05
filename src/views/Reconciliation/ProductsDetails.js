import React, { useMemo, useState } from 'react';
import CoopOrders from '../../components/orders/CoopOrders';
import OrderSummary from '../../components/ordersSummary/OrderSummary';
import useGetQuery from '../../hooks/api/useGetQuery';
import { useQuery } from '../../hooks/useQuery';
import { BASE_URL } from '../../services/config';

const ProductsDetails = ({ location }) => {
  const orderRef = useQuery(location).get('orderRef');
  const [totalDeliveryFee, setTotalDeliveryFee] = useState(0);
  const [totalProductFee, setTotalProductFee] = useState(0);
  const { data, isLoading, error } = useGetQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: `/settlement/${orderRef}`,
    queryKey: `/settlement/${orderRef}`,
  });

  const getTotalProductPrice = (data) => data?.payment.reduce((a, b) => a + b.amount, 0);
  const getTotalDeliveryPrice = (data) => data?.payment.reduce((a, b) => (
    a + b.invoice?.delivery?.price
  ), 0);

  useMemo(() => {
    if (data?.payment) {
      setTotalDeliveryFee(getTotalDeliveryPrice(data));
      setTotalProductFee(getTotalProductPrice(data));
    }
  }, [data]);

  return (
    <div style={{ margin: '1rem .7rem' }}>
      <OrderSummary
        data={data}
        totalproductFee={totalProductFee}
        totalDeliveryFee={totalDeliveryFee}
      />
      <CoopOrders
        error={error}
        loading={isLoading}
        data={data?.payment}
      />
    </div>
  );
};

export default ProductsDetails;
