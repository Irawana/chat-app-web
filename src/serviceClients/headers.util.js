//Default header, without authorization header
export const defaultHeader = {
  "Content-type": "application/json; charset=UTF-8",
};

const token = localStorage.accessToken;

//Header with authorization
export const headerWithAuth = {
  ...defaultHeader,
  Authorization: `Bearer ${token}`,
  //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjgyYjY4MmFhYmQyODBhMmI3ODcwMTQiLCJ1c2VybmFtZSI6InRlc3Q0IiwiaWF0IjoxNjAyNDkyNDA4LCJleHAiOjE2MDI5MjQ0MDh9.tj5DEy1HZ1liuVMimV7adC_5a0XfIYoFKV3KCnLrjPc",
  // TODO: test local storage token and remove hardcoded token
};
