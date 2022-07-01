import { LOGIN, SEND_TOKEN, SEND_QUESTION, SET_SCORE } from '../actions/ActionsType';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state,
      name: action.payload.name,
      assertions: 0,
      score: 0,
      gravatarEmail: action.payload.gravatarEmail,
    };
  case SEND_TOKEN:
    return { ...state, token: action.payload };
  case SEND_QUESTION:
    return { ...state };
  case SET_SCORE:
    return { ...state,
      name: state.name,
      assertions: state.assertions,
      score: action.payload,
      gravatarEmail: state.gravatarEmail,
    };
  default:
    return state;
  }
};

export default player;
