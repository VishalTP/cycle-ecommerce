import React, { useEffect } from "react";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, deleteProduct, getAdminProduct } from "../../actions/productAction";
import Loader from "../loader/Loader";
import { AiFillEdit, AiFillDelete, AiOutlineLink } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

const MyOrders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { loading, error, products } = useSelector((state) => state.products);
      const {loading: delLoading, isDeleted, error: delError } = useSelector((state) => state.updateProduct);

    const deleteProductHandler = (id)=>{
        dispatch(deleteProduct(id))
    }

    useEffect(() => {
        if (error) {
            // alert-error
            dispatch(clearError());
        }
        if (delError) {
            // alert-error
            dispatch(clearError());
        }
        if(isDeleted){
            // alert
        }

        dispatch(getAdminProduct());
    }, [dispatch, alert, error, delError, isDeleted]);

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
                                <div>Product Id</div>
                                <div>Name</div>
                                <div>Stock</div>
                                <div>Price</div>
                                <div>Actions</div>
                            </div>
                            {
                               delLoading? <Loader />
                                : products && products.map(product =>
                                    <div className="tableRowAdmin" key={product._id}>
                                        <div>{product._id}</div>
                                        <div >{product.name}</div>
                                        <div>{product.stock}</div>
                                        <div>{product.price}</div>
                                        <div>
                                            <AiFillEdit onClick={()=> navigate(`/admin/product/${product._id}`)}/>  
                                            <AiFillDelete onClick={()=>deleteProductHandler(product._id)}/> 
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

export default MyOrders;