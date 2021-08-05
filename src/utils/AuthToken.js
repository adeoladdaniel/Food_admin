export const saveUserDetails = (newUser) => {
  const currentUser = {};
  currentUser.id = newUser._id;
  currentUser.name = newUser.name;
  currentUser.uniqueId = newUser.uniqueId;
  currentUser.roles = newUser.roles;
  localStorage.setItem('_user', JSON.stringify(currentUser));
};
