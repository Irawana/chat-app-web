//Default header, without authorization header
export const defaultHeader = {
  "Content-type": "application/json; charset=UTF-8",
};

const token = localStorage.getItem("accessToken");

//Header with authorization
export const headerWithAuth = {
  ...defaultHeader,
  Authorization: `Bearer ${token}`,
};
