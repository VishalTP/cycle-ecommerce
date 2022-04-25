import axios from "axios"
import { productActionType } from "../actionTypes/productActionType"

export const getProduct =(keyword="", category="", currentPage=1, price=[100, 1000000])=> async (dispach)=>{
    console.log(keyword, category)
    try {
        dispach({type: productActionType.ALL_PRODUCT_REQUEST})

        const {data} = await axios(`/api/v1/products?${category?`category=${category}`:""}&keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`)
        dispach({
            type: productActionType.ALL_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispach({
            type: productActionType.ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getProductDetails =(id)=> async (dispach)=>{
    try {
        dispach({type: productActionType.PRODUCT_DETAILS_REQUEST})

        const {data} = await axios(`/api/v1/product/${id}`)
        dispach({
            type: productActionType.PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })

    } catch (error) {
        dispach({
            type: productActionType.PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminProduct =()=> async (dispach)=>{
    try {
        dispach({type: productActionType.ADMIN_PRODUCT_REQUEST})

        const {data} = await axios(`/api/v1/admin/products`)
        dispach({
            type: productActionType.ADMIN_PRODUCT_SUCCESS,
            payload: data.products
        })

    } catch (error) {
        dispach({
            type: productActionType.ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const createProduct = (productData) => async (dispatch) => {
    try {
      dispatch({ type: productActionType.NEW_PRODUCT_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(`/api/v1/admin/product/new`, productData,
        {
            headers: { "Content-Type": "application/json" },
        }
      );
  
      dispatch({
        type: productActionType.NEW_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: productActionType.NEW_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const deleteProduct = (id) => async (dispatch) => {
    try {
      dispatch({ type: productActionType.DELETE_PRODUCT_REQUEST });
  
      const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
  
      dispatch({
        type: productActionType.DELETE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: productActionType.DELETE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const updateProduct = (id, productData) => async (dispatch) => {
    try {
      dispatch({ type: productActionType.UPDATE_PRODUCT_REQUEST });
  
      const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData,
        {
            headers: { "Content-Type": "application/json" },
        }
      );
  
      dispatch({
        type: productActionType.UPDATE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: productActionType.UPDATE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearError =()=> async (dispach)=>{
    dispach({type:productActionType.CLEAR_ERRORS})
}