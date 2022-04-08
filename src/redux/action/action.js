import { actionType } from "../constant/constant"

export const registerUser = (data) => {
    return ({
        type : actionType.USER_DATA,
        payload : data
    })
}

export const getUserQR = (data) => {
    return ({
        type : actionType.USER_QRCODE,
        payload : data
    })
}

export const getUserInfo = (data) => {
    return ({
        type : actionType.USER_INFO,
        payload : data
    })
}