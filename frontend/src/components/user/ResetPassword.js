import React, { useEffect, useState } from 'react'
import './ResetPassword.css'
import Loader from '../loader/Loader'
import { useDispatch, useSelector } from "react-redux"
import { clearError, resetPassword } from "../../actions/userAction"
import { useNavigate, useParams } from 'react-router'

import { Alert, Stack } from '@mui/material';
import { userActionType } from '../../actionTypes/userActionType'

const ResetPassword = () => {
    const dispatch = useDispatch()
    const { error, success, loading } = useSelector(state => state.forgotPassword)

    const navigate = useNavigate()
    const {token} = useParams()

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const resetPasswordSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData()
        myForm.set("password", password)
        myForm.set("confirmPassword", confirmPassword)

        dispatch(resetPassword(token, myForm))
    }

    useEffect(() => {

        if (error) {
            setTimeout(() => {
                dispatch(clearError())
            }, 2000)
        }
        if (success) {
            // alert -updated successfully
            navigate("/login")
        }

    }, [error, success, dispatch])

    return (
        <>
            {
                loading ? <Loader />
                    :

                    <div className="resetPasswordContainer">
                        <div className="resetPasswordBox">
                            <h2 className="resetPasswordHeading"> Update Profile</h2>
                            <form
                                className="resetPasswordForm"
                                onSubmit={resetPasswordSubmit}
                            >

                                <div >
                                    {/* Icon */}
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>

                                <div>
                                    {/* Icon */}
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                    />
                                </div>

                                <input
                                    type="submit"
                                    value="Reset"
                                    className="resetPasswordBtn"
                                />
                            </form>

                        </div>
                    </div>
            }
        </>
    )
}

export default ResetPassword