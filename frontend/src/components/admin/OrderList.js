import React, { useEffect } from "react";
import "./OrderList.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAllOrders } from "../../actions/orderAction";
import Loader from "../loader/Loader";
import { AiFillEdit, AiFillDelete, AiOutlineLink } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

const OrderList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { loading, error, orders } = useSelector((state) => state.allOrders);


    useEffect(() => {
        if (error) {
            // alert-error
            dispatch(clearErrors());
        }
        dispatch(getAllOrders());
    }, [dispatch, alert, error]);

    return (
        <>
            {
                loading ? <Loader />
                    :
                    <div className="allProductsPage">
                        <div className="allProductsHeading">
                            <button onClick={()=>navigate("/admin/dashboard")} style={{float:"left"}}>Dashboard</button> 
                            All Products
                        </div>
                        <div className="allProductsTable">
                            <div className="tableHeadingAdmin">
                                <div>Order Id</div>
                                <div>Order Status</div>
                                <div>Item Quantity</div>
                                <div>Amount</div>
                                <div>Actions</div>
                            </div>
                            {
                               orders && orders.map(order =>
                                    <div className="tableRowAdmin" key={order._id}>
                                        <div>{order._id}</div>
                                        <div className={order.orderStatus==="Processing"? "red":"green"}>{order.orderStatus}</div>
                                        <div >{order.orderItems.length}</div>
                                        <div>{order.totalPrice}</div>
                                        <div>
                                            <AiFillEdit onClick={()=>navigate(`/admin/orders/${order._id}`)}/>  
                                            <AiFillDelete /> 
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
            }
        </>
    );
};

export default OrderList;