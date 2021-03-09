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

export const getProductsBegin = () =>({
  type: GET_PRODUCTS_BEGIN,
})

export const getProductsSuccess = (data) =>({
  type: GET_PRODUCTS_SUCCESS,
  payload: data
})

export const getProductsFailure = () =>({
  type: GET_PRODUCTS_FAILURE
})

export const getCategoriesBegin = () =>({
  type: GET_CATEGORIES_BEGIN,
})

export const getCategoriesSuccess = (data) =>({
  type: GET_CATEGORIES_SUCCESS,
  payload: data
})

export const getCategoriesFailure = () =>({
  type: GET_CATEGORIES_FAILURE
})

export const setAuthSuccess = () =>({
  type: SET_AUTHENTICATED_SUCCESS,
})

export const setAuthFailure = () =>({
  type: SET_AUTHENTICATED_FAILURE
})
