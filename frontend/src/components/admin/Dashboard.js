import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import { Link , useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area} from "recharts"
import { getAllOrders } from "../../actions/orderAction.js";



const Dashboard = () => {
    const dispatch = useDispatch();
    let width = useRef()
    const navigate = useNavigate();
    const { products } = useSelector((state) => state.products);
    const { totalAmount, orders} = useSelector((state) => state.allOrders);
    const { user } = useSelector((state) => state.user);
    
    let outOfStock = 0;
    
    const data = [
        {
          "uv": 0,
        },
        {
          "uv": `${totalAmount && totalAmount.toFixed(2)}`
        }
    
      ]
    products &&
        products.forEach((item) => {
            if (item.stock === 0) {
                outOfStock += 1;
            }
        });
        const [W, setW] = useState(0)
        useEffect(() => {
            if(user.role!="admin")
                navigate("/login")
            dispatch(getAdminProduct());
            dispatch(getAllOrders())

            setW( width.current.clientWidth*.8)

    }, [dispatch, user]);

    return (
        <div className="dashboard">
            <Sidebar />

            <div className="dashboardContainer" ref={width}>
                <h1>Dashboard</h1>

                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br /> Rs {totalAmount && totalAmount.toFixed(2)}
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Product</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to="/admin/dashboard">
                            <p>Out Of Stock</p>
                            <p>{outOfStock}</p>
                        </Link>
                    </div>
                </div>

                <AreaChart width={W} height={250} data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>

            </div>
        </div>
    );
};

export default Dashboard;