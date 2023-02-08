import { ADD_USER, RESET_REQUESTED } from "../actions/user";

const initialState = {
  name: '',
  email: '',
  resetRequested: false
}
export const user = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        ...action.payload
      }
      case RESET_REQUESTED:
        return {
          ...state,
          resetRequested: true
        }
  
    default:
      return state;
  }
};