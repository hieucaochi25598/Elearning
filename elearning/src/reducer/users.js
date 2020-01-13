import { GET_USER_LIST, USER_CHOSING, GET_USER_DETAIL, EDIT_USER_DETAIL, ADD_USER, FIND_USER, GET_COURSE_LIST_NOT_ENROLL, GET_COURSE_LIST_ENROLLED, GET_COURSE_LIST_WAIT_ENROLLED } from "../contants/usersConstants"

//luu thong tin tat ca user dung trong admin
const initialState = {
    listUsers: [],
    currenPage: 1,
    totalCount: 0,
    userDetail: {},
    userChosing: {},
    listCourseNotEnroll: [],
    listCourseEnrolled: [],
    listCourseWaitEnrolled: []
}
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_LIST:
            {
                return { ...state, listUsers: action.data }
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
                const userDetail = state.userDetail
                userDetail.taiKhoan = action.data.taiKhoan
                userDetail.matKhau = action.data.matKhau
                userDetail.hoTen = action.data.hoTen
                userDetail.email = action.data.email
                userDetail.maLoaiNguoiDung = action.data.maLoaiNguoiDung
                userDetail.soDT = action.data.soDt
                return {...state}
            }
            case ADD_USER:
                {
                    const listUsers = [...state.listUsers]
                    listUsers.push(action.data)
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
        default:
            return state
    }
}
export default usersReducer