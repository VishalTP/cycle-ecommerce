import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { logout } from '../../../actions/userAction'
import './Header.css'

const UserOptions = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector(state=>state.user)

    const options = [
        { icon: "AccountIcon", name: "Profile", func: account },
        { icon: "OrderIcon", name: "Orders", func: orders },
        { icon: "LogOutIcon", name: "Log Out", func: logoutUser }
    ]
    if (user.role === "admin")
        options.unshift({ icon: "DashboardIcon", name: "Dashboard", func: dashboard })

    function dashboard() {
        navigate("/admin/dashboard")
    }

    function account() {
        navigate("/account")
    }

    function orders() {
        navigate("/orders")
    }

    function logoutUser() {
        dispatch(logout())

    }

    return (
            <div className="userOptions">
                {
                    options.map((item, i) => <div key={i} onClick={item.func}>{item.name}</div>)
                }
            </div>
    )
}

export default UserOptions