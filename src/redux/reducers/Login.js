import { LOGIN, SEND_TOKEN, SEND_QUESTION, SET_SCORE } from '../actions/ActionsType';

const initialState = {
  token: '',
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state,
      player: {
        name: action.payload.name,
        assertions: 0,
        score: 0,
        gravatarEmail: action.payload.gravatarEmail,
      } };
  case SEND_TOKEN:
    return { ...state, token: action.payload };
  case SEND_QUESTION:
    return { ...state };
  case SET_SCORE:
    return { ...state,
      player: {
        name: state.player.name,
        assertions: state.player.assertions,
        score: action.payload,
        gravatarEmail: state.player.gravatarEmail,
      } };
  default:
    return state;
  }
};

export default loginReducer;
