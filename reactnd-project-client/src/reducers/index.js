// How to write reducers?
import { combineReducers } from 'redux'

const InitialState = {
  serviceUrl: 'http://localhost:5001'
}

const create = (state=InitialState, action) => 
{
  return state;
}

const general = (state=InitialState, action) => 
{
  return state;
}
export default combineReducers({
  create,
  general
}) 
