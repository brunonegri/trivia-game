import { SET_QUESTION, SET_ANSWERS, SET_TIMER } from '../actions/ActionsType';

const initialState = {
  questions: [],
  answers: [],
  timer: 30,
};

const mN = 0.5;
const randon = () => (Math.round(Math.random()) - mN);

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_QUESTION:
    return { ...state,
      questions: action.payload,
    };
  case SET_TIMER:
    return { ...state,
      timer: action.payload,
    };
  case SET_ANSWERS:
    return { ...state,
      answers: action.payload.sort(randon),
    };
  default:
    return state;
  }
};

export default gameReducer;
