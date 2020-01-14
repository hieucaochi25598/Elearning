import axios, { setAuthorization } from '../util/axios'
import { GET_USER_INFO, GET_ACCOUNT_INFO, TOGGLE_MODAL, EDIT_ACCOUNT_INFO } from '../contants/userConstants'
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
        axios.request({
            method: 'POST',
            url: '/QuanLyNguoiDung/ThongTinTaiKhoan',
            data: { taiKhoan: userInfo.taiKhoan }
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

            dispatch(editAccountInfoAction(result.data))
            // setAuthorization(userInfo.accessToken)
            
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
export const signUpCourse = (handleSuccess) =>{
    return (dispatch, getState) => {
        const {userInfo} = getState().userReducer
        const {courseDetail} = getState().courseReducer
        axios.request({
            method: 'POST',
            url:'/QuanLyKhoaHoc/DangKyKhoaHoc',
            data: {
                maKhoaHoc: courseDetail.maKhoaHoc,
                taiKhoan: userInfo.taiKhoan
            }
        }).then(result => {
            handleSuccess()
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Enroll Successfully',
                showConfirmButton: false,
                timer: 2500
            })
        }).catch(error => {
            console.log(error)
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'You have enrolled this course',
                showConfirmButton: true,
            })
        })
    }
}
//Huy dang ky 
export const deleteSignUpCourse = (handleSuccess) => {
    
    return (dispatch, getState) => {
        const {userInfo} = getState().userReducer
        const {courseDetail} = getState().courseReducer         
        axios.request({
            method: 'POST',
            url: '/QuanLyKhoaHoc/HuyGhiDanh',
            data: {
                maKhoaHoc: courseDetail.maKhoaHoc,
                taiKhoan: userInfo.taiKhoan
            }
        }).then(result => {
            handleSuccess()
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cancel Enroll Successfully',
                showConfirmButton: false,
                timer: 2500
            })
        }).catch(error => {
            console.log(error)
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'You have not enrolled this course',
                showConfirmButton: true,
            })
        })
    }
}
