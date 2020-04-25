import axios, { setAuthorization } from '../util/axios'
import { GET_USER_INFO, GET_ACCOUNT_INFO, TOGGLE_MODAL, EDIT_ACCOUNT_INFO, GET_MY_COURSES_LIST, GET_MY_COURSES_LIST_WAITING, ADD_TO_CART, CAL_TOTAL_PRICE, DELETE_CART, DELETE_SIGNUP_COURSE, DISCOUNT_CART, CLEAR_CART, GET_CART_ARRAY, SIGNUP_COURSE, ADD_MONEY, COMMENT_COURSE, GET_COMMENT_COURSE, GET_WISHLIST_ARRAY, ADD_TO_WISHLIST, DELETE_WISHLIST, GET_FEEDBACK_ARRAY, GET_NEWS_ARRAY, SEND_FEEDBACK } from '../contants/userConstants'
import Swal from 'sweetalert2'
import { firebaseApp } from '../firebaseConfig'

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
            dispatch(getWishList())
            dispatch(getCartArray())
            
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
        }).catch(error => {
            console.log(error)
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
export const clearCart = () => {
    return (dispatch, getState) => {
        const {userInfo} = getState().userReducer
        firebaseApp.database().ref(`cartArray/`).child(userInfo.taiKhoan).remove().then(() => {
            dispatch(clearCartAction())
        })
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

export const addToCart = (course, handleComplete) => {
    return (dispatch,getState) => {
        const {userInfo} = getState().userReducer
        const {accountInfo}= getState().userReducer
        const index = accountInfo.chiTietKhoaHocGhiDanh.findIndex(item => item.maKhoaHoc === course.maKhoaHoc)
        if(index === -1) {
            firebaseApp.database().ref(`cartArray/${userInfo.taiKhoan}/${course.maKhoaHoc}`).set({
                tenKhoaHoc: course.tenKhoaHoc,
                biDanh: course.biDanh,
                hinhAnh: course.hinhAnh,
                moTa: course.moTa,
                luotXem: course.luotXem,
                maNhom: course.maNhom,
                ngayTao: course.ngayTao,
                nguoiTao: {taiKhoan: course.nguoiTao.taiKhoan, hoTen: course.nguoiTao.hoTen ,maLoaiNguoiDung: course.nguoiTao.maLoaiNguoiDung, tenLoaiNguoiDung: course.nguoiTao.tenLoaiNguoiDung},
                danhMucKhoaHoc: {maDanhMucKhoahoc: course.danhMucKhoaHoc.maDanhMucKhoahoc, tenDanhMucKhoaHoc: course.danhMucKhoaHoc.tenDanhMucKhoaHoc}
            }).then(() => {
                dispatch(addToCartAction(course))
                handleComplete()
            })
        }else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Khóa học này đã được đăng ký',
                showConfirmButton: false,
                timer: 2500
            })
        }
    }
}
export const addToCartAction = (course) => {
    return {
        type: ADD_TO_CART,
        data: course
    }
}
export const deleteCart = (maKhoaHoc) => {
    return (dispatch, getState) => {
        const {userInfo} = getState().userReducer
        firebaseApp.database().ref(`cartArray/${userInfo.taiKhoan}`).child(maKhoaHoc).remove().then(() => {
            dispatch(deleteCartAction(maKhoaHoc))
        })
    }
}
export const deleteCartAction = (maKhoaHoc) => {
    return {
        type: DELETE_CART,
        data: maKhoaHoc
    }
}
export const getCartArray = () => {
    return (dispatch, getState) => {
        const {userInfo} = getState().userReducer
        firebaseApp.database().ref(`cartArray/${userInfo.taiKhoan}/`).once("value").then((snapshot) =>{
            let cartArray = []
            snapshot.forEach(element => {
                const maKhoaHoc = element.key
                const tenKhoaHoc = element.val().tenKhoaHoc
                const biDanh = element.val().biDanh
                const hinhAnh = element.val().hinhAnh
                const moTa = element.val().moTa
                const luotXem = element.val().luotXem
                const maNhom = element.val().maNhom
                const ngayTao = element.val().ngayTao
                const nguoiTao = {taiKhoan: element.val().nguoiTao.taiKhoan, hoTen: element.val().nguoiTao.hoTen ,maLoaiNguoiDung: element.val().nguoiTao.maLoaiNguoiDung, tenLoaiNguoiDung: element.val().nguoiTao.tenLoaiNguoiDung}
                const danhMucKhoaHoc = {maDanhMucKhoahoc: element.val().danhMucKhoaHoc.maDanhMucKhoahoc, tenDanhMucKhoaHoc: element.val().danhMucKhoaHoc.tenDanhMucKhoaHoc}
                cartArray.push({
                    maKhoaHoc,
                    tenKhoaHoc,
                    biDanh,
                    hinhAnh,
                    moTa,
                    luotXem,
                    maNhom,
                    ngayTao,
                    nguoiTao,
                    danhMucKhoaHoc
                })
            })
            dispatch(getCartArrayAction(cartArray))
        })
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
export const addMoneyAction = (values) => {
    return {
        type: ADD_MONEY,
        data: values
    }
}
export const commentCourse = (values) => {
    return (dispatch,getState) => {
        const {courseDetail} = getState().courseReducer
        const {userInfo} = getState().userReducer
        firebaseApp.database().ref(`commentArray/${courseDetail.maKhoaHoc}/`).push({
            comment: values.comment,
            taiKhoan: userInfo.taiKhoan
        }).then(() => {
            dispatch(commentCourseAction(values))
        })
    }
}
export const commentCourseAction = (comment) => {
    return {
        type: COMMENT_COURSE,
        data: comment 
    }
}
export const getCommentCourse = (maKhoaHoc) => {
    return (dispatch, getState) => {
        firebaseApp.database().ref(`commentArray/${maKhoaHoc}/`).once("value").then((snapshot) => {
            console.log(snapshot.val())
            let commentArray = []
            snapshot.forEach(element => {
                const commentId = element.key
                const comment = element.val().comment
                const taiKhoan = element.val().taiKhoan
                commentArray.push({
                    commentId,
                    taiKhoan,
                    comment
                })
            })
            dispatch(getCommentCourseAction(commentArray))
            console.log(commentArray)
        })
    }
}
export const getCommentCourseAction = (comments) => {
    return {
        type: GET_COMMENT_COURSE,
        data: comments
    }
}
export const addToWishList = (course) => {
    return (dispatch,getState) => {
        const {userInfo} = getState().userReducer
        firebaseApp.database().ref(`wishListArray/${userInfo.taiKhoan}/${course.maKhoaHoc}`).set({
            tenKhoaHoc: course.tenKhoaHoc,
            biDanh: course.biDanh,
            hinhAnh: course.hinhAnh,
            moTa: course.moTa,
            luotXem: course.luotXem,
            maNhom: course.maNhom,
            ngayTao: course.ngayTao,
            nguoiTao: {taiKhoan: course.nguoiTao.taiKhoan, hoTen: course.nguoiTao.hoTen ,maLoaiNguoiDung: course.nguoiTao.maLoaiNguoiDung, tenLoaiNguoiDung: course.nguoiTao.tenLoaiNguoiDung},
            danhMucKhoaHoc: {maDanhMucKhoahoc: course.danhMucKhoaHoc.maDanhMucKhoahoc, tenDanhMucKhoaHoc: course.danhMucKhoaHoc.tenDanhMucKhoaHoc}
        }).then(() => {
            dispatch(addToWishListAction(course))
        })
    }
    
}
export const addToWishListAction = (course) => {
    return {
        type: ADD_TO_WISHLIST,
        data: course
    }
}
export const getWishList = () =>{
    return (dispatch, getState) => {
        const {userInfo} = getState().userReducer
        firebaseApp.database().ref(`wishListArray/${userInfo.taiKhoan}/`).once("value").then((snapshot) =>{
            let wishListArray = []
            snapshot.forEach(element => {
                const maKhoaHoc = element.key
                const tenKhoaHoc = element.val().tenKhoaHoc
                const biDanh = element.val().biDanh
                const hinhAnh = element.val().hinhAnh
                const moTa = element.val().moTa
                const luotXem = element.val().luotXem
                const maNhom = element.val().maNhom
                const ngayTao = element.val().ngayTao
                const nguoiTao = {taiKhoan: element.val().nguoiTao.taiKhoan, hoTen: element.val().nguoiTao.hoTen ,maLoaiNguoiDung: element.val().nguoiTao.maLoaiNguoiDung, tenLoaiNguoiDung: element.val().nguoiTao.tenLoaiNguoiDung}
                const danhMucKhoaHoc = {maDanhMucKhoahoc: element.val().danhMucKhoaHoc.maDanhMucKhoahoc, tenDanhMucKhoaHoc: element.val().danhMucKhoaHoc.tenDanhMucKhoaHoc}
                wishListArray.push({
                    maKhoaHoc,
                    tenKhoaHoc,
                    biDanh,
                    hinhAnh,
                    moTa,
                    luotXem,
                    maNhom,
                    ngayTao,
                    nguoiTao,
                    danhMucKhoaHoc
                })
            })
            dispatch(getWishListAction(wishListArray))
        })
    }
}
export const getWishListAction = (wishList) => {
    return {
        type: GET_WISHLIST_ARRAY,
        data: wishList
    }
}
export const deleteWishList = (maKhoaHoc) => {
    return (dispatch, getState) => {
        const {userInfo} = getState().userReducer
        firebaseApp.database().ref(`wishListArray/${userInfo.taiKhoan}`).child(maKhoaHoc).remove().then(() => {
            dispatch(deleteWishListAction(maKhoaHoc))
        })
    }
}
export const deleteWishListAction = (maKhoaHoc) => {
    return {
        type: DELETE_WISHLIST,
        data: maKhoaHoc
    }
}

export const getFeedBack = () => {
    return (dispatch, getState) => {
        firebaseApp.database().ref('feedBackArray/').once("value").then(snapshot => {
            let feedBackArray = []
            snapshot.forEach(element => {
                const hoTen = element.val().hoTen
                const ngayGui = element.val().ngayGui
                const taiKhoan = element.val().taiKhoan
                const content = element.val().content
                const id = element.key
                feedBackArray.push({
                    id,
                    hoTen,
                    ngayGui,
                    taiKhoan,
                    content
                })
            })
            console.log(feedBackArray)
            dispatch(getFeedBackArrayAction(feedBackArray))
        })
    }
}

export const getFeedBackArrayAction = (feedBackArray) => {
    return {
        type: GET_FEEDBACK_ARRAY,
        data: feedBackArray
    }
}
export const getNews = () => {
    return dispatch => {
        firebaseApp.database().ref('newsArray/').once("value").then(snapshot => {
            let newsArray = []
            snapshot.forEach(element => {
                const id = element.key
                const tieuDe = element.val().tieuDe
                const hinhAnh = element.val().hinhAnh
                const noiDung = element.val().noiDung
                const ngayTao = element.val().ngayTao
                newsArray.push({
                    id,
                    tieuDe,
                    ngayTao,
                    hinhAnh,
                    noiDung
                })
            })
            dispatch(getNewsAction(newsArray))
        })
    }
}
export const getNewsAction = (news) => {
    return {
        type: GET_NEWS_ARRAY,
        data: news
    }
}
export const sendFeedBack = (values) => {
    return (dispatch, getState) => {
        const {userInfo} = getState().userReducer
        let toDay = new Date()
        let ngayGui = `${toDay.getDate()}/${toDay.getMonth() + 1}/${toDay.getFullYear()}`
        firebaseApp.database().ref('feedBackArray/').push({
            content: values.yourFeedBack,
            taiKhoan: userInfo.taiKhoan,
            ngayGui: ngayGui,
            hoTen: userInfo.hoTen
        }).then(() => {
            dispatch(sendFeedBackAction(values))
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cảm ơn bạn đã gửi phản hồi.',
                showConfirmButton: false,
                timer: 2500
            })
        })
    }
}
export const sendFeedBackAction = (values) => {
    return {
        type: SEND_FEEDBACK,
        data: values
    }
}