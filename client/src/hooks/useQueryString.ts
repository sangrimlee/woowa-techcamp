export default function useQueryString(key: string) {
  const query = new URL(window.location.href).searchParams.get(key);
  return query;
}
