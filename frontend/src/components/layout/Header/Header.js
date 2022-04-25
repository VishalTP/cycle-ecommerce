import React, {useState, useRef, useEffect } from 'react'
import './Header.css'
import logo from '../../../images/logo.jpg'
import { BsSearch, BsCart3, BsChevronCompactDown } from "react-icons/bs";
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import UserOptions from "./UserOptions"
import { debounce } from "lodash";


const Header = () => {
  const [search, setSearch] = useState("")

  const navigate = useNavigate()
  const optionsPosition = useRef()
  const inputReff = useRef();
  
  const { user, isAuthenticated } = useSelector(state => state.user)
  const {cartItems} = useSelector(state=>state.cart)

  const searchProduct = (e) => {
    e.preventDefault()
    // setSearch(e.target.value)
    navigate(`/products/${inputReff.current.value}`)
  }
  const d = debounce((val)=>{
    // if (search)
    // setSearch(prev=>prev+value)
      navigate(`/products/${val}`)

  }, 1000)
  

  const showMenu = (e)=>{
    if(!isAuthenticated)
      navigate("/login")
    optionsPosition.current.style.left= `${e.pageX-100}px`
    optionsPosition.current.style.height= "auto"
  }
  const hideMenu = ()=>{
    if(optionsPosition.current)
      optionsPosition.current.style.height= "0"
  }
 
  return (
    <nav className="navbar" onMouseLeave={hideMenu}>
      <div>
        <div className="logo" onClick={() => navigate("/")}><img src={logo} /></div>

        <div className="searchBar">
          <form onSubmit={searchProduct}>
            <input
              type="text"
              placeholder="Search Product..."
              // value={search}
              ref={inputReff}
              onChange={(e)=>{
                // setSearch(e.target.value)
                d(e.target.value)
              }}

            />
          </form>
          <button type="submit" onClick={searchProduct}>
            <BsSearch style={{ color: "#2874f0", fontWeight: "bold" }} />
          </button>
        </div>

        <div className="navRight">
          <div className="profile">
            {isAuthenticated ?
              <button onMouseOver={showMenu}>
                 {user.name} {<BsChevronCompactDown />}
              </button>
              :
              <button className="btnWhite" onClick={()=>navigate("/login")}>Login</button>
            }
          </div>
          <div className="cart">
            <BsCart3 onClick={() => navigate("/cart")} />
            {
              cartItems && cartItems.length && <span>{cartItems.length}</span>
            }
          </div>
        </div>
      </div>
      <div className="dropDown" onMouseLeave={hideMenu} ref={optionsPosition}>
        <UserOptions />
      </div>
    </nav>

  )
}

export default Header