import React from 'react';
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
import {useDispatch, useSelector} from "react-redux"
import UserOptions from "./components/layout/Header/UserOptions"
import Profile from "./components/user/Profile"
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ProtectedRoute from './components/route/ProtectedRoute'
import ResetPassword from './components/user/ResetPassword'

function App() {

  const {user, isAuthenticated} = useSelector(state=>state.user)

  const dispatch = useDispatch()
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    dispatch(loadUser())
  }, [])

  return (
    <BrowserRouter>
      <Header />
        {isAuthenticated && <UserOptions user = {user} />}
        {/* UserOptions 8:13 to 8:20 */}
      <Routes>
        <Route exact path = "/" element={<Home />} />
        <Route exact path = "/product/:id" element={<ProductDetails/>} />
        {/* search 6:35 */} 
        <Route exact path = "/products" element={<Products/>} /> 
        <Route exact path = "/products/:keyword" element={<Products/>} />
        {/* Search and pagination 7:00   &&  filter after 7:00 to 7:25*/}
        <Route exact path = "/login" element={<LoginSignUp/>} />
        <Route 
          exact path = "/account" 
          element={
            <ProtectedRoute> 
              <Profile /> 
            </ProtectedRoute>
          } 
        />

        <Route 
          exact path = "/update" 
          element={
            <ProtectedRoute> 
              <UpdateProfile /> 
            </ProtectedRoute>
          } 
        />

        <Route 
          exact path = "/password/update" 
          element={
            <ProtectedRoute> 
              <UpdatePassword /> 
            </ProtectedRoute>
          } 
        />

        <Route exact path = "/password/forgot" element={<ForgotPassword user={user}/>} />
        <Route exact path = "/password/reset/:token" element={<ResetPassword user={user}/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
