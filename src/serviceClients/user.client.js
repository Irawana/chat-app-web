const { apiUrl } = require("../config");

export const saveUser = async (user) => {
  const res = await fetch(`${apiUrl}/user`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  return await res.json();
};

export const userLogin = async (authData) => {
  const res = await fetch(`${apiUrl}/login`, {
    method: "POST",
    body: JSON.stringify(authData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  return await res.json();
};

export const fetchUsers = async () => {
  const res = await fetch(`${apiUrl}/users`, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjgyYjY4MmFhYmQyODBhMmI3ODcwMTQiLCJ1c2VybmFtZSI6InRlc3Q0IiwiaWF0IjoxNjAyNDkyNDA4LCJleHAiOjE2MDI5MjQ0MDh9.tj5DEy1HZ1liuVMimV7adC_5a0XfIYoFKV3KCnLrjPc",
      "Content-type": "application/json; charset=UTF-8",
    },
    //TODO: set token dynamically
  });

  return await res.json();
};
