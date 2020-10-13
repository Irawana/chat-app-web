export const defaultHeader = {
  "Content-type": "application/json; charset=UTF-8",
};

export const headerWithAuth = {
  ...defaultHeader,
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjgyYjY4MmFhYmQyODBhMmI3ODcwMTQiLCJ1c2VybmFtZSI6InRlc3Q0IiwiaWF0IjoxNjAyNDkyNDA4LCJleHAiOjE2MDI5MjQ0MDh9.tj5DEy1HZ1liuVMimV7adC_5a0XfIYoFKV3KCnLrjPc",
  // TODO: set auth header dynamically
};
