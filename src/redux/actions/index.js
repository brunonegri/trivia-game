import tokenApi from '../../services/Api';
import { LOGIN, SEND_TOKEN } from './ActionsType';

const userLogin = (value) => ({
  type: LOGIN,
  payload: value,
});

const sendToken = (token) => ({
  type: SEND_TOKEN,
  payload: token,
});

const getToken = () => async (dispatch) => {
  const token = await tokenApi();
  console.log(token);
  localStorage.setItem('token', token);
  dispatch(sendToken(token));
};

export { userLogin, getToken };
