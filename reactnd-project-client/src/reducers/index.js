// How to write reducers?
import { combineReducers } from 'redux'

const InitialState = {
  serviceUrl: 'http://localhost:5001'
}

const InitialPage = {
  page: 'default'
}

const create = (state=InitialState, action) => 
{
  return state;
}

const navigation = (state=InitialPage, action) => 
{
  switch(action.type) {
    case 'nav':
      return {
        ...state,
        page: action.page 
      }; 
    default:
      return state;
  } 
}

export default combineReducers({
  create,
  navigation
}) 
