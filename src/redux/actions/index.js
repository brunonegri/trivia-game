import { tokenApi } from '../../services/Api';
import { LOGIN, SEND_TOKEN, SET_SCORE, SET_ASSERTIONS } from './ActionsType';

const userLogin = (value) => ({
  type: LOGIN,
  payload: value,
});

const sendToken = (token) => ({
  type: SEND_TOKEN,
  payload: token,
});

const setScore = (score) => ({
  type: SET_SCORE,
  payload: score,
});
const setAssertions = (assertions) => ({
  type: SET_ASSERTIONS,
  payload: assertions,
});

const getToken = () => async (dispatch) => {
  const tokenResponse = await tokenApi();
  // console.log(tokenResponse.token);
  localStorage.setItem('token', tokenResponse.token);
  dispatch(sendToken(tokenResponse.token));
};

export { userLogin, getToken, setScore, setAssertions };
