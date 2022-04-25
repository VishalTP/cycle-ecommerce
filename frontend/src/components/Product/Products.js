import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux"
import { getProduct } from '../../actions/productAction'
import Loader from '../loader/Loader'
import ProductCard from '../Home/ProductCard.js'
// import Pagination from "react-js-pagination";
import './Products.css'

import { Slider } from '@mui/material';

const Products = () => {
    let { keyword } = useParams()
    let category = ""
    try {
        category = keyword.split("=")[1]
        if (category)
            keyword = ""

    } catch (err) {
    }
    const dispatch = useDispatch()

    const [activePage, setActivePage] = useState(1)

    const { loading, products, productsCount, error, resultPerPage, filteredProductsCount } = useSelector(state => state.products)

    const [price, setPrice] = useState([0, 1000000]);

    const handleChange = (event, newPrice) => {
        setPrice(newPrice);
    };
    console.log(products)
    useEffect(() => {
        dispatch(getProduct(keyword, category, activePage, price))
        window.scroll(0, 0)
    }, [dispatch, activePage, price, keyword])
    return (
        <div className="allProductsContainer">
            {
                loading ? <Loader /> :
                    <>
                        <h2 className="productsHeading">Products</h2>
                        {
                            filteredProductsCount ?
                                <div className="products">
                                    {
                                        products && products.map(product => <ProductCard key={product._id} {...product} />)
                                    }
                                </div> 
                                :
                                 <h1>No products found</h1>
                        }
                        <div className="filterBox">
                            <Slider
                                defaultValue={price}
                                onChangeCommitted={handleChange}
                                valueLabelDisplay="on"
                                min={0}
                                max={1000000}
                            />
                            <h4>Price Range</h4>
                        </div>

                        {
                            resultPerPage < filteredProductsCount && < div className="paginationBox">

                                <button disabled={activePage == 1} onClick={() => setActivePage(page => page - 1)}>Prev</button>
                                <button disabled={Math.ceil(filteredProductsCount / resultPerPage) === activePage} onClick={() => setActivePage(page => page + 1)}>Next</button>
                            </div>
                        }
                    </>
            }
        </div>
    )
}

export default Products