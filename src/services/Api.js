const tokenApi = async () => {
  const resolve = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await resolve.json();
  const { token } = data;
  return token;
};

export default tokenApi;
