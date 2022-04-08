import { actionType } from "../constant/constant";

export const userDataReducer = (state = {userData : {}},{type,payload}) => {
    switch(type){
        case actionType.USER_DATA : 
            return ({userData : payload})
        default : 
            return (state)
    }
}

export const userQRReducer = (state = {userQR : {}},{type,payload}) => {
    switch(type){
        case actionType.USER_QRCODE:
            localStorage.setItem("qrcode",  JSON.stringify(payload))
            return ({userData : payload})
        default : 
            return (state)
    }
}

export const userInfoReducer = (state = {userData : {}},{type,payload}) => {
    switch(type){
        case actionType.USER_INFO : 
            return ({userData : payload})
        default : 
            return (state)
    }
}