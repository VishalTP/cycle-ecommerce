import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import {logout} from '../../../actions/userAction'
import './Header.css'

const UserOptions = ({user}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const options = [
        {icon : "OrderIcon", name: "Orders", func : orders },
        {icon : "AccountIcon", name: "Profile", func : account },
        {icon : "LogOutIcon", name: "Log Out", func : logoutUser }
    ]
    if(user.role === "admin")
        options.unshift({icon : "DashboardIcon", name: "Dashboard", func : dashboard })

    const dashboard = ()=>{
        navigate("/dashboard")
    }

    const account = ()=>{
        navigate("/account")
    } 

    const orders = ()=>{
        navigate("/orders")
    }

    const logoutUser = ()=>{
        dispatch(logout())

    }

  return (
    <>
    <button onClick={logoutUser}>SignOut</button>
    </>
  )
}

export default UserOptions