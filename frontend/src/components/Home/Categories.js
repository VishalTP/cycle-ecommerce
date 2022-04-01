import React from 'react'
import { Link } from 'react-router-dom'
import './Categories.css'

const Categories = () => {

    const options = [
        { name: "Road Bikes", categorie: "road", img: "https://www.wigglestatic.com/product-media/100375136/Brand-X-Road-Bike-Road-Bikes-Black-2017-BRNDXROADXL-0.jpg" },
        { name: "Hybrid", categorie: "hybrid", img: "https://www.bikehacks.com/wp-content/uploads/2020/02/Boardman-HYB-8.6-Red-Mens-Hybrid-Bike.jpg" },
        { name: "MTB", categorie: "mtb", img: "https://www.sunsetmtb.co.uk/images/shop/Trek-2020-Slash-9-8--Red--9437-l-1.jpg" },
        { name: "Fat Bikes", categorie: "fat", img: "https://www.ubuy.co.in/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNzFlVlNvV3VhZUwuX0FDX1NMMTUwMF8uanBn.jpg" },
        { name: "Triathlon", categorie: "tt", img: "https://m.media-amazon.com/images/I/61-JWQm46xL._AC_SL1124_.jpg" },
        { name: "Gravel", categorie: "gravel", img: "https://cdn.shopify.com/s/files/1/0910/6368/products/BMC-URS-One.jpg?v=1567797217" },
        { name: "Touring", categorie: "tour", img: "https://trek.scene7.com/is/image/TrekBicycleProducts/520Disc_19_24000_A_Primary?$responsive-pjpg$&cache=on,on&wid=800&hei=600" },
        { name: "Kids", categorie: "kids", img: "https://m.media-amazon.com/images/I/813fs9Y9sHL._SL1500_.jpg" },
        { name: "Accessories", categorie: "accessories", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsmGE7s1cQLfHS5ErKQlovhw4QCgDrnocRFWSxoN5IcSf7s8fDF6kowZUaSl8RqlIBFK4&usqp=CAU" }
    ]

    return (
        <div className="categories">
            {
                options.map((option, i) =>
                    <Link className="categorieCard" key={i} to={`products/${option.categorie}`}>
                        <div className="image">
                            <img src={option.img} alt={option.name} />
                        </div>
                        <p>{option.name}</p>
                    </Link>
                )
            }
        </div>
    )
}

export default Categories