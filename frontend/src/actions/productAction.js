import axios from "axios"
import { productActionType } from "../actionTypes/productActionType"

export const getProduct =(keyword="", currentPage=1, price=[0, 25000])=> async (dispach)=>{
    try {
        dispach({type: productActionType.ALL_PRODUCT_REQUEST})

        const {data} = await axios(`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`)
        dispach({
            type: productActionType.ALL_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispach({
            type: productActionType.ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getProductDetails =(id)=> async (dispach)=>{
    try {
        dispach({type: productActionType.PRODUCT_DETAILS_REQUEST})

        const {data} = await axios(`/api/v1/product/${id}`)
        dispach({
            type: productActionType.PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })

    } catch (error) {
        dispach({
            type: productActionType.PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearError =()=> async (dispach)=>{
    dispach({type:productActionType.CLEAR_ERRORS})
}