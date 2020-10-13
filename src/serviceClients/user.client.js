import { apiUrl } from "../config";
import { defaultHeader, headerWithAuth } from "./headers.util";

export const saveUser = async (user) => {
  const res = await fetch(`${apiUrl}/user`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: defaultHeader,
  });

  return await res.json();
};

export const userLogin = async (authData) => {
  const res = await fetch(`${apiUrl}/login`, {
    method: "POST",
    body: JSON.stringify(authData),
    headers: defaultHeader,
  });

  return await res.json();
};

export const fetchUsers = async () => {
  const res = await fetch(`${apiUrl}/users`, {
    method: "GET",
    headers: headerWithAuth,
  });

  return await res.json();
};
