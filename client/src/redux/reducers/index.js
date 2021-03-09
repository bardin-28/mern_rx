import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_CATEGORIES_BEGIN,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  SET_AUTHENTICATED_SUCCESS,
  SET_AUTHENTICATED_FAILURE
} from "../types";

const initialState = {
  products: [],
  categories: [],
  isAuthenticated: false,
  isLoading: false,
  isError: false
};

const rootReducer = (state = initialState, action)=>{
  switch (action.type) {
    case GET_PRODUCTS_BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        isLoading: false
      }

    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        isError: true
      }

    case GET_CATEGORIES_BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        isLoading: false
      }

    case GET_CATEGORIES_FAILURE:
      return {
        ...state,
        isError: true
      }
    case SET_AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false
      }

    case SET_AUTHENTICATED_FAILURE:
      return {
        ...state,
        isAuthenticated: false
      }

    default: return state
  }
}

export { rootReducer }
