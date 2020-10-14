import { apiUrl } from "../config";
import { defaultHeader, headerWithAuth } from "./headers.util";

/**
 * Save user
 * @param {Object} user
 */
export const saveUser = async (user) => {
  const res = await fetch(`${apiUrl}/user`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: defaultHeader,
  });

  return await res.json();
};

/**
 * User login
 * @param {Object} authData
 */
export const userLogin = async (authData) => {
  const res = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    body: JSON.stringify(authData),
    headers: defaultHeader,
  });

  if (res.status !== 200) {
    throw new Error(res.statusText);
  }

  return await res.json();
};

/**
 * Get all users
 */
export const fetchUsers = async () => {
  const res = await fetch(`${apiUrl}/user`, {
    method: "GET",
    headers: headerWithAuth,
  });

  if (res.status !== 200) {
    throw new Error(res.statusText);
  }

  return res.json();
};
