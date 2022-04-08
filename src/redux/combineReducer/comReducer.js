import {combineReducers} from 'redux'
import { userDataReducer, userInfoReducer, userQRReducer } from '../reducer/reducer'

export const allReducers = combineReducers({
    userDataReducer : userDataReducer,
    userQRReducer : userQRReducer,
    userInfoReducer : userInfoReducer
})