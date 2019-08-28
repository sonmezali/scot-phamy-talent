export const signApi = (email, password) => {
  const opts = {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "content-type": "application/json"
    }
  };
  return fetch("auth/login", opts)
    .then(res => res.json())
    .then(data => {
      return data;
    });
};
