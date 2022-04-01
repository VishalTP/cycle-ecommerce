import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux"
import { getProduct } from '../../actions/productAction'
import Loader from '../loader/Loader'
import ProductCard from '../Home/ProductCard.js'
import Pagination from "react-js-pagination";
import './Products.css'

import {Slider} from '@mui/material';

const Products = () => {
    const { keyword } = useParams()
    const dispatch = useDispatch()

    const [activePage, setActivePage] = useState(1)

    const { loading, products, productsCount, error, resultPerPage, filteredProductsCount } = useSelector(state => state.products)

    const handlePageChange = (e) => {
        setActivePage(e)
    }

    const [price, setPrice] = React.useState([0, 25000]);

    const handleChange = (event, newPrice) => {
        setPrice(newPrice);
      };
      console.log(products)
    useEffect(() => {
        dispatch(getProduct(keyword, activePage, price))
        window.scroll(0, 0)
    }, [dispatch, activePage, price, keyword])
    return (
        <>
            {
                loading ? <Loader />
                    :
                    <>
                        <h2 className="productsHeading">Products</h2>

                        <div className="products">
                            {
                                products && products.map(product => <ProductCard key={product._id} {...product} />)
                            }
                        </div>
                        <div className="filterBox">
                            <Slider
                                value = {[[10, 100]]}
                                value={price}
                                onChange={handleChange}
                                valueLabelDisplay="on"
                                min = {0}
                                max = {25000}
                            />
                            <h4>Price Range</h4>
                        </div>
                        
                        {
                            resultPerPage<filteredProductsCount && < div className="paginationBox">
                                <Pagination
                                    activePage={activePage}
                                    itemsCountPerPage={resultPerPage}
                                    totalItemsCount={productsCount}
                                    pageRangeDisplayed={5}
                                    onChange={handlePageChange}
                                />
                            </div>
                        }
                    </>
            }
        </>
    )
}

export default Products