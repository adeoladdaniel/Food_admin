/* eslint-disable no-console */
const envKey = require('../config/env.config');

/**
 * To check that all Environment variables are set
 * @returns array of missing variables
 */

const checkEmptyKeys = () => {
  const missingKays = Object.keys(envKey).map((key) => {
    const keys = [];
    if (!envKey[key]) {
      keys.push(key);
    }
    return keys;
  });
  return missingKays.flat();
};

const missingKeys = checkEmptyKeys();

if (!missingKeys) {
  console.error(`Missing Environment Variables, 
    location path : src/config/env.config.js
  `);
  console.table(missingKeys);
  process.exit(1);
}

console.log(process.env);
