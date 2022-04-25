import React, { useEffect } from 'react'
import './Home.css'
import ProductCard from './ProductCard.js'
import { getProduct } from '../../actions/productAction'
import { useSelector, useDispatch } from "react-redux"
import Loader from '../loader/Loader'
import Categories from './Categories.js'
import { useNavigate } from 'react-router'

const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, products, productsCount, error } = useSelector(state => state.products)
    useEffect(() => {
        dispatch(getProduct())
        window.scroll(0, 0)
    }, [dispatch])


    return (
        <>
            {
                loading ? <Loader />
                    :
                    <>
                        <Categories />
                            <div className="background1">
                                <button onClick={()=> navigate("/products")}>Shop Now</button>
                            </div>
                        <div style={{display:"flex", flexDirection: "column"}} className="container" id="container">

                            {/* {
                                products && products.map(product => <ProductCard key={product._id} {...product} />)
                            } */}

                            <h1>THIS ECOMMERCE APP IS STILL IN DEVELOPMENT PHASE !!!!!!!</h1>
                            <hr />
                            <br />
                            <hr />
                            <h2>Features Added</h2>
                                <h4>Get all products</h4>
                                <h4>Show Product details</h4>
                                <h4>Search any product</h4>
                                <h4>Show by Category</h4>

                                <h4>User/Admin login and logout</h4>
                                <h4>User Registration</h4>
                                <h4>View/ Change your profile details</h4>
                                <h4>Change you password</h4>
                                <h4>Forgot Password</h4>

                                <h4>Add/ Remove from Cart</h4>
                                <h4>Order Placing</h4>
                                <h4>Add Shipping Address</h4>
                                <h4>Order Placing</h4>
                                <h4>Order history and Status</h4>

                                <h4>Admin Dashboard</h4>
                                <h4>Add/ Update / Remove Product</h4>
                                <h4>Updating stock</h4>
                                <h4>View total Sales-for Admin</h4>
                                <h4>View all Orders -Admin</h4>
                                <h4>Analysis using Charts</h4>

                            <hr />
                            <h2>Features to be Added</h2>
                                <h4>Rate a product</h4>
                                <h4>Adding Comments</h4>
                                <h4>Change Order Status- for Admin</h4>
                                <h4>View all Users - for Admin</h4>
                                <hr />
                        </div>
                    </>
            }
        </>
    )
}

export default Home