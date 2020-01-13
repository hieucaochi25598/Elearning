import { GET_COURSE_LIST, GET_COURSE_DETAIL, GET_COURSE_TITLE, GET_COURSE_FROM_TITLE, FIND_COURSE, COURSE_CHOSEN, GET_USER_LIST_OF_COURSE, GET_USER_LIST_NOT_CHOSE_COURSE, GET_USER_LIST_WAIT_COURSE } from "../contants/courseConstant"

const initialState = {
    listCourses: [],
    currenPage: 1,
    totalCount: 0,
    courseDetail: {},
    courseTitle: [],
    courseChosen: {},
    userOfCourse: [],
    userNotChoseCourse: [],
    userWaitCourse: []
}

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COURSE_LIST:
            {
                return { ...state, listCourses: action.data }
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
                return { ...state, listCourses: action.data }
            }
        case FIND_COURSE:
            {
                return { ...state, listCourses: action.data }
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
        default:
            return state
    }
}

export default courseReducer