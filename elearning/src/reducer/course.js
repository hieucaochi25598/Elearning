import { GET_COURSE_LIST, GET_COURSE_DETAIL, GET_COURSE_TITLE, GET_COURSE_FROM_TITLE, FIND_COURSE, COURSE_CHOSEN, GET_USER_LIST_OF_COURSE, GET_USER_LIST_NOT_CHOSE_COURSE, GET_USER_LIST_WAIT_COURSE, CHANGE_PRICE, DELETE_COURSE, CHANGE_PAGE, GET_COURSE_LIST_ALL, SAVE_NAME_FIND_COURSE, FIND_COURE_NO_RESULT, CANCLE_COURSE, FIND_COURSE_ADMIN, UPLOAD_SUCCESS, UPLOAD_START, UPLOAD_URL } from "../contants/courseConstant"

const initialState = {
    listCourses: [],
    listCoursesFound:[],
    currentPage: 1,
    totalCount: 0,
    courseDetail: {},
    courseTitle: [],
    // document: '',
    // documentUrl: '',
    // progress: 0,
    courseChosen: {},
    userOfCourse: [],
    userNotChoseCourse: [],
    userWaitCourse: [],
}

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_START:{
            return {...state, progress: 0}
        }
        case UPLOAD_SUCCESS: {
            return {...state, document: action.data, progress: 100}
        }
        case UPLOAD_URL: {
            return {...state, documentUrl: action.data}
        }
        case CHANGE_PAGE:
            {        
                return {...state, currentPage: action.data}
            }
        case GET_COURSE_LIST_ALL:
            {
                return {...state, listCourses: action.data}
            }
        case GET_COURSE_LIST:
            {
                
                return {...state, listCourses: action.data.items, totalCount: action.data.totalCount}
            }
        case GET_COURSE_DETAIL:
            {
                return { ...state, courseDetail: action.data }
            }
        case GET_COURSE_TITLE:
            {
                return { ...state, courseTitle: action.data }
            }
        case GET_COURSE_FROM_TITLE:
            {
                
                return { ...state, listCourses:action.data}
            }
        case FIND_COURSE:

            {
                
                return { ...state, listCoursesFound:action.data }
            }
        case FIND_COURSE_ADMIN:
            {
                return {...state, listCourses: action.data}
            }
        case FIND_COURE_NO_RESULT:
            {
                return {...state, listCoursesFound: []}
            }
        case DELETE_COURSE: {
            const listCourses = [...state.listCourses]
            const index = listCourses.findIndex(item => item.maKhoaHoc === action.data)
            if(index !== -1)
            {
                listCourses.splice(index, 1)
            }
            return {...state, listCourses}
        }
        case COURSE_CHOSEN:
            {
                return {...state, courseChosen: action.data}
            }
        case GET_USER_LIST_OF_COURSE:
            {
                return {...state, userOfCourse: action.data}
            }
        case GET_USER_LIST_NOT_CHOSE_COURSE:
            {
                return {...state, userNotChoseCourse: action.data}
            }
        case GET_USER_LIST_WAIT_COURSE:
        {
            return {...state, userWaitCourse: action.data}
        }
        case CHANGE_PRICE:
            {
                
                let price = {...state.price}
                price = Math.floor(Math.random() * 101)
                return {...state, price: price}
            }
        default:
            return state
    }
}

export default courseReducer