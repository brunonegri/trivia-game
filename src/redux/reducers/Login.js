import { LOGIN, SEND_TOKEN } from '../actions/ActionsType';

const initialState = {
  token: '',
  player: {
    name: '',
    email: '',
  },
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state,
      player: {
        name: action.payload.name,
        email: action.payload.email,
      } };
  case SEND_TOKEN:
    return { ...state, token: action.payload };
  default:
    return state;
  }
};

export default loginReducer;
