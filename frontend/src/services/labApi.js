import api from './api';
import { convertKeysToSnakeCase, convertKeysToCamelCase } from '../utils/caseConverter';

/**
 * Fetch all labs (or filter with query params if needed).
 */
export const fetchLabs = async () => {
  const response = await api.get('/labs/');
  return convertKeysToCamelCase(response.data);
};

/**
 * Fetch a single lab by ID.
 */
export const fetchLabById = async (labId) => {
  const response = await api.get(`/labs/${labId}/`);
  return convertKeysToCamelCase(response.data);
};

/**
 * Create a new lab.
 * If passing FormData (for image upload), we skip snake-case conversion.
 */
export const createLab = async (data) => {
  let payload = data;

  // If it's a regular JS object, convert to snake case;
  // if it's FormData, we assume the keys are already correct.
  if (!(data instanceof FormData)) {
    const convertedData = convertKeysToSnakeCase(data);
    payload = new FormData();
    // Transfer convertedData fields into payload (FormData)
    Object.keys(convertedData).forEach((key) => {
      payload.append(key, convertedData[key]);
    });
  }

  const response = await api.post('/labs/', payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return convertKeysToCamelCase(response.data);
};

/**
 * Update an existing lab (partial update).
 */
export const updateLab = async (labId, data) => {
  let payload = data;

  if (!(data instanceof FormData)) {
    const convertedData = convertKeysToSnakeCase(data);
    payload = new FormData();
    Object.keys(convertedData).forEach((key) => {
      payload.append(key, convertedData[key]);
    });
  }

  const response = await api.patch(`/labs/${labId}/`, payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return convertKeysToCamelCase(response.data);
};

/**
 * Delete a lab by ID.
 */
export const deleteLab = async (labId) => {
  const response = await api.delete(`/labs/${labId}/`);
  return response.data;
};

/**
 * Subscribe to a lab (if you want a custom endpoint).
 */
export const subscribeToLab = async (labId) => {
  const response = await api.post(`/labs/${labId}/subscribe/`);
  return convertKeysToCamelCase(response.data);
};

/**
 * Unsubscribe from a lab (if you want a custom endpoint).
 */
export const unsubscribeFromLab = async (labId) => {
  const response = await api.post(`/labs/${labId}/unsubscribe/`);
  return convertKeysToCamelCase(response.data);
};
