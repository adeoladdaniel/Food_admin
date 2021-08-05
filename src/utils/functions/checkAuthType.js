export const checkAuthType = (type, history, location) => {
  switch (type) {
  case 'INVALID_TOKEN':
    localStorage.setItem('__accessPath', JSON.stringify(location.pathname));
    return history.push('/sign-in');
  case 'NO_TOKEN':
    return history.push('/sign-in');
  case 'FORBIDDEN':
    localStorage.setItem('__accessPath', JSON.stringify(location.pathname));
    return history.push('/sign-in');
  case 'INVALID_ACCOUNT':
    return history.push('/sign-in');
  default:
    break;
  }
};
