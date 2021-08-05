export const getUserData = (info) => {
  if (localStorage.getItem('_FCAdmin_')) {
    try {
      const userID = JSON.parse(localStorage.getItem('_FCAdmin_'));
      return userID[info];
    } catch (error) {
      return null;
    }
  } else {
    return null;
  }
};

export const getPrevLocation = () => {
  if (localStorage.getItem('__accessPath')) {
    try {
      const userID = JSON.parse(localStorage.getItem('__accessPath'));
      return userID;
    } catch (error) {
      return null;
    }
  } else {
    return null;
  }
};

export const saveAdminDetails = (user) => {
  const currentUser = {};
  currentUser.id = user._id;
  currentUser.role = user.roles;
  currentUser.email = user.email;
  currentUser.state = user.location;
  currentUser.uniqueId = user.uniqueId;
  currentUser.lastName = user.lastName;
  currentUser.firstName = user.firstName;
  currentUser.cooperative = user?.cooperativeId;
  localStorage.setItem('_FCAdmin_', JSON.stringify(currentUser));
};

export const clearUserData = () => localStorage.removeItem('_FCAdmin_');
