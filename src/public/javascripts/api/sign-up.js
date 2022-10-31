export async function requestSignUp(email, password, nickname, birthday) {
  const res = await fetch('/api/sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      nickname,
      birthday,
    }),
  });

  const data = await res.json();

  return data;
}
