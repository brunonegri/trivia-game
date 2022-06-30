import { LOGIN, SEND_TOKEN, SEND_QUESTION } from '../actions/ActionsType';

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
  default:
    return state;
  }
};

export default loginReducer;
