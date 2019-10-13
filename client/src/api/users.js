export const changePassword = ({ userId, newPassword }) => {
  return fetch("/api/users/change-password", {
    method: "PUT",
    body: JSON.stringify({ userId, newPassword }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
};
export const getUserById = id => {
  return fetch(`/api/users/${id}`).then(res => res.json());
};
