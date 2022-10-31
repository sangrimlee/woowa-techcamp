export async function requestCheckEmail(email) {
  const res = await fetch(`/api/check-email?email=${email}`, {
    method: 'GET',
  });

  const data = await res.json();

  return data;
}
