import { useQuery } from 'react-query';
import axios from 'axios';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router-dom';
import UserUtils from '../../utils/functions/utilsFunc';
import { handleError } from '../../errors/HandleError';
import { checkAuthType } from '../../utils/functions/checkAuthType';

export default function useGetQuery({
  baseUrl, endpoint,
  options = {},
  queryKey, isAuth = true
}) {
  const { headers } = UserUtils.userToken();
  const history = useHistory();
  const location = useLocation();
  const getRequest = async () => {
    const { data } = await axios.get(`${baseUrl}${endpoint}`, isAuth ? {
      headers
    } : null);
    return data;
  };
  options.refetchOnWindowFocus = false;

  const { error } = useQuery(queryKey, getRequest, options);
  if (error) {
    const { type, message } = handleError(error);
    checkAuthType(type, history, location);
    toast.error(message, { toastId: 'error' });
  }

  return useQuery(queryKey, getRequest, options);
}

useGetQuery.propTypes = {
  isAuth: PropTypes.bool,
  options: PropTypes.object,
  baseUrl: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
  queryKey: PropTypes.string.isRequired,
};
