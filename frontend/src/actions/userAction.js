import axios from "axios"
import { userActionType } from "../actionTypes/userActionType"

export const login = (email, password)=> async (dispatch)=>{
    try {
        dispatch({type: userActionType.LOGIN_REQUEST})

        const {data} = await axios.post("/api/v1/login", 
            {email, password},
            {headers: {"Content-Type": "application/json"}}    
        )
        dispatch({type: userActionType.LOGIN_SUCCESS, payload: data.user})
    } catch (error) {
        dispatch({type: userActionType.LOGIN_FAIL, payload: error.response.data.message})
    }
}

export const register = (userData)=> async (dispatch)=>{
    try {
        dispatch({type: userActionType.REGISTER_USER_REQUEST})

        const {data} = await axios.post("/api/v1/register", 
            userData,
            {headers: {"Content-Type": "multipart/form-data"}}    
        )
        dispatch({type: userActionType.REGISTER_USER_SUCCESS, payload: data.user})
    } catch (error) {
        dispatch({type: userActionType.REGISTER_USER_FAIL, payload: error.response.data.message})
    }
}

export const loadUser = ()=> async (dispatch)=>{
    try {
        dispatch({type: userActionType.LOAD_USER_REQUEST})

        const {data} = await axios("/api/v1/me")
        dispatch({type: userActionType.LOAD_USER_SUCCESS, payload: data.user})
    } catch (error) {
        dispatch({type: userActionType.LOAD_USER_FAIL, payload: error.response.data.message})
    }
}

export const logout = ()=> async (dispatch)=>{
    try {
        dispatch({type: userActionType.LOGOUT_REQUEST})

        await axios("/api/v1/logout")
        dispatch({type: userActionType.LOGOUT_SUCCESS})
    } catch (error) {
        dispatch({type: userActionType.LOGOUT_FAIL, payload: error.response.data.message})
    }
}

export const updateProfile = (userData)=> async (dispatch)=>{
    try {
        dispatch({type: userActionType.UPDATE_PROFILE_REQUEST})

        const {data} = await axios.put("/api/v1/me/update", 
            userData,
            {headers: {"Content-Type": "multipart/form-data"}}    
        )
        dispatch({type: userActionType.UPDATE_PROFILE_SUCCESS, payload: data.success})
    } catch (error) {
        dispatch({type: userActionType.UPDATE_PROFILE_FAIL, payload: error.response.data.message})
    }
}

export const updatePassword = (passwords)=> async (dispatch)=>{
    try {
        dispatch({type: userActionType.UPDATE_PASSWORD_REQUEST})

        const {data} = await axios.put("/api/v1/password/update", 
            passwords,
            {headers: {"Content-Type": "application/json"}}    
        )
        dispatch({type: userActionType.UPDATE_PASSWORD_SUCCESS, payload: data.success})
    } catch (error) {
        dispatch({type: userActionType.UPDATE_PASSWORD_FAIL, payload: error.response.data.message})
    }
}

export const forgotPassword = (email)=> async (dispatch)=>{
    try {
        dispatch({type: userActionType.FORGOT_PASSWORD_REQUEST})

        const {data} = await axios.post("/api/v1/password/forgot", 
            email,
            {headers: {"Content-Type": "application/json"}}    
        )
        dispatch({type: userActionType.FORGOT_PASSWORD_SUCCESS, payload: data.message})
    } catch (error) {
        dispatch({type: userActionType.FORGOT_PASSWORD_FAIL, payload: error.response.data.message})
    }
}

export const resetPassword = (token, passwords)=> async (dispatch)=>{
    try {
        dispatch({type: userActionType.RESET_PASSWORD_REQUEST})

        const {data} = await axios.put(`/api/v1/password/reset/${token}`, 
            passwords,
            {headers: {"Content-Type": "application/json"}}    
        )
        dispatch({type: userActionType.RESET_PASSWORD_SUCCESS, payload: data.success})
    } catch (error) {
        dispatch({type: userActionType.RESET_PASSWORD_FAIL, payload: error.response.data.message})
    }
}

export const clearError =()=> async (dispach)=>{
    dispach({type:userActionType.CLEAR_ERRORS})
}