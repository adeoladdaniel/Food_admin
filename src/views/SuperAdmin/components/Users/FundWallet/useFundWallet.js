import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { handleError } from '../../../../../errors/HandleError';
import useMutationQuery from '../../../../../hooks/api/useMutationQuery';
import { BASE_URL } from '../../../../../services/config';
import { formatter } from '../../../../../utils/localStore';

const useFundWallet = ({ data, refetch }) => {
  const [user, setUser] = useState({ amount: 0 });
  const [error, setError] = useState('');
  const [state, setState] = useState({
    status: false,
  });

  const { mutate, isLoading: loading } = useMutationQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: `/users/${data._id}`,
    type: 'patch'
  });

  const handleCheckBox = (event) => {
    setState({
      [event.target.name]: event.target.checked
        ? 'enabled' : 'disabled'
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ [name]: +value });
  };

  const onError = (error) => {
    const { message } = handleError(error);
    setError(message);
  };

  const onSuccess = (res) => {
    toast.success(res?.data?.message);
    setError('');
    refetch();
  };

  const handleComplaints = async (e) => {
    e.preventDefault();
    const MAX_AMOUNT = 100000;
    const { amount } = user;
    if (!amount === 0) return toast.error('You need to add a value ');
    if (amount > MAX_AMOUNT) {
      return toast.error(`
      cooperative wallet cannot exceed
       ${formatter.format(MAX_AMOUNT)}
       `);
    }
    const data = {
      wallet: {
        balance: amount,
        status: state.status,
      }
    };
    mutate(data, { onSuccess, onError });
  };

  useEffect(() => {
    setUser({ amount: data?.wallet?.balance });
    setState({ status: data?.wallet?.status });
  }, [data]);

  return {
    user,
    state,
    error,
    loading,
    handleChange,
    handleCheckBox,
    handleComplaints,
  };
};

export default useFundWallet;
