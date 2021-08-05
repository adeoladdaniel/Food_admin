/*eslint-disable*/
let PUBLIC_URL = '';

const DEV_URL = 'http://localhost:3003/';
// const PROD_URL = 'https://foodcrowdy-admin-prelaunch.netlify.app';
const PROD_URL = 'https://admin.foodcrowdy.com/';

if (process.env.NODE_ENV === 'development') {
  PUBLIC_URL = DEV_URL;
} else {
  PUBLIC_URL = PROD_URL;
}

export { PUBLIC_URL };
