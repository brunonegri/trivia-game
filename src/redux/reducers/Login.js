import { LOGIN, SEND_QUESTION, SET_SCORE, SET_ASSERTIONS } from '../actions/ActionsType';

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
  case SEND_QUESTION:
    return { ...state };
  case SET_SCORE:
    return { ...state,
      name: state.name,
      assertions: state.assertions,
      score: action.payload,
      gravatarEmail: state.gravatarEmail,
    };
  case SET_ASSERTIONS:
    return { ...state,
      name: state.name,
      assertions: action.payload,
      score: state.score,
      gravatarEmail: state.gravatarEmail,
    };
  default:
    return state;
  }
};

export default player;
