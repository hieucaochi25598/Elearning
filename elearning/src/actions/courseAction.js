import axios from '../util/axios'
import { GET_COURSE_LIST, GET_COURSE_DETAIL, GET_COURSE_TITLE, GET_COURSE_FROM_TITLE, FIND_COURSE, COURSE_CHOSEN, GET_USER_LIST_OF_COURSE, GET_USER_LIST_NOT_CHOSE_COURSE, GET_USER_LIST_WAIT_COURSE } from '../contants/courseConstant'
export const getCourseList = () =>{
    return dispatch => {
        axios.request({
            method: 'GET',
            url: 'QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01',
        }).then(result => {
            dispatch(getCourseListAction(result.data))
        }).catch(error => {
            console.log(error)
        })
    }
}
export const getCourseListAction = (courseList) => {
    return{
        type: GET_COURSE_LIST,
        data: courseList
    }
}
export const getCourseDetail = (maKhoaHoc) => {
    return dispatch => {
        axios.request({
            method: 'GET',
            url: `QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`,
            
        }).then(result => {
            dispatch(getCourseDetailAction(result.data))
        }).catch(error => {
            console.log(error)
        })
    }
}
export const getCourseDetailAction = (course) => {
    return {
        type: GET_COURSE_DETAIL,
        data: course
    }
}
export const getCourseTitle = () => {
    return dispatch => {
        axios.request({
            method: 'GET',
            url: 'QuanLyKhoaHoc/LayDanhMucKhoaHoc'
        }).then(result => { 
            dispatch(getCourseTitleAction(result.data))
        }).catch(error => {
            console.log(error)
        })
    }
}
export const getCourseTitleAction = (courseTitle) => {
    return {
        type: GET_COURSE_TITLE,
        data: courseTitle
    }
}
export const getCourseFromTitle = (maDanhMuc) => {
    return dispatch => {
        axios.request({
            method: 'GET',
            url: `QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP01`
        }).then(result => {
            dispatch(getCourseFromTitleAction(result.data))
        }).catch(error => {
            console.log(error)
        })
    }
}
export const getCourseFromTitleAction = (courses) => {
    return {
        type: GET_COURSE_FROM_TITLE,
        data: courses
    }
}
export const findCourse = (tenKhoaHoc) => {
    return dispatch => {
        axios.request({
            method: 'GET',
            url: `QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${tenKhoaHoc}&MaNhom=GP01`
        }).then(result => {
            dispatch(findCourseAction(result.data))
        }).catch(error => {
            console.log(error)
        })
    }
}
export const findCourseAction = (course) => {
    return {
        type: FIND_COURSE,
        data: course
    }
}

export const deleteCourse = (maKhoaHoc) =>{
    return dispatch => {
        axios.request({
            method: 'DELETE',
            url: `QuanLyKhoaHoc/XoaKhoaHoc?maKhoaHoc=${maKhoaHoc}`
        }).then(result => {
            console.log(result.data)
        }).catch(error => {
            console.log(error)
        })
    }
}
export const courseChosenAction = (course) => {
    return {
        type: COURSE_CHOSEN,
        data: course
    }
}
export const getUserListOfCourse = () => {
    return (dispatch,getState) => {
        const {courseChosen} = getState().courseReducer
        axios.request({
            method:'POST',
            url: 'QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc',
            data: {maKhoaHoc: courseChosen.maKhoaHoc} 
        }).then(result => {
            dispatch(getUserListOfCourseAction(result.data))
        }).catch(error => {
            console.log(error)
        })
    }
}
export const getUserListOfCourseAction = (listUser) => {
    return {
        type: GET_USER_LIST_OF_COURSE,
        data: listUser
    }
}

//Lay danh sach nguoi dung chua ghi danh vao khoa hoc do
export const getUserListNotChoseCourse = () => {
    return (dispatch,getState) => {
        const {courseChosen} = getState().courseReducer
        axios.request({
            method: 'POST',
            url: 'QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh',
            data: {maKhoaHoc: courseChosen.maKhoaHoc}
        }).then(result => {
            dispatch(getUserListNotChoseCourseAction(result.data))
        }).catch(error => {
            console.log(error)
        })
    }
}
export const getUserListNotChoseCourseAction = (userList) => {
    return {
        type: GET_USER_LIST_NOT_CHOSE_COURSE,
        data: userList
    }
}
export const getUserListWaitCourse = () => {
    return (dispatch, getState) => {
        const {courseChosen} = getState().courseReducer
        axios.request({
            method: 'POST',
            url: 'QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet',
            data: {maKhoaHoc: courseChosen.maKhoaHoc}
        }).then(result => {
            dispatch(getUserListWaitCourseAction(result.data))
        }).catch(error => {
            console.log(error)
        })
    }
}
export const getUserListWaitCourseAction = (userList) =>{
    return {
        type: GET_USER_LIST_WAIT_COURSE,
        data: userList
    }
}

export const confirmUserJoinCourse = () => {
    return (dispatch, getState) => {
        const {courseChosen} = getState().courseReducer
        const {userChosing} = getState().usersReducer
        axios.request({
            method: 'POST',
            url: 'QuanLyKhoaHoc/GhiDanhKhoaHoc',
            data : {maKhoaHoc: courseChosen.maKhoaHoc, taiKhoan: userChosing.taiKhoan}
        }).then(result => {
            console.log(result)
            dispatch(getUserListWaitCourse())
        }).catch(error => {
            console.log(error)
        })
    }
}

export const cancleUserJoinCourse = () => {
    return (dispatch,getState) => {
        const {courseChosen} = getState().courseReducer
        const {userChosing} = getState().usersReducer
        axios.request({
            method: 'POST',
            url: 'QuanLyKhoaHoc/HuyGhiDanh',
            data: {taiKhoan: userChosing.taiKhoan ,maKhoaHoc: courseChosen.maKhoaHoc}
        }).then(result => {
            dispatch(getUserListWaitCourse())
            dispatch(getUserListOfCourse())
        }).catch(error => {
            console.log(error)
        })
    }
}