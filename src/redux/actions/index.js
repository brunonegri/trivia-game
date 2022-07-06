import { LOGIN,
  SET_SCORE, SET_TIMER, SET_ANSWERS, SET_ASSERTIONS, SET_QUESTION } from './ActionsType';

const userLogin = (value) => ({
  type: LOGIN,
  payload: value,
});

const setScore = (score) => ({
  type: SET_SCORE,
  payload: score,
});
const setAssertions = (assertions) => ({
  type: SET_ASSERTIONS,
  payload: assertions,
});

const setQuestions = (questions) => ({
  type: SET_QUESTION,
  payload: questions,
});

const setAnswers = (answers) => ({
  type: SET_ANSWERS,
  payload: answers,
});

const setTimeout = (timer) => ({
  type: SET_TIMER,
  payload: timer,
});

export { setAnswers, setTimeout, userLogin, setQuestions, setScore, setAssertions };
