import {
  ApproveAccount, SuspendAccount, Active, Declined
} from '../AccountStatus';

export const getStatus = (status) => {
  switch (status) {
  case 'pending':
    return ApproveAccount;
  case 'confirmed':
    return SuspendAccount;
  case 'suspended':
    return ApproveAccount;
  case 'activated':
    return Active;
  case 'declined':
    return Declined;
  default:
    return [];
  }
};
