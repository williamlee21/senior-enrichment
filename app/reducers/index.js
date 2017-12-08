// /* combineReducers is not currently used, but eventually should be for modular code :D */
// import { combineReducers } from 'redux'

// const initialState = {}

// const rootReducer = function(state = initialState, action) {
//   switch(action.type) {
//     default: return state
//   }
// };

// export default rootReducer

import axios from 'axios';

//type = 
const GET_ALLCAMPUSES = "GET_ALLCAMPUSES";

//action creator = put type on stuff
export const getCampuses = (campuses) => {
  return { type: GET_ALLCAMPUSES, campuses:campuses }
}

//reducer = executes the action / does the action / 
const allCampusesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALLCAMPUSES:
      return action.campuses;
    default:
      return state;
  }
}

//thunk
export const getAllCampuses = () => {
  return function(dispatch) {
    axios.get("/api/campuses")
      .then(response => response.data)
      .then(campuses => {
        dispatch(getCampuses(campuses));
      })
      .catch(err => console.log(err)) // TO-DO: Show friendly error message to user
  }
}





export default allCampusesReducer;