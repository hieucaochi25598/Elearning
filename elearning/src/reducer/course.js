import { GET_COURSE_LIST, GET_COURSE_DETAIL, GET_COURSE_TITLE, GET_COURSE_FROM_TITLE, FIND_COURSE, COURSE_CHOSEN, GET_USER_LIST_OF_COURSE, GET_USER_LIST_NOT_CHOSE_COURSE, GET_USER_LIST_WAIT_COURSE, CHANGE_PRICE } from "../contants/courseConstant"

const initialState = {
    listCourses: [],
    currenPage: 1,
    totalCount: 0,
    courseDetail: {},
    courseTitle: [],
    courseChosen: {},
    userOfCourse: [],
    userNotChoseCourse: [],
    userWaitCourse: [],
    price: 13
}

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COURSE_LIST:
            {
                const listCourses = action.data.map(item => {
                    return {
                        ...item,
                        giaTien: Math.floor(Math.random() * 101)
                    }
                })
                return { ...state, listCourses}
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
                const listCourses = action.data.map(item => {
                    return {
                        ...item,
                        giaTien: Math.floor(Math.random() * 101)
                    }
                })
                return { ...state, listCourses}
            }
        case FIND_COURSE:

            {
                const listCourses = action.data.map(item => {
                    return {
                        ...item,
                        giaTien: Math.floor(Math.random() * 101)
                    }
                })
                return { ...state, listCourses }
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