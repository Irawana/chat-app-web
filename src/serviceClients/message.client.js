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

export const fetchMessages = async (user1Id, user2Id) => {
  const res = await fetch(`${apiUrl}/message/${user1Id}/${user2Id}`, {
    method: "GET",
    headers: headerWithAuth,
  });

  return await res.json();
};
