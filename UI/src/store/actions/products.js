import { INSERT_PRODUCT_SUCCESS, REMOVE_PRODUCT_SUCCESS } from '../constants';

const  addProductSuccess = (item) => {
  return {
    type: INSERT_PRODUCT_SUCCESS,
    item,
  }
}

const  removeProductSuccess = (item) => {
  return {
    type: REMOVE_PRODUCT_SUCCESS,
    item,
  }
}

export const addProduct = (item) => {
  console.log(item);
  return(dispatch) => {
    dispatch(addProductSuccess(item));
  }
}


export const removeProduct = (item) => {
  return (dispatch) => {
    dispatch(removeProductSuccess(item))
  }
}
