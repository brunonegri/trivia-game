import { tokenApi } from '../../services/Api';
import { LOGIN, SEND_TOKEN } from './ActionsType';

const userLogin = (value) => ({
  type: LOGIN,
  payload: value,
});

const sendToken = (token) => ({
  type: SEND_TOKEN,
  payload: token,
});

// const sendQuestion = (questions) => ({
//   type: SEND_QUESTION,
//   payload: questions,
// });

const getToken = () => async (dispatch) => {
  const token = await tokenApi();
  // console.log(token);
  localStorage.setItem('token', token);
  dispatch(sendToken(token));
};

// const getQuestion = () => async (dispatch) => {
//   const localToken = localStorage.getItem('token');
//   const questions = await questionApi(localToken);
//   console.log(questions);
//   dispatch(sendQuestion(questions));
// };

export { userLogin, getToken };
