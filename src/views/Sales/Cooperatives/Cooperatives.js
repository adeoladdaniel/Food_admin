import React from 'react';
import CustomerOrders from '../../../components/orders/Orders';
import useGetQuery from '../../../hooks/api/useGetQuery';
import { BASE_URL } from '../../../services/config';

const Cooperatives = ({
  coopId,
  setCoopId,
  isCoopAdmin
}) => {
  const { data, isLoading, error } = useGetQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: `/purchase?cooperativeId=${coopId}`,
    queryKey: 'all-platform-orders',
  });

  return (
    <CustomerOrders
      data={data?.data}
      error={error}
      loading={isLoading}
      setCoopId={setCoopId}
      isCoopAdmin={isCoopAdmin}
    />
  );
};

export default Cooperatives;
