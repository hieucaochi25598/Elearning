import { GET_USER_LIST, USER_CHOSING, GET_USER_DETAIL, EDIT_USER_DETAIL, ADD_USER, FIND_USER, GET_COURSE_LIST_NOT_ENROLL, GET_COURSE_LIST_ENROLLED, GET_COURSE_LIST_WAIT_ENROLLED, CHANGE_PAGE, DELETE_USER, CANCLE_ENROLL, CONFIRM_ENROLL, CHANGE_PAGE_USER } from "../contants/usersConstants"

//luu thong tin tat ca user dung trong admin
const initialState = {
    listUsers: [],
    currentPage: 1,
    totalCount: 0,
    userDetail: {},
    userChosing: {},
    listCourseNotEnroll: [],
    listCourseEnrolled: [],
    listCourseWaitEnrolled: []
}
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_PAGE_USER:{
            return {...state, currentPage: action.data}
        }
        case GET_USER_LIST:
            {
                return { ...state, listUsers: action.data.items, totalCount: action.data.totalCount }
            }
        case USER_CHOSING:
            {
                return { ...state, userChosing: action.data }
            }
        case GET_USER_DETAIL:
            {
                return { ...state, userDetail: action.data }
            }
        case EDIT_USER_DETAIL:
            {
                const userDetail = {...state.userDetail}
                userDetail.taiKhoan = action.data.taiKhoan
                userDetail.matKhau = action.data.matKhau
                userDetail.hoTen = action.data.hoTen
                userDetail.email = action.data.email
                userDetail.maLoaiNguoiDung = action.data.maLoaiNguoiDung
                userDetail.soDT = action.data.soDT
                return {...state, userDetail}
            }
            case ADD_USER:
                {
                    const listUsers = [...state.listUsers]
                    listUsers.push(action.data)
                    return {...state, listUsers}
                }
            case DELETE_USER:{
                const listUsers = [...state.listUsers]
                const index = listUsers.findIndex(item => item.taiKhoan === action.data)
                if(index !== -1){
                    listUsers.splice(index ,1)
                }
                return {...state, listUsers}
            }
                case FIND_USER: {
                    return {...state, listUsers: action.data}
                }
            case GET_COURSE_LIST_NOT_ENROLL:
                {
                    return {...state, listCourseNotEnroll: action.data}
                }
            case GET_COURSE_LIST_ENROLLED:
                {
                    return {...state, listCourseEnrolled: action.data}
                }
            case GET_COURSE_LIST_WAIT_ENROLLED:
                {
                    return {...state, listCourseWaitEnrolled: action.data}
                }
            case CANCLE_ENROLL:
                {
                    const listCourseEnrolled = [...state.listCourseEnrolled]
                    const index = listCourseEnrolled.findIndex(item => item.maKhoaHoc === action.data)
                    if(index !== -1){
                        listCourseEnrolled.splice(index , 1)
                    }
                    return {...state,listCourseEnrolled}
                }
                case CONFIRM_ENROLL:
                    {
                        const listCourseWaitEnrolled = [...state.listCourseWaitEnrolled]
                        const index = listCourseWaitEnrolled.findIndex(item => item.maKhoaHoc === action.data)
                        if(index !== -1){
                            listCourseWaitEnrolled.splice(index ,1)
                        }
                        return {...state, listCourseWaitEnrolled}
                    }
        default:
            return state
    }
}
export default usersReducer