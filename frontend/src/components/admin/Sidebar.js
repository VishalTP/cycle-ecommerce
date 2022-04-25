import React from "react";
import "./Sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/">
                <img src={logo} alt="Ecommerce" />
            </Link>

            <Link to="/admin/dashboard">
                <p>Dashboard</p>
            </Link>
            <Link to="/admin/products">
                <p>All Products</p>
            </Link>

            <Link to="/admin/product">
                <p>Create Product</p>
            </Link>

            <Link to="/admin/orders">
                <p>Orders</p>
            </Link>

            <Link to="/admin/users">
                <p>Users</p>
            </Link>

            <Link to="/admin/reviews">
                <p>

                    Reviews
                </p>
            </Link>

        </div>
    );
};

export default Sidebar;