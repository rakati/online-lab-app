import { camelCase, snakeCase } from 'lodash';

/**
 * Convert object keys to snake_case
 * @param {Object} obj - Object to convert
 * @returns {Object} - New object with snake_case keys
 */
export const convertKeysToSnakeCase = (obj) => {
  const converted = {};
  Object.keys(obj).forEach((key) => {
    converted[snakeCase(key)] = obj[key];
  });
  return converted;
};

/**
 * Convert object keys to camelCase
 * @param {Object} obj - Object to convert
 * @returns {Object} - New object with camelCase keys
 */
export const convertKeysToCamelCase = (obj) => {
  const converted = {};
  Object.keys(obj).forEach((key) => {
    converted[camelCase(key)] = obj[key];
  });
  return converted;
};
