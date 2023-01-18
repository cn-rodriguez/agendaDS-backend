export const handleCredentialResponse = (response) => {
  const body = { id_token: response.credential };

  fetch("http://localhost:3001/api/auth/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      console.log(resp);
    })
    .catch(console.warn);
};
