import { useState } from 'react';
import { toast } from 'react-toastify';
import { handleError } from '../../../../../../errors/HandleError';
import useMutationQuery from '../../../../../../hooks/api/useMutationQuery';
import { BASE_URL } from '../../../../../../services/config';

const user = {
  name: '',
  email: '',
  location: '',
  platformId: ''
};

const useAddUser = ({ refetch }) => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(user);
  const [phoneNumber, setPhoneNumber] = useState('');
  const { mutate, isLoading } = useMutationQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: '/users',
  });
  const onError = (error) => {
    const { message } = handleError(error);
    toast.error(message, { toastId: '44' });
  };

  const onSuccess = (res) => {
    toast.success(res?.data?.message, { toastId: '44' });
    refetch();
    setOpen(false);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUserData((userData) => ({
      ...userData,
      [name]: value
    }));
  };

  const addUser = async (e) => {
    e.preventDefault();
    const data = {
      ...userData,
      phoneNumber
    };
    mutate(data, { onSuccess, onError });
  };

  const handleClickOpen = () => setOpen(true);
  return {
    open,
    addUser,
    setOpen,
    userData,
    isLoading,
    handleChange,
    setPhoneNumber,
    handleClickOpen,
  };
};

export default useAddUser;
