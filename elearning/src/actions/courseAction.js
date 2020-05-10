import axios from '../util/axios'
import { GET_COURSE_LIST, GET_COURSE_DETAIL, GET_COURSE_TITLE, GET_COURSE_FROM_TITLE, FIND_COURSE, COURSE_CHOSEN, GET_USER_LIST_OF_COURSE, GET_USER_LIST_NOT_CHOSE_COURSE, GET_USER_LIST_WAIT_COURSE, CHANGE_PRICE, DELETE_COURSE, CHANGE_PAGE, GET_COURSE_LIST_ALL, SAVE_NAME_FIND_COURSE, FIND_COURE_NO_RESULT, CANCLE_COURSE, FIND_COURSE_ADMIN, UPLOAD_START, UPLOAD_SUCCESS, UPLOAD_URL } from '../contants/courseConstant'
import { getCourseListWaitEnrolled, getCourseListEnrolled } from './usersAction'
import { firebaseApp } from '../firebaseConfig'

export const themKhoaHoc = khoaHoc => {
    return (dispatch, getState) => {
        // Lấy dữ liệu từ redux store thông qua getState
        const {userInfo} = getState().userReducer;
        const {currentPage} = getState().courseReducer
        const date = new Date();
        console.log(khoaHoc.hinhAnh);
        const dataSubmit = {
            ...khoaHoc,
            hinhAnh: khoaHoc.hinhAnh.name,
            luotXem: 10,
            danhGia: 0,
            taiKhoanNguoiTao: userInfo.taiKhoan,
            ngayTao: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,   // dd / mm / yy
            maNhom: "GP01",
        }
        axios.request({
            method: "POST",
            url: "QuanLyKhoaHoc/ThemKhoaHoc",
            data: dataSubmit
        }).then(result => {
            const formData = new FormData();
            formData.append("file", khoaHoc.hinhAnh);
            formData.append("tenKhoaHoc", khoaHoc.tenKhoaHoc)
            axios.request({
                method: "POST",
                url: 'QuanLyKhoaHoc/UpLoadHinhAnhKhoaHoc',
                data: formData
            }).then(result => {
                console.log(result)
                dispatch(getCourseList(currentPage, 10, () => {}))
            }).catch(error => {
                console.log(error)
            })
        })
    }
}
export const suaKhoaHoc = khoaHoc => {
    return (dispatch, getState) => {
        // Lấy dữ liệu từ redux store thông qua getState
        const {userInfo} = getState().userReducer;
        const {currentPage} = getState().courseReducer
        const date = new Date();
        console.log(khoaHoc.hinhAnh);
        const dataSubmit = {
            ...khoaHoc,
            hinhAnh: khoaHoc.hinhAnh.name,
            luotXem: 10,
            danhGia: 0,
            taiKhoanNguoiTao: userInfo.taiKhoan,
            ngayTao: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,   // dd / mm / yy
            maNhom: "GP01",
        }
        axios.request({
            method: "PUT",
            url: "QuanLyKhoaHoc/CapNhatKhoaHoc",
            data: dataSubmit
        }).then(result => {
            const formData = new FormData();
            formData.append("file", khoaHoc.hinhAnh);
            formData.append("tenKhoaHoc", khoaHoc.tenKhoaHoc)
            axios.request({
                method: "POST",
                url: 'QuanLyKhoaHoc/UpLoadHinhAnhKhoaHoc',
                data: formData
            }).then(result => {
                console.log(result)
                dispatch(getCourseList(currentPage, 10, () => {}))
            }).catch(error => {
                console.log(error)
            })
        })
    }
}
export const getCourseList = (currentPage, pageSize,handleSuccess) =>{
    return dispatch => {
        axios.request({
            method: 'GET',
            url: `QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?page=${currentPage}&pageSize=${pageSize}&MaNhom=GP01`,
        }).then(result => {
            
            dispatch(getCourseListAction(result.data))
            handleSuccess()
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
export const getCourseListAll = (handleSuccess) => {
    return dispatch => {
        axios.request({
            method: 'GET',
            url: 'QuanLyKhoaHoc/LayDanhSachKhoaHoc',
        }).then(result => {
            dispatch(getCourseListAllAction(result.data))
            handleSuccess()
        }).catch(error => {
            console.log(error)
        })
    }
}
export const getCourseListAllAction = (courseList) => {
    return {
        type: GET_COURSE_LIST_ALL,
        data: courseList
    }
}
export const changePageAction = page => {
    return {
        type: CHANGE_PAGE,
        data: page
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

export const findCourse = (tenKhoaHoc, handleSuccess) => {
    return (dispatch) => {
        
        axios.request({
            method: 'GET',
            url: `QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${tenKhoaHoc}&MaNhom=GP01`
        }).then(result => {
            dispatch(findCourseAction(result.data))
            handleSuccess()
        }).catch(error => {
            dispatch(findCourseNoResultAction())
            handleSuccess()
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
export const findCourseAdmin = (tenKhoaHoc) => {
    return (dispatch) => {
        
        axios.request({
            method: 'GET',
            url: `QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${tenKhoaHoc}&MaNhom=GP01`
        }).then(result => {
            dispatch(findCourseAdminAction(result.data))
        }).catch(error => {
            
            console.log(error)
        })
    }
}
export const findCourseAdminAction = (resultFound) => {
    return {
        type: FIND_COURSE_ADMIN,
        data: resultFound
    }
}
export const findCourseNoResultAction = () => {
    return {
        type: FIND_COURE_NO_RESULT
    }
}
export const deleteCourse = (maKhoaHoc) =>{
    return dispatch => {
        axios.request({
            method: 'DELETE',
            url: `QuanLyKhoaHoc/XoaKhoaHoc?maKhoaHoc=${maKhoaHoc}`
        }).then(result => {
            // dispatch(getCourseList())
            dispatch(deleteCourseAction(maKhoaHoc))
        }).catch(error => {
            console.log(error)
        })
    }
}
export const deleteCourseAction = (maKhoaHoc) => {
    return {
        type: DELETE_COURSE,
        data: maKhoaHoc
    }
}
export const courseChosenAction = (course) => {
    return {
        type: COURSE_CHOSEN,
        data: course
    }
}
export const getUserListOfCourse = (maKhoaHoc) => {
    return (dispatch,getState) => {
        // const {courseChosen} = getState().courseReducer
        axios.request({
            method:'POST',
            url: 'QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc',
            data: {maKhoaHoc}
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
            dispatch(getCourseListWaitEnrolled())
        }).catch(error => {
            console.log(error)
        })
    }
}

export const cancleUserJoinCourse = (taiKhoan, maKhoaHoc) => {
    return (dispatch,getState) => {
        // const {courseChosen} = getState().courseReducer
        // const {userChosing} = getState().usersReducer
        axios.request({
            method: 'POST',
            url: 'QuanLyKhoaHoc/HuyGhiDanh',
            data: {taiKhoan, maKhoaHoc}
        }).then(result => {
            // dispatch(getUserListWaitCourse(maKhoaHoc))
            dispatch(getUserListOfCourse(maKhoaHoc))
            dispatch(getUserListWaitCourse(maKhoaHoc))
            firebaseApp.database().ref(`khoaHocDuocXetDuyet/${taiKhoan}`).child(maKhoaHoc).remove().then(() => {

            })
            // /////////////////////////////
            // dispatch(getCourseListWaitEnrolled())
            // dispatch(getCourseListEnrolled())
        }).catch(error => {
            console.log(error)
        })
    }
}
export const changePrice = () => {
    return {
        type: CHANGE_PRICE
    }
}
//ghi danh dua vao khoa hoc firebase
export const ghiDanhTheoKhoaHoc = (user) => {
    return (dispatch,getState) => {
        const {courseChosen} = getState().courseReducer
        
        firebaseApp.database().ref(`khoaHocDuocXetDuyet/${user.taiKhoan}/${courseChosen.maKhoaHoc}`).set({
            tenKhoaHoc: courseChosen.tenKhoaHoc,
            hinhAnh: courseChosen.hinhAnh
        })
    }
}

export const uploadStartAction = () => {
    return{
        type: UPLOAD_START,
    }
    
}
export const uploadSuccessAction = (filename) => {
    return {
        type: UPLOAD_SUCCESS,
        data: filename
    }
}
export const uploadSuccessUrl = (url) => {
    return {
        type: UPLOAD_URL,
        data: url
    }
}
export const handleUploadSuccess = (filename) => {
    return (dispatch, getState) => {
        const {courseChosen} = getState().courseReducer
        dispatch(uploadSuccessAction(filename))
        // firebaseApp.storage().ref(`${courseChosen.maKhoaHoc}`).getDownloadURL().then(url => {
        //     dispatch(uploadSuccessUrl(url))
        // })
    }
    
}