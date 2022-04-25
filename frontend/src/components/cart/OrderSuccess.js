import React, { useEffect } from "react";
import "./OrderSuccess.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetCartItem } from "../../actions/cartAction";
  

const OrderSuccess = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(resetCartItem())
    return ()=>sessionStorage.clear()
  },[])
  return (
    <div className="orderSuccess">
      <h1>Your Order has been Placed successfully </h1>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;