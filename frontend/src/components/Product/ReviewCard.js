import React from 'react'
import ReactStars from 'react-rating-stars-component'
import profilePng from '../../images/1.jpg'

const ReviewCard = ({review}) => {
    const options = {
        edit: false,
        value: review.rating,
        isHalf: true,
        activeColor: "tomato",
        color: "rgba(20,20,20,.1)",
        size: window.innerWidth < 600 ? 20 : 25
    }

  return (
    <div className="reviewCard">
        <img src={profilePng} alt="User" />
        <p>{review.name}</p>
        <ReactStars {...options} />
        <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard