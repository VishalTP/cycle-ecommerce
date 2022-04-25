import { userActionType } from "../actionTypes/userActionType"

const initialState = {
    loading: false,
    user: [],
    error: null
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userActionType.LOGIN_REQUEST:
        case userActionType.REGISTER_USER_REQUEST:
        case userActionType.LOAD_USER_REQUEST:
        case userActionType.LOGOUT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case userActionType.LOGIN_SUCCESS:
        case userActionType.REGISTER_USER_SUCCESS:
        case userActionType.LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case userActionType.LOGIN_FAIL:
        case userActionType.REGISTER_USER_FAIL:
        case userActionType.LOAD_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case userActionType.LOGOUT_SUCCESS:
            return {
                ...initialState
            }

        case userActionType.LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        case userActionType.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {

        case userActionType.UPDATE_PROFILE_REQUEST:
        case userActionType.UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            }

        case userActionType.UPDATE_PROFILE_SUCCESS:
        case userActionType.UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case userActionType.UPDATE_PROFILE_FAIL:
        case userActionType.UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case userActionType.UPDATE_PROFILE_RESET:
        case userActionType.UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated: false
            }

        default:
            return state
    }
}

export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {

        case userActionType.FORGOT_PASSWORD_REQUEST:
        case userActionType.RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }

        case userActionType.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        case userActionType.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            }
        case userActionType.FORGOT_PASSWORD_FAIL:
        case userActionType.RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case userActionType.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}