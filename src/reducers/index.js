import { combineReducers } from 'redux';

import userReducer from './userReducer';
import pessoaReducer from './pessoaReducer';

export default combineReducers({
    user: userReducer,
    lista: pessoaReducer,
    pessoa: pessoaReducer
});
