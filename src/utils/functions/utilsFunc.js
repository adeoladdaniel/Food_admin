/* eslint-disable indent */
import Cookies from 'js-cookie';

class UserUtils {
  static checkAuthType(type, history, location) {
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
  }

  static getUserData(info) {
    if (localStorage.getItem('_FCAdmin_')) {
      try {
        const userID = JSON.parse(localStorage.getItem('_FCAdmin_'));
        return info ? userID[info] : userID;
      } catch (error) {
        return null;
      }
    } else {
      return null;
    }
  }

  static getPrevLocation() {
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
  }

  static saveAdminDetails(user) {
    const currentUser = {};
    currentUser.id = user._id;
    currentUser.role = user.roles;
    currentUser.email = user.email;
    currentUser.state = user.location;
    currentUser.uniqueId = user.uniqueId;
    currentUser.lastName = user.lastName;
    currentUser.name = user.name;
    currentUser.firstName = user.firstName;
    currentUser.cooperative = user?.platformId;
    localStorage.setItem('_FCAdmin_', JSON.stringify(currentUser));

    return currentUser;
  }

  static clearUserData() {
    localStorage.removeItem('_FCAdmin_');
  }

  static saveUserDetails(newUser) {
    const currentUser = {};
    currentUser.id = newUser._id;
    currentUser.name = newUser.name;
    currentUser.uniqueId = newUser.uniqueId;
    currentUser.roles = newUser.roles;
    localStorage.setItem('_user', JSON.stringify(currentUser));
  }

  static saveAuthToken(token) {
    Cookies.set('x-auth-token', token);
  }

  static userToken() {
    const token = Cookies.get('x-auth-token');
    // if (!token) return null;
    return {
      headers: {
        'content-Type': 'application/json',
        'x-auth-token': token ? `${token}` : null
      }
    };
  }

  static clearUserToken() {
    Cookies.remove('x-auth-token');
  }
}

export default UserUtils;
