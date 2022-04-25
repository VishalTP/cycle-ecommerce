import {cartActionType } from '../actionTypes/cartActionTypes'

export const cartReducer = ( state = { cartItems: [], shippingInfo: {} }, action ) => {

    switch (action.type) {
      case cartActionType.ADD_TO_CART:
        const item = action.payload;
  
        const isItemExist = state.cartItems.find(
          (i) => i.product === item.product
        );
  
        if (isItemExist) {
          return {
            ...state,
            cartItems: state.cartItems.map((i) =>
              i.product === isItemExist.product ? item : i
            ),
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          };
        }
  
      case cartActionType.REMOVE_CART_ITEM:
        return {
          ...state,
          cartItems: state.cartItems.filter((i) => i.product !== action.payload),
        };
      case cartActionType.RESET_CART_ITEM:
          return{
            ...state,
            cartItems: []
          }
  
      case cartActionType.SAVE_SHIPPING_INFO:
        return {
          ...state,
          shippingInfo: action.payload,
        };
  
      default:
        return state;
    }
  };