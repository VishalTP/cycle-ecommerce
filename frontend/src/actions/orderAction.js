import {orderActionType} from '../actionTypes/orderActionType'

import axios from "axios";

// Create Order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: orderActionType.CREATE_ORDER_REQUEST });

    const { data } = await axios.post("/api/v1/order/new", order, {
        headers: {
          "Content-Type": "application/json",
        },
      });

    dispatch({ type: orderActionType.CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: orderActionType.CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: orderActionType.MY_ORDERS_REQUEST });

    const { data } = await axios.get("/api/v1/orders/me");
    console.log(data)
    dispatch({ type: orderActionType.MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: orderActionType.MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: orderActionType.ALL_ORDERS_REQUEST });

    const { data } = await axios.get("/api/v1/admin/orders");

    dispatch({ type: orderActionType.ALL_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: orderActionType.ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: orderActionType.ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/order/${id}`);

    dispatch({ type: orderActionType.ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: orderActionType.ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: orderActionType.CLEAR_ERRORS });
};

