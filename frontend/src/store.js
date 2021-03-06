import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { productReducer, productDetailsReducer, newProductReducer, updateProductReducer } from "./reducers/productReducer"
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer"
import { cartReducer } from "./reducers/cartReducer"
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer } from "./reducers/orderReducer"

const rootReducer = combineReducers({
    products : productReducer,
    productDetails : productDetailsReducer,
    user : userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newProduct: newProductReducer,
    updateProduct: updateProductReducer,
    allOrders: allOrdersReducer
})

let initialState = {
    cart: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    },
  };
  // let initialState = {
  //   cart: {
  //     cartItems: [],
  //     shippingInfo:  {}
  //   },
  // };


const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))
export default store