import { GET_USER_INFO, GET_ACCOUNT_INFO, TOGGLE_MODAL, EDIT_ACCOUNT_INFO, GET_MY_COURSES_LIST, GET_MY_COURSES_LIST_WAITING, ADD_TO_CART, CAL_TOTAL_PRICE, DELETE_CART } from "../contants/userConstants"
import Swal from "sweetalert2";
//Luu thong tin user khi dang nhap
const initialState = {
    userInfo: {},
    accountInfo: {},
    isOpen: false,
    myCoursesList: [],
    myCousesListWaiting: [],
    cartArray: [],
    isSuccessAdd: false,
    totalPrice: 0
}

const userReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case GET_USER_INFO:
            {
                return {...state, userInfo: action.data}
            }
        case GET_ACCOUNT_INFO:
            {
                return {...state, accountInfo: action.data}
            }
        case TOGGLE_MODAL: {
            return {...state, isOpen: action.data}
        }
        case EDIT_ACCOUNT_INFO:
            {   
                const accountInfo = {...state.accountInfo}
                const userInfo = {...state.userInfo}
                accountInfo.matKhau = action.data.matKhau
                accountInfo.hoTen = action.data.hoTen
                accountInfo.soDT = action.data.soDt
                accountInfo.maLoaiNguoiDung = action.data.maLoaiNguoiDung
                userInfo.maLoaiNguoiDung = action.data.maLoaiNguoiDung
                
                return {...state, accountInfo, userInfo}
            }
        case GET_MY_COURSES_LIST:
            {
                return {...state, myCoursesList: action.data}
            }
        case GET_MY_COURSES_LIST_WAITING:
            {
                return {...state, myCousesListWaiting: action.data}
            }
        case ADD_TO_CART:
            {
                const cartArray = [...state.cartArray]
                const userInfo = {...state.userInfo}
                const index = cartArray.findIndex(item => item.maKhoaHoc === action.data.maKhoaHoc)
                if(index === -1 && Object.keys(userInfo).length !== 0){
                    cartArray.push(action.data)
                    state.isSuccessAdd = true
                }else{
                    state.isSuccessAdd = false
                }          
                return {...state, cartArray}
            }
            case DELETE_CART:
                {
                    let cartArray = [...state.cartArray]
                    cartArray = state.cartArray.filter(item => item.maKhoaHoc !== action.data)
                    return {...state, cartArray}
                }
            case CAL_TOTAL_PRICE:

                {   const cartArray = [...state.cartArray]
                    state.totalPrice = 0
                    for( let i = 0; i < cartArray.length; i++){
                        state.totalPrice += cartArray[i].giaTien
                    }
                    return {...state}
                }
        default:
            return state
    }
}
export default userReducer