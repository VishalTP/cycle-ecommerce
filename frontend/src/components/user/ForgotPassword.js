import React, { useEffect, useState } from 'react'
import './ForgotPassword.css'
import Loader from '../loader/Loader'
import { useDispatch, useSelector } from "react-redux"
import { clearError, forgotPassword } from "../../actions/userAction"
import {useNavigate} from "react-router-dom"

// import { Alert, Stack } from '@mui/material';

const ForgotPassword = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { error, message, loading } = useSelector(state => state.forgotPassword)
    const [email, setEmail] = useState("")

    const forgotPasswordSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData()
        myForm.set("email", email)

        dispatch(forgotPassword(myForm))
    }

    useEffect(() => {

        if (error) {
            setTimeout(() => {
                dispatch(clearError())
            }, 2000)
        }
        if (message) {
            // alert - message
            navigate("/login")
        }
    }, [error, message, dispatch])

    return (
        <>
            {
                loading ? <Loader />
                    :

                    <div className="forgotPasswordContainer">
                        <div className="forgotPasswordBox">
                            <h2 className="forgotPasswordHeading"> Forgot Password</h2>
                            <form
                                className="forgotPasswordForm"
                                onSubmit={forgotPasswordSubmit}
                            >
                                <div className="signUpPassword">
                                    {/* Icon */}
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={email}
                                        name="email"
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>

                                <input
                                    type="submit"
                                    value="Send"
                                    className="forgotPasswordBtn"
                                />
                            </form>

                        </div>
                    </div>
            }
        </>
    )
}

export default ForgotPassword