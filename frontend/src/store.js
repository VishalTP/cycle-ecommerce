import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { productReducer, productDetailsReducer } from "./reducers/productReducer"
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer"

const rootReducer = combineReducers({
    products : productReducer,
    productDetails : productDetailsReducer,
    user : userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer
})

let initialState ={}

const middleware = [thunk]

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
export default store