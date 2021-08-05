import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { handleError } from '../../../../../../errors/HandleError';
import useMutationQuery from '../../../../../../hooks/api/useMutationQuery';
import { BASE_URL } from '../../../../../../services/config';

const useAccount = ({ data, refetch }) => {
  const [accountStatus, setAccountStatus] = useState('');
  const [error, setError] = useState('');
  const [accountPermission, setPermissions] = useState('');
  const [open, setOpen] = useState({
    accountStatus: false,
    permissions: false,
  });

  const { mutate, isLoading: loading } = useMutationQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: `/users/${data._id}`,
    type: 'patch'
  });

  const [roles, setRoles] = useState([]);

  const handleRoles = (event) => {
    setRoles(event.target.value);
  };

  const handleAccountStatus = (event) => {
    setAccountStatus(event.target.value);
  };
  const handlePermission = (event) => {
    setPermissions(event.target.value);
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

  const handleAccountActions = async (e) => {
    e.preventDefault();
    const data = {
      roles,
      accountStatus,
      permission: accountPermission,
    };
    mutate(data, { onSuccess, onError });
  };

  const handleClose = () => {
    setOpen(() => ({
      accountStatus: false,
      permissions: false,
    }));
  };

  useEffect(() => {
    setAccountStatus(data.accountStatus);
    setPermissions(data.permission);
    setRoles(data.roles);
  }, [data]);

  return {
    open,
    error,
    roles,
    loading,
    setOpen,
    handleRoles,
    handleClose,
    accountStatus,
    handlePermission,
    accountPermission,
    handleAccountStatus,
    handleAccountActions
  };
};

export default useAccount;
