import React, { useEffect, useState } from 'react'
import './UpdatePassword.css'
import Loader from '../loader/Loader'
import { useDispatch, useSelector } from "react-redux"
import { clearError, updatePassword } from "../../actions/userAction"
import { useNavigate } from 'react-router'

import { Alert, Stack } from '@mui/material';
import { userActionType } from '../../actionTypes/userActionType'

const UpdatePassword = () => {
    const dispatch = useDispatch()
    const { error, isUpdated, loading } = useSelector(state => state.profile)

    const navigate = useNavigate()

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const updatePasswordSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData()
        myForm.set("oldPassword", oldPassword)
        myForm.set("newPassword", newPassword)
        myForm.set("confirmPassword", confirmPassword)

        dispatch(updatePassword(myForm))
    }

    useEffect(() => {

        if (error) {
            setTimeout(() => {
                dispatch(clearError())
            }, 2000)
        }
        if (isUpdated) {
            // alert -updated successfully
            navigate("/account")
        }

        dispatch({
            type: userActionType.UPDATE_PASSWORD_RESET
        })

    }, [error, isUpdated, dispatch])
  return (
    <>
            {
                loading ? <Loader />
                    :

                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2 className="updatePasswordHeading"> Update Profile</h2>
                            <form
                                className="updatePasswordForm"
                                onSubmit={updatePasswordSubmit}
                            >
                                <div className="signUpPassword">
                                    {/* Icon */}
                                    <input
                                        type="password"
                                        placeholder="Old Password"
                                        required
                                        value={oldPassword}
                                        name = "password"
                                        onChange={e=>setOldPassword(e.target.value)}
                                    />
                                </div>

                                <div className="signUpPassword">
                                    {/* Icon */}
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        value={newPassword}
                                        name = "password"
                                        onChange={e=>setNewPassword(e.target.value)}
                                    />
                                </div>

                                <div className="signUpPassword">
                                    {/* Icon */}
                                    <input
                                        type="password"
                                        placeholder="Confirm New Password"
                                        required
                                        value={confirmPassword}
                                        name = "password"
                                        onChange={e=>setConfirmPassword(e.target.value)}
                                    />
                                </div>

                                <input
                                    type="submit"
                                    value="Update Password"
                                    className="updatePasswordBtn"
                                />
                            </form>

                        </div>
                    </div>
            }
        </>
  )
}

export default UpdatePassword