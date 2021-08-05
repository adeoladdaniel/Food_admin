import { toast } from 'react-toastify';

const TOAST_ID = 'handle Error';
const statusCode = [401, 400, 413, 422, 404, 403];

export const handleError = (error) => {
  if (error.response === undefined) {
    return {
      message: 'Network not available',
      status: 'UNKNOWN',
      type: 'NETWORK_ERROR'
    };
  }
  if (error.response) {
    if (error.response.status === 500) {
      toast.error('Internal server error', {
        toastId: TOAST_ID
      });
      return {
        message: 'internal server error',
        status: error.response.status,
        type: 'SERVER_ERROR'
      };
    }
    if (statusCode.includes(error.response.status)) {
      toast.error(error.response.message, { toastId: TOAST_ID });
      return {
        message: error.response.data.message,
        status: error.response.status,
        type: error.response.data.type
      };
    }
  } else {
    toast.error(error.response.data.message, {
      toastId: TOAST_ID
    });
    return {
      message: 'something went wrong',
      status: 'UNKNOWN',
      type: 'UNKNOWN'
    };
  }
};
