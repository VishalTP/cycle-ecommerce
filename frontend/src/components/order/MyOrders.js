import React, { Fragment, useEffect } from "react";
// import { DataGrid } from "@material-ui/data-grid";
import "./MyOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../loader/Loader";

import { Link } from "react-router-dom";

const MyOrders = () => {
    const dispatch = useDispatch();


    const { loading, error, orders } = useSelector((state) => state.myOrders);
    //   const { user } = useSelector((state) => state.user);

    useEffect(() => {
        if (error) {
            // alert-error
            dispatch(clearErrors());
        }

        dispatch(myOrders());
    }, [dispatch, alert, error]);

    return (
        <>
            {
                loading ? <Loader />
                    :
                    <div className="myOrdersPage">
                        <h2 className="myOrdersHeading">Your Orders</h2>
                        <div className="myOrdersTable">
                            <div className="tableHeading">
                                <div>Order Id</div>
                                <div>Status</div>
                                <div>Item Qty</div>
                                <div>Amount</div>
                            </div>
                            {
                                orders && orders.map(order =>
                                    <Link to={`/order/${order._id}`} className="tableRow" key={order._id}>
                                        <div>{order._id}</div>
                                        <div className={order.orderStatus === "Processing" ? "red" : "green"}>{order.orderStatus}</div>
                                        <div>{order.orderItems.length}</div>
                                        <div>{order.totalPrice}</div>
                                    </Link>
                                )
                            }
                        </div>
                    </div>
            }
        </>
    );
};

export default MyOrders;