/* eslint-disable no-restricted-syntax */
class appUtils {
  static getProductTotal(item) {
    return item.reduce((a, b) => a + b.qty * b.price, 0);
  }

  static reduceTitleLength(item, slicers) {
    return item.slice(0, slicers || 10);
  }

  static saveLocalStoreItem({ name, data }) {
    localStorage.setItem(name, JSON.stringify(data));
  }

  static getLocalStoreItem = ({ name, type }) => {
    const items = localStorage.getItem(name);
    if (items) {
      try {
        return JSON.parse(items);
      } catch (error) {
        return type;
      }
    } else {
      return type;
    }
  };

  static convertQuery(data) {
    return Object.keys(data).map((key) => {
      const val = data[key];
      return `${key}=${encodeURIComponent(`${val}`.replace(/\s/g, '_'))}`;
    }).join('&');
  }

  static parseParams(query, params) {
    const user = {};
    if (!query) return;
    for (const key of params.keys()) {
      if (params.getAll(key).length > 1) {
        user[key] = params.getAll(key);
      } else {
        user[key] = params.get(key);
      }
    }
    return user;
  }
}

export default appUtils;
