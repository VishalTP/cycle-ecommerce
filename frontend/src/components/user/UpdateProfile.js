import React, { useEffect, useRef, useState } from 'react'
import './UpdateProfile.css'
import Loader from '../loader/Loader'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { clearError, loadUser, updateProfile } from "../../actions/userAction"
import { useNavigate } from 'react-router'

import { Alert, Stack } from '@mui/material';
import { userActionType } from '../../actionTypes/userActionType'

const UpdateProfile = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const { error, isUpdated, loading } = useSelector(state => state.profile)

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("user.email")
    const [avatar, setAvatar] = useState()
    const [avatarPreview, setAvatarPreview] = useState("/logo512.png")
    // Set a default avatarPreview Link

    const updateProfileSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("avatar", avatar)
        dispatch(updateProfile(myForm))
    }

    const updateProfileDataChange = (e) => {

        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            // setAvatarPreview(user.avatar.url)
            // May get fixed after protected routes
        }
        if (error) {
            setTimeout(() => {
                dispatch(clearError())
            }, 2000)
        }
        if (isUpdated) {
            // alert -updated successfully
            dispatch(loadUser())
            navigate("/account")
        }

        dispatch({
            type: userActionType.UPDATE_PROFILE_RESET
        })

    }, [error, isUpdated, dispatch, user])

    return (
        <>
            {
                loading ? <Loader />
                    :

                    <div className="updateProfileContainer">
                        <div className="updateProfileBox">
                            <h2 className="updateProfileHeading"> Update Profile</h2>
                            <form
                                className="updateProfileForm"
                                encType="multipart/form-data"
                                onSubmit={updateProfileSubmit}
                            >
                                <div className="updateProfileName">
                                    {/* Icon */}
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        value={name}
                                        name="name"
                                        onChange={(e)=>setName(e.target.value)}
                                    />
                                </div>
                                <div className="updateProfileEmail">
                                    {/* Icon */}
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={email}
                                        name="email"
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />
                                </div>


                                <div className="updateProfileImage">
                                    <img src={avatarPreview} alt="Avatar Image" />
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={updateProfileDataChange}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Update Profile"
                                    className="updateProfileBtn"
                                />
                            </form>

                        </div>
                    </div>
            }
        </>
    )
}

export default UpdateProfile