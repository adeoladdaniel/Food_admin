import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useTheme } from '@material-ui/styles';
import { Avatar } from '@material-ui/core';
import useMutationQuery from '../../../../hooks/api/useMutationQuery';
import { BASE_URL } from '../../../../services/config';
import { handleError } from '../../../../errors/HandleError';
import { platformTypes } from '../../../../utils/AccountStatus';
import ActionMenu from '../AddPlatform.js/Actions/ActionsMenu';

const user = {
  type: 'internal',
  name: '',
  authUrl: '',
  location: 'Lagos',
  accessKey: '',
  subdomain: '',
  permission: 'cooperative',
  percentageProfit: '',
  deliveryWebhookUrl: '',
};

const usePlatform = ({ refetch, setOpen, platformById }) => {
  const theme = useTheme();
  const [platFormInfo, setPlatFormInfo] = useState(user);
  const [imageUrl, setImageUrl] = useState({ files: '' });
  const [secondaryCr, setSecondaryCr] = useState(theme?.palette?.primary?.main);
  const [primaryCr, setPrimaryCr] = useState(theme?.palette?.secondary?.main);
  const { mutate, isLoading } = useMutationQuery({
    baseUrl: BASE_URL.COOPERATIVE_API,
    endpoint: '/platform',
  });

  const onError = (error) => {
    const { message } = handleError(error);
    toast.error(message, { toastId: '44' });
  };

  const updateImage = (fileItems) => {
    if (fileItems.length) {
      setImageUrl({
        files: fileItems[0]?.file
      });
    }
  };

  const onSuccess = (res) => {
    toast.success(res?.data?.message, { toastId: '44' });
    refetch();
    setOpen();
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setPlatFormInfo((userData) => ({
      ...userData,
      [name]: value
    }));
  };

  const onAddPlatform = async (e) => {
    e.preventDefault();
    const theme = {
      primary: {
        main: primaryCr
      },
      secondary: {
        main: secondaryCr
      },

    };
    const formData = new FormData();
    formData.append('logo', imageUrl?.files);
    formData.append('name', platFormInfo.name);
    formData.append('type', platFormInfo.type);
    formData.append('authUrl', platFormInfo.authUrl);
    formData.append('location', platFormInfo.location);
    formData.append('accessKey', platFormInfo.accessKey);
    formData.append('permission', platFormInfo.permission);
    formData.append('percentageProfit', +platFormInfo.percentageProfit);
    if (platFormInfo.type === platformTypes[0]) formData.append('subdomain', platFormInfo.subdomain);
    if (platFormInfo.type === platformTypes[0]) formData.append('themes', JSON.stringify(theme));
    if (platFormInfo.type === platformTypes[1]) formData.append('deliveryWebhookUrl', platFormInfo.deliveryWebhookUrl);
    mutate(formData, { onSuccess, onError });
  };

  useEffect(() => {
    if (typeof platformById === 'object'
     && Object.values(platformById).length) {
      setPlatFormInfo(platformById);
    }
  }, [platformById]);

  const PlatformHeader = useMemo(() => [
    {
      Header: 'Logo',
      Cell: ({ row }) => (
        <Avatar
          alt={row?.original?.name}
          src={row?.original?.logo}
          variant="square"
        />
      )
    },
    {
      Header: 'name',
      accessor: 'name'
    },
    {
      Header: 'Location',
      accessor: 'location'
    },
    {
      Header: 'Permission',
      accessor: 'permission'
    },
    {
      Header: 'Sub Domain',
      accessor: 'subdomain'
    },

    {
      Header: 'Reg. Date',
      Cell: ({ row }) => (
        <>
          {moment(row?.original?.createdAt).format('LLL')}
        </>
      )
    },
    {
      Header: 'Actions',
      Cell: (props) => (
        <ActionMenu
          {...props}
          refetch={refetch}
        />
      )
    },
  ], [refetch]);

  return {
    isLoading,
    handleChange,
    onAddPlatform,
    platFormInfo,
    updateImage,
    imageUrl,
    secondaryCr,
    setSecondaryCr,
    primaryCr,
    setPrimaryCr,
    setPlatFormInfo,
    PlatformHeader
  };
};

usePlatform.propTypes = {
  refetch: PropTypes.func.isRequired
};

export default usePlatform;
