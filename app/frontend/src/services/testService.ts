export const testBackend = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/test`);
  return res.json();
};
