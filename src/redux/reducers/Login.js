import LOGIN from '../actions/ActionsType';

const initialState = {
  name: '',
  email: '',
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN:
    return action.payload;
  default:
    return state;
  }
};

export default loginReducer;
