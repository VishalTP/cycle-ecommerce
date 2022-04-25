import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearError, getProductDetails } from '../../actions/productAction'
import { useParams } from "react-router-dom"
import ReactStars from 'react-rating-stars-component'
import ReviewCard from './ReviewCard.js'
import Loader from '../loader/Loader'
import { addItemsToCart } from '../../actions/cartAction'
import { Alert, Stack } from '@mui/material';

// 06:03-

const ProductDetails = () => {
    const dispatch = useDispatch()
    const { id } = useParams()

    const { loading, product, error } = useSelector(state => state.productDetails)

    const [quantity, setQuantity] = useState(1)

    const increaseQuantity = ()=>{
        setQuantity(qty=>qty+1)
    }
    const decreaseQuantity = ()=>{
        setQuantity(qty=>qty-1)
    }

    const [addedToCart, setAddedToCart] = useState(false)
    const addToCartHandler =()=>{
        dispatch(addItemsToCart(id, quantity))
        setAddedToCart(true)
        setTimeout(()=>{
            setAddedToCart(false)
        }, 1000)
    }

    useEffect(() => {
        dispatch(getProductDetails(id))
        window.scroll(0,0)
    }, [dispatch, id])

    const options = {
        edit: false,
        value: product.ratings,
        isHalf: true,
        activeColor: "tomato",
        color: "rgba(20,20,20,.1)",
        size: window.innerWidth < 600 ? 20 : 25
    }

    return (
        loading? <Loader />
        : 
        <>
            {
                addedToCart && 
                    <Stack sx={{position:"absolute",left:"0",top:"0", width: '50vmax', justifyContent: "center", }} spacing={2}>
                        <Alert severity="success">Item Added to Cart</Alert>
                    </Stack>
            }
            <div className="productDetails">
                    <Carousel sx={{textAlign:"center"}}>
                        {
                            product.images && product.images.map((item, i) => (
                                <img
                                    className="carouselImage"
                                    key={i}
                                    src={item.url}
                                    alt={`Slide ${i}`}
                                />
                            ))
                        }
                    </Carousel>

                <div>
                    <div className="detailsBlock1">
                        <h2>{product.name}</h2>
                        <p>Product # {product._id}</p>
                    </div>


                    <div className="detailsBlock2">
                        <ReactStars {...options} />
                        <span>({product.numOfReviews} Reviews)</span>
                    </div>
                    <div className="detailsBlock3">
                        <h1>$ {product.price}</h1>
                        <div className="detailsBlock3-1">
                            <div className="detailsBlock3-1-1">
                                <button onClick={decreaseQuantity} disabled={quantity<=1}>-</button>
                                <input type="number" readOnly value={quantity} />
                                <button onClick={increaseQuantity} disabled={quantity>=product.stock}>+</button>
                            </div>
                            <button onClick={addToCartHandler} disabled={product.stock<1}>Add to Cart</button>
                        </div>
                        <p>
                            Status: <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                {product.stock < 1 ? "Out of Stock" : "In Stock"}
                            </b>
                        </p>
                    </div>
                    <div className="detailsBlock4">
                        Description : <p>{product.description}</p>
                    </div>
                    <button className="submitReview">Submit Review</button>
                </div>
            </div>

            <h3 className="reviewsHeading">REVIEWS</h3>
            {
                product.reviews && product.reviews[0] ? (
                    <div className="reviews">
                        {
                        product.reviews.map((review, i)=><ReviewCard key={i}review={review}/>)
                        }
                    </div>
                ): <p className="noReviews">No Reviews Yet</p>
            }
        </>
    )
}

export default ProductDetails