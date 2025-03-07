import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, STOP_LOADING_UI, LOADING_POSTCOMMENT } from '../types';


const initialState = {
  loading: false,
  commentloading: false,
  errors: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS: 
      return {
        ...state,
        loading: false,
        errors: action.payload
      }
    case CLEAR_ERRORS: 
      return {
        ...state,
        commentloading: false,
        loading: false,
        errors: null
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true
      }
    case LOADING_POSTCOMMENT:
      return {
        ...state,
        commentloading: true,
      }
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      }
    default:
      return state; 
  }
}