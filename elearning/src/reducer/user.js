import { GET_USER_INFO, GET_ACCOUNT_INFO, TOGGLE_MODAL, EDIT_ACCOUNT_INFO, GET_MY_COURSES_LIST, GET_MY_COURSES_LIST_WAITING } from "../contants/userConstants"

//Luu thong tin user khi dang nhap
const initialState = {
    userInfo: {},
    accountInfo: {},
    isOpen: false,
    myCoursesList: [],
    myCousesListWaiting: []
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
                accountInfo.matKhau = action.data.matKhau
                accountInfo.hoTen = action.data.hoTen
                accountInfo.soDT = action.data.soDt
                accountInfo.maLoaiNguoiDung = action.data.maLoaiNguoiDung
                return {...state, accountInfo}
            }
        case GET_MY_COURSES_LIST:
            {
                return {...state, myCoursesList: action.data}
            }
        case GET_MY_COURSES_LIST_WAITING:
            {
                return {...state, myCousesListWaiting: action.data}
            }
        default:
            return state
    }
}
export default userReducer