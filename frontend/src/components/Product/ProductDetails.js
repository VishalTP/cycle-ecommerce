import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearError, getProductDetails } from '../../actions/productAction'
import { useParams } from "react-router-dom"
import ReactStars from 'react-rating-stars-component'
import ReviewCard from './ReviewCard.js'
import Loader from '../loader/Loader'

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
    console.log(options.value)

    return (
        loading? <Loader />
        : 
        <>
            <div className="productDetails">
                <div>
                    <Carousel>
                        {
                            product.images && product.images.map((item, i) => (
                                <img
                                    className="carouselImage"
                                    key={i}
                                    src={item.url}
                                    alt={`Slide ${i}`}
                                // width="100%"
                                />
                            ))
                        }
                    </Carousel>
                </div>

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
                            <button>Add to Cart</button>
                        </div>
                        <p>
                            Status: <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                {product.stock < 1 ? "Out of Stock" : "In Stock"}
                            </b>
                        </p>
                    </div>
                    <div className="detailsBlock4">
                        Desvription : <p>{product.description}</p>
                    </div>
                    <button className="submitReview">Submit Review</button>
                </div>
            </div>

            <h3 className="reviewsHeading">REVIEWS</h3>
            {
                product.reviews && product.reviews[0] ? (
                    <div className="reviews">
                        {
                        product.reviews.map(review=><ReviewCard review={review}/>)
                        }
                    </div>
                ): <p className="noReviews">No Reviews Yet</p>
            }
        </>
    )
}

export default ProductDetails