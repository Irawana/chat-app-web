import { apiUrl } from "../config";
import { headerWithAuth } from "./headers.util";

/**
 * Save message
 * @param {Object} message
 */
export const saveMessage = async (message) => {
  const res = await fetch(`${apiUrl}/message`, {
    method: "POST",
    body: JSON.stringify(message),
    headers: headerWithAuth,
  });

  return await res.json();
};

/**
 * Fetch messages for two users
 * @param {String} user1Id
 * @param {String} user2Id
 */
export const fetchMessages = async (user1Id, user2Id) => {
  const res = await fetch(`${apiUrl}/message/${user1Id}/${user2Id}`, {
    method: "GET",
    headers: headerWithAuth,
  });

  return await res.json();
};
