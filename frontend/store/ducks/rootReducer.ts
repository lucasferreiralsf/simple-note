import { combineReducers } from 'redux';
import auth from './auth';
import signup from './signup';


const rootReducer = combineReducers({
  auth,
  signup
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
