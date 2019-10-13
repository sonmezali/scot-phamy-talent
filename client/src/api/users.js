export const changePassword = ({ userId, newPassword }) => {
  return fetch("/api/users/change-password", {
    method: "PUT",
    body: JSON.stringify({ userId, newPassword }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
};
