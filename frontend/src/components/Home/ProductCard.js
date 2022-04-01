import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'


const ProductCard = ({name, images, price, _id, ratings, numOfReviews}) => {
  const options = {
      edit: true,
      value: ratings,
      isHalf: true,
      activeColor: "tomato",
      color: "rgba(20,20,20,.1)",
      size: window.innerWidth<600 ? 20: 25
  } 
  return (
    <Link className="productCard" to={`/product/${_id}`}>
        <img src={images[0].url} alt={name} />
        <p>{name}</p>
        <div>
            <ReactStars {...options}/> <span>({numOfReviews} Reviews)</span>
        </div>
        <span>{price}</span>
    </Link>
  )
}

export default ProductCard