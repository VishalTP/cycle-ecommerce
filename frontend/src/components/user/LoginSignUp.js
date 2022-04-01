import React, { useEffect, useRef, useState } from 'react'
import './LoginSignUp.css'
import Loader from '../loader/Loader'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { login, register, clearError } from "../../actions/userAction"
import { useNavigate } from 'react-router'

import { Alert, Stack } from '@mui/material';

const LoginSignUp = () => {
    const dispatch = useDispatch()
    const { loading, isAuthenticated, error } = useSelector(state => state.user)

    const navigate = useNavigate()

    const loginTab = useRef(null)
    const switcherTab = useRef(null)
    const registerTab = useRef(null)

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [avatar, setAvatar] = useState()
    const [avatarPreview, setAvatarPreview] = useState("/logo512.png")

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } else {
            setUser({
                ...user,
                [e.target.name]: e.target.value
            })
        }
    }

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral")
            switcherTab.current.classList.remove("shiftToRight")

            registerTab.current.classList.remove("shiftToNeutral")
            loginTab.current.classList.remove("shiftToLeft")
        } else if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight")
            switcherTab.current.classList.remove("shiftToNeutral")

            registerTab.current.classList.add("shiftToNeutral")
            loginTab.current.classList.add("shiftToLeft")
        }

    }

    const loginSubmit = (e) => {
        e.preventDefault()
        dispatch(login(loginEmail, loginPassword))
    }
    const registerSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData()
        myForm.set("name", user.name)
        myForm.set("email", user.email)
        myForm.set("password", user.password)
        myForm.set("avatar", avatar)
        dispatch(register(myForm))
    }

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                dispatch(clearError())
            }, 2000)
        }
        if(isAuthenticated)
            navigate("/account")

    }, [error, isAuthenticated])


    return (
        <>
            {
                loading ? <Loader />
                    :
                    <div className="loginSignUpContainer">
                        {error && <Stack sx={{ width: '50vmax', justifyContent: "center", }} spacing={2}>
                            <Alert severity="warning">{error}</Alert>
                        </Stack>}
                        <div className="loginSignUpBox">
                            <div>
                                <div className="login_signUp_toggle">
                                    <p onClick={e => switchTabs(e, "login")}>LOGIN</p>
                                    <p onClick={e => switchTabs(e, "register")}>REGISTER</p>
                                </div>
                                <button ref={switcherTab}></button>
                            </div>
                            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                                <div className="loginEmail">
                                   {/* Icon */}
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={loginEmail}
                                        onChange={e => setLoginEmail(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    {/* Icon */}
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={loginPassword}
                                        onChange={e => setLoginPassword(e.target.value)}
                                    />
                                </div>
                                <Link to="/password/forgot">Forgot Password? </Link>
                                <input type="submit" value="Login" className="loginBtn" />
                            </form>

                            <form
                                className="signUpForm"
                                ref={registerTab}
                                encType="multipart/form-data"
                                onSubmit={registerSubmit}
                            >
                                <div className="signUpName">
                                    {/* Icon */}
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        value={user.name}
                                        name = "name"
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <div className="signUpEmail">
                                    {/* Icon */}
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={user.email}
                                        name = "email"
                                        onChange={registerDataChange}
                                    />
                                </div>

                                <div className="signUpPassword">
                                    {/* Icon */}
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={user.password}
                                        name = "password"
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <div className="registerImage">
                                    <img src={avatarPreview} alt="Avatar Image" />
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Register"
                                    className="signUpBtn"
                                />
                            </form>

                        </div>
                    </div>
            }
        </>
    )
}

export default LoginSignUp