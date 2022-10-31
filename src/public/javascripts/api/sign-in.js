export async function requestSignIn(email, password) {
  const res = await fetch('/api/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();

  return data;
}
