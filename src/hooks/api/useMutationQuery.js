import { useMutation } from 'react-query';
import axios from 'axios';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import UserUtils from '../../utils/functions/utilsFunc';
import { handleError } from '../../errors/HandleError';

export default function useMutationQuery({
  baseUrl, endpoint, options, type
}) {
  const { headers } = UserUtils.userToken();

  const mutationFn = async (data) => {
    let response;
    if (type === 'delete') {
      response = await axios[type](`${baseUrl}${endpoint}`, {
        headers
      });
    } else {
      response = await axios[type || 'post'](`${baseUrl}${endpoint}`, data, {
        headers
      });
    }
    return response;
  };

  const { error } = useMutation(mutationFn, options || null);

  if (error) {
    const { message } = handleError(error);
    toast.error(message, { toastId: 'error' });
  }
  return useMutation(mutationFn, options || null);
}

useMutationQuery.propTypes = {
  isAuth: PropTypes.bool,
  options: PropTypes.object,
  baseUrl: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
  queryKey: PropTypes.string.isRequired,
};
