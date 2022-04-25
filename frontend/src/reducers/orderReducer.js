import { orderActionType } from '../actionTypes/orderActionType'

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case orderActionType.CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case orderActionType.CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case orderActionType.CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case orderActionType.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderActionType.MY_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case orderActionType.MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case orderActionType.MY_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case orderActionType.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};


export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case orderActionType.ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case orderActionType.ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case orderActionType.ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case orderActionType.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderActionType.ALL_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case orderActionType.ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        totalAmount: action.payload.totalAmount
      };

    case orderActionType.ALL_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case orderActionType.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};