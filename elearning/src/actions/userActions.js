import axios, { setAuthorization } from '../util/axios'
import { GET_USER_INFO, GET_ACCOUNT_INFO, TOGGLE_MODAL, EDIT_ACCOUNT_INFO, GET_MY_COURSES_LIST, GET_MY_COURSES_LIST_WAITING, ADD_TO_CART, CAL_TOTAL_PRICE, DELETE_CART, DELETE_SIGNUP_COURSE, DISCOUNT_CART, CLEAR_CART, GET_CART_ARRAY, SIGNUP_COURSE } from '../contants/userConstants'
import Swal from 'sweetalert2'

//API Dang KY
export const signUpAction = (values, handleSuccess) => {
    return dispatch => {
        axios.request({
            method: 'POST',
            url: 'QuanLyNguoiDung/DangKy',
            data: { ...values, maNhom: 'GP01' }
        }).then(result => {
            handleSuccess()
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Đăng ký thành công',
                showConfirmButton: false,
                timer: 2500
            })
        }).catch(error => {
            console.log(error)
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Email hoặc tài khoản đã tồn tại',
                showConfirmButton: false,
                timer: 2500
            })
        })
    }
}
//API Dang nhap
export const logInAction = (values, handleSuccess) => {
    return (dispatch, getState) => {
        axios.request({
            method: 'POST',
            url: 'QuanLyNguoiDung/DangNhap',
            data: { ...values, maNhom: 'GP01' }
        }).then(result => {
            setAuthorization(result.data.accessToken)
            localStorage.setItem("userInfo", JSON.stringify(result.data))
            dispatch(getUserInfo(result.data))
            dispatch(getAccountInfo())
            const cartArray = JSON.parse(localStorage.getItem('cartArray'))
            if(cartArray){
                dispatch(getCartArrayAction(cartArray))
                dispatch(calTotalPrice())
            }
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Đăng nhập thành công',
                showConfirmButton: false,
                timer: 2500
            })
            handleSuccess()
        }).catch(error => {
            console.log(error)
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Tài khoản hoặc mật khẩu không đúng !',
                showConfirmButton: false,
                timer: 2500
            })
        })
    }
}
//Lay thong tin nguoi dung 
export const getUserInfo = (user) => {
    return {
        type: GET_USER_INFO,
        data: user
    }
}
export const getAccountInfo = () => {
    return (dispatch, getState) => {
        const { userInfo } = getState().userReducer
        const dataSubmit = { taiKhoan: userInfo.taiKhoan}
        axios.request({
            method: 'POST',
            url: '/QuanLyNguoiDung/ThongTinTaiKhoan',
            data: dataSubmit
        }).then(result => {
            dispatch(getAccountInfoAction(result.data))
        }).catch(error => {
            console.log(error)
        })
    }
}
export const getAccountInfoAction = (accountInfo) => {
    return {
        type: GET_ACCOUNT_INFO,
        data: accountInfo
    }
}
export const onToggleModal = (status) => {
    return {
        type: TOGGLE_MODAL,
        data: status
    }
}

export const editAccountInfo = (values) => {
    return (dispatch, getState) => {
        
        axios.request({
            method: 'PUT',
            url: '/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
            data: {...values, maNhom: 'GP01'}
        }).then(result => {
            dispatch(editAccountInfoAction(values))
        }).catch(error => {
            console.log(error)
        })
    }
}
export const editAccountInfoAction = (accountInfo) => {
    return {
         type: EDIT_ACCOUNT_INFO,
         data: accountInfo
    }
}
//Dang ky khoa hoc
export const signUpCourse = (maKhoaHoc, handleSuccess) =>{
    return (dispatch, getState) => {
        const {userInfo} = getState().userReducer
        axios.request({
            method: 'POST',
            url:'/QuanLyKhoaHoc/DangKyKhoaHoc',
            data: {
                maKhoaHoc,
                taiKhoan: userInfo.taiKhoan
            }
        }).then(result => {
            dispatch(signUpCourseAction(maKhoaHoc))
            handleSuccess()

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Thanh toán thành công. Vui lòng chờ xét duyệt!',
                showConfirmButton: false,
                timer: 2500
            })
        }).catch(error => {
            console.log(error)
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Thanh toán thất bại',
                showConfirmButton: true,
            })
        })
    }
}
export const signUpCourseAction = (course) => {
    return {
        type: SIGNUP_COURSE,
        data: course
    }
}
//Xu ly gio hang sau khi thanh toan
export const clearCartAction = () => {
    return {
        type: CLEAR_CART
    }

}
//Huy dang ky 
export const deleteSignUpCourse = (maKhoaHoc) => {
    return (dispatch, getState) => {
        const {userInfo} = getState().userReducer
        axios.request({
            method: 'POST',
            url: '/QuanLyKhoaHoc/HuyGhiDanh',
            data: {
                maKhoaHoc,
                taiKhoan: userInfo.taiKhoan
            }
        }).then(result => {
            dispatch(deleteSignUpCourseAction(maKhoaHoc))
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Hủy đăng ký thành công',
                showConfirmButton: false,
                timer: 2500
            })
        }).catch(error => {
            console.log(error)
        })
    }
}
export const deleteSignUpCourseAction = (maKhoaHoc) => {
    return {
        type:   DELETE_SIGNUP_COURSE,
        data: maKhoaHoc
    }
}
//lay danh sach khoa hoc ma nguoi dung da duoc xet duyet
export const getMyCoursesList = () =>{
    return (dispatch, getState) => {
        const {userInfo} = getState().userReducer
        axios.request({
            method: 'POST', 
            url: 'QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet',
            data: {taiKhoan: userInfo.taiKhoan}
        }).then(result => {
            dispatch(getMyCoursesListAction(result.data))
        }).catch(error => {
            console.log(error)
        })
    }
}
export const getMyCoursesListAction = (coursesList) => {
    return {
        type: GET_MY_COURSES_LIST,
        data: coursesList
    }
}
export const getMyCoursesListWaiting = () =>{
    return (dispatch, getState) => {
        const {userInfo} = getState().userReducer
        axios.request({
            method: 'POST',
            url: 'QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet',
            data: {taiKhoan: userInfo.taiKhoan}
        }).then(result => {
            dispatch(getMyCoursesListWaitingAction(result.data))
        }).catch(error => {
            console.log(error)
        })
    }
}
export const getMyCoursesListWaitingAction = (coursesList) => {
    return {
        type: GET_MY_COURSES_LIST_WAITING,
        data: coursesList
    }
}

export const addToCartAction = (course) => {
    return {
        type: ADD_TO_CART,
        data: course
    }
}
export const deleteCart = (maKhoaHoc) => {
    return {
        type: DELETE_CART,
        data: maKhoaHoc
    }
}
export const getCartArrayAction = (cartArray) => {
    return {
        type: GET_CART_ARRAY,
        data: cartArray
    }
}
export const calTotalPrice = () => {
    return {
        type: CAL_TOTAL_PRICE,
    }
}
