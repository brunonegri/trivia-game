import { combineReducers } from 'redux';
import player from './Login';
import gameReducer from './GameReducer';

const rootReducer = combineReducers({ player, gameReducer });

export default rootReducer;
