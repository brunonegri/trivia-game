import { combineReducers } from 'redux';
import loginReducer from './Login';
import scoreReducer from './ScoreReducer';

const rootReducer = combineReducers({ loginReducer, scoreReducer });

export default rootReducer;
