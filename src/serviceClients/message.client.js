import { apiUrl } from "../config";
import { headerWithAuth } from "./headers.util";

export const saveMessage = async (user) => {
  const res = await fetch(`${apiUrl}/message`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: headerWithAuth,
  });

  return await res.json();
};

export const fetchMessages = async (userId) => {
  const res = await fetch(`${apiUrl}/messages/${userId}`, {
    method: "GET",
    headers: headerWithAuth,
  });

  return await res.json();
};
