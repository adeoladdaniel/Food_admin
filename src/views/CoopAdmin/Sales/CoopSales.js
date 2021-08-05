import React, { useEffect, useState } from 'react';
import CoopOrders from '../../../components/orders/CoopOrders';
import useGetQuery from '../../../hooks/api/useGetQuery';
import { BASE_URL } from '../../../services/config';

const CoopSales = () => {
  const [coopOrders, setCoopOrders] = useState([]);
  const { data, isLoading, error } = useGetQuery({
    baseUrl: BASE_URL.COOPERATIVE,
    endpoint: '/purchase',
    queryKey: '/purchase',
  });

  useEffect(() => {
    const getCoopSales = () => {
      const sortedItem = (data?.data || [])
        .filter((item) => (
          item.paymentType === 'coopWallet'
        ));
      setCoopOrders(sortedItem);
    };
    getCoopSales();
  }, [data]);

  return (
    <div>
      <CoopOrders
        data={coopOrders}
        loading={isLoading}
        error={error}
      />
    </div>
  );
};

export default CoopSales;
