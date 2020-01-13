import courseReducer from './course'
import userReducer from './user'
import usersReducer from './users'
import {combineReducers} from 'redux'
export default combineReducers({
    courseReducer: courseReducer,
    userReducer: userReducer,
    usersReducer: usersReducer
})