const tokenApi = async () => {
  const resolve = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await resolve.json();
  const { token } = data;
  return token;
};

const questionApi = async (param) => {
  const resolve = await fetch(`https://opentdb.com/api.php?amount=5&token=${param}`);
  const data = await resolve.json();
  // console.log(data);
  return data;
};

export { tokenApi, questionApi };
