import axios from 'axios';

const BASE_URL = {
  AGENTS: `${process.env.REACT_APP_BASE_URL_AGENTS}/api`,
  USERS: `${process.env.REACT_APP_BASE_URL_USER}/api`,
  ADMIN: `${process.env.REACT_APP_BASE_URL_ADMIN}/api`,
  COOPERATIVE: `${process.env.REACT_APP_BASE_URL_COOPERATIVE}/v1/cooperative`,
  COOPERATIVE_API: `${process.env.REACT_APP_BASE_URL_COOPERATIVE}/api`,
};

const FoodCrowdyApi = axios.create({
  baseURL: BASE_URL.COOPERATIVE_API,
  responseType: 'json'
});

export { BASE_URL, FoodCrowdyApi };
