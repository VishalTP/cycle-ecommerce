import React, { useEffect, useState } from 'react'
import './Header.css'
import logo from '../../../images/logo.jpg'
import { BsSearch, BsCart3, BsChevronCompactDown } from "react-icons/bs";
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { color } from '@mui/system';
const Header = () => {
  const [search, setSearch] = useState("")

  const navigate = useNavigate()
  const {user, isAuthenticated} = useSelector(state=>state.user)

  const searchProduct = (e)=>{
    e.preventDefault()
    navigate(`/products/${search}`)
  }

  return (
    <nav className="navbar">
      <div>
        <div className="logo" onClick={()=>navigate("/")}><img src={logo} /></div>

        <div className="searchBar">
          <form onSubmit={searchProduct}>
          <input 
            type="text" 
            placeholder="Search for Product, category.." 
            value={search} 
            onChange = {e=>setSearch(e.target.value)}
          />
          </form>
          <button type="submit" onClick={searchProduct}><BsSearch style={{color: "#2874f0", fontWeight: "bold"}} /></button>
        </div>

        <div className="navRight">
          <div className="profile">
              <button onClick ={()=> !isAuthenticated ? navigate("/login"): ""} className={!isAuthenticated? "btnWhite": ""}>
                {
                  isAuthenticated ? <>{user.name} {<BsChevronCompactDown />}</> : "Login"
                }
              </button>
          </div>
          <div className="cart">
                <BsCart3 style={{color: "white"}}/>
          </div>
        </div>
      </div>
    </nav>

  )
}

export default Header