import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import WebFont from "webfontloader"
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home.js'
import ProductDetails from './components/Product/ProductDetails'
import Products from './components/Product/Products'
import './App.css'
import LoginSignUp from './components/user/LoginSignUp';
import { loadUser } from './actions/userAction';
import { useDispatch, useSelector } from "react-redux"

import Profile from "./components/user/Profile"
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ProtectedRoute from './components/route/ProtectedRoute'
import ResetPassword from './components/user/ResetPassword'
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/ConfirmOrder'
import Payment from './components/cart/Payment.js'
import OrderSuccess from './components/cart/OrderSuccess'
import MyOrders from './components/order/MyOrders'
import OrderDetails from './components/order/OrderDetails'
import Dashboard from './components/admin/Dashboard'
import ProductList from './components/admin/ProductList'
import UpdateProduct from './components/admin/UpdateProduct'
import OrderList from "./components/admin/OrderList.js";


import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import NewProduct from './components/admin/NewProduct';
import Loader from './components/loader/Loader';
import ProcessOrder from './components/admin/ProcessOrder';

function App() {

  const {loading, user, isAuthenticated } = useSelector(state => state.user)

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }
  const isAdmin=true

  const dispatch = useDispatch()
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    dispatch(loadUser())
    getStripeApiKey()
    return ()=>{
      alert("sdsd")
      localStorage.clear()
    }
  }, [])

  return (
    loading?<Loader/>
    :
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:keyword" element={<Products />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route
          exact path="/account"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          exact path="/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />

        <Route
          exact path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />

        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route
          exact path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route
          exact path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />

        <Route
          exact path="/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          exact path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        <Route
          exact path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />

          <Route
            exact path="/admin/dashboard"
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard userRole={user.role}/>
              </ProtectedRoute>
            }
        />
        <Route
            exact path="/admin/products"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProductList />
              </ProtectedRoute>
            }
        />

        <Route
            exact path="/admin/product"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewProduct />
              </ProtectedRoute>
            }
        />

        <Route
            exact path="/admin/product/:id"
            element={
              <ProtectedRoute >
                <UpdateProduct />
              </ProtectedRoute>
            }
        />

        <Route
            exact path="/admin/orders"
            element={
              <ProtectedRoute >
                <OrderList />
              </ProtectedRoute>
            }
        />

        <Route
            exact path="/admin/orders/:id"
            element={
              <ProtectedRoute >
                <ProcessOrder />
              </ProtectedRoute>
            }
        />

        {stripeApiKey && (
          <Route
            exact path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              </Elements>
            }
          />
        )}

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
