import { productActionType } from "../actionTypes/productActionType"

const initialState = {
    loading: false,
    products: [],
    productsCount: 0,
    error: null
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case productActionType.ALL_PRODUCT_REQUEST:
        case productActionType.ADMIN_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case productActionType.ALL_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
            }

        case productActionType.ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }

        case productActionType.ALL_PRODUCT_FAIL:
        case productActionType.ADMIN_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case productActionType.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const productDetailsReducer = (state = {product:{}}, action) => {
    switch (action.type) {
        case productActionType.PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case productActionType.PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload
            }

        case productActionType.PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case productActionType.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const newProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
      case productActionType.NEW_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
        };

      case productActionType.NEW_PRODUCT_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          product: action.payload.product,
        };

      case productActionType.NEW_PRODUCT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

      case productActionType.CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };

  export const updateProductReducer = (state = {}, action) => {
    switch (action.type) {
      case productActionType.DELETE_PRODUCT_REQUEST:
      case productActionType.UPDATE_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case productActionType.DELETE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case productActionType.UPDATE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case productActionType.DELETE_PRODUCT_FAIL:
      case productActionType.UPDATE_PRODUCT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
    case productActionType.UPDATE_PRODUCT_RESET:
          return {
            ...state,
            isUpdated: false
          };
      case productActionType.CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };