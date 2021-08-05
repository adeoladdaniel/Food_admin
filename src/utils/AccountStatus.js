import roles from './Roles';

export const AccountStatus = [
  'confirmed',
  'suspended',
  'declined',
  'active'
];

export const AccountFilter = [
  'All',
  'pending',
  'confirmed',
  'suspended',
  'declined',
  'activated',
];
export const ApproveAccount = ['confirmed', 'declined'];
export const Active = ['confirmed', 'declined'];
export const SuspendAccount = ['confirmed'];
export const Declined = ['confirmed'];

export const statusColors = {
  delivered: 'success',
  pending: 'warning',
  refunded: 'danger',
  confirmed: 'success',
  suspended: 'danger',
  declined: 'info',
  activated: 'success',
  successful: 'success',
  processing: 'warning',
  failed: 'danger',
  'set for delivery': 'info',
  active: 'success',
};

export const orderDeliveryStatus = [
  'processing',
  'set for delivery',
  'delivered'
];
export const settlementStatus = [
  'processing',
  'paid',
  'declined',
  'outstanding'
];
export const productState = ['Lagos', 'Rivers'];
export const paymentStatus = ['successful', 'failed'];
export const deliveryType = ['Door Delivery', 'Pick Up'];
export const permissions = ['admin', 'user', 'cooperative'];

export const accountRoles = [
  roles.PRODUCT,
  roles.CUSTOMER_CARE,
  roles.COOP_ADMIN,
  roles.LOGISTICS,
  roles.SALES
];

export const emailStatus = [
  {
    id: 1,
    value: '',
    name: 'All'
  },
  {
    id: 3,
    value: true,
    name: 'Verified'
  },
  {
    id: 2,
    value: false,
    name: 'Pending'
  }
];

export const platformTypes = ['internal', 'external '];
