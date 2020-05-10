import axios from "../util/axios";
import { firebaseApp } from '../firebaseConfig'
import {
  GET_USER_LIST,
  USER_CHOSING,
  GET_USER_DETAIL,
  EDIT_USER_DETAIL,
  ADD_USER,
  FIND_USER,
  GET_COURSE_LIST_NOT_ENROLL,
  GET_COURSE_LIST_ENROLLED,
  GET_COURSE_LIST_WAIT_ENROLLED,
  CHANGE_PAGE,
  DELETE_USER,
  CANCLE_ENROLL,
  CONFIRM_ENROLL,
  CHANGE_PAGE_USER
} from "../contants/usersConstants";
import Swal from "sweetalert2";
export const getUserList = (currentPage, pageSize) => {
  return dispatch => {
    axios
      .request({
        method: "GET",
        url: `QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang?MaNhom=GP01&page=${currentPage}&pageSize=${pageSize}`,
      })
      .then(result => {
        dispatch(getUserListAction(result.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};
export const getUserListAction = userList => {
  return {
    type: GET_USER_LIST,
    data: userList
  };
};
export const changePageAction = page => {
  return {
      type: CHANGE_PAGE_USER,
      data: page
  }
}
export const deleteUser = taiKhoan => {
  return dispatch => {
    axios
      .request({
        method: "DELETE",
        url: `QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
      })
      .then(result => {
        dispatch(deleteUserAction(taiKhoan))
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Delete Successfully",
          showConfirmButton: false,
          timer: 1000
        });
      })
      .catch(error => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Delete Failed",
          showConfirmButton: false,
          timer: 1000
        });
        console.log(error);
      });
  };
};
export const deleteUserAction = (taiKhoan) => {
  return{
    type: DELETE_USER,
    data: taiKhoan
  }
}
export const userChosingAction = user => {
  return {
    type: USER_CHOSING,
    data: user
  };
};

export const getUserDetail = (taiKhoan) => {
  return (dispatch, getState) => {
    const { userChosing } = getState().usersReducer;
    axios
      .request({
        method: "POST",
        url: "QuanLyNguoiDung/ThongTinTaiKhoan",
        data: { taiKhoan: taiKhoan }
      })
      .then(result => {
        dispatch(getUserDetailAction(result.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};
export const getUserDetailAction = user => {
  return {
    type: GET_USER_DETAIL,
    data: user
  };
};
export const editUserDetail = values => {
  return dispatch => {
    axios
      .request({
        method: "PUT",
        url: "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        data: { ...values, maNhom: "GP01" }
      })
      .then(result => {
        dispatch(editUserDetailAction(values));
      })
      .catch(error => {
        console.log(error);
      });
  };
};
export const editUserDetailAction = userDetail => {
  return {
    type: EDIT_USER_DETAIL,
    data: userDetail
  };
};
export const addUser = values => {
  return dispatch => {
    axios
      .request({
        method: "POST",
        url: "QuanLyNguoiDung/ThemNguoiDung",
        data: { ...values, maNhom: "GP01" }
      })
      .then(result => {
        dispatch(addUserAction(result.data));
      })
      .catch(error => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Tài khoản hoặc email đã tồn tại.",
          showConfirmButton: false,
          timer: 2000
        });
        console.log(error);
      });
  };
};
export const addUserAction = user => {
  return {
    type: ADD_USER,
    data: user
  };
};
export const findUser = taiKhoan => {
  return dispatch => {
    axios
      .request({
        method: "GET",
        url: `QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${taiKhoan}`
      })
      .then(result => {
        dispatch(findUserAction(result.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};
export const findUserAction = users => {
  return {
    type: FIND_USER,
    data: users
  };
};

export const getCourseListNotEnroll = () => {
  return (dispatch, getState) => {
    const {userChosing} = getState().usersReducer
    axios.request({
      method: 'POST',
      url: 'QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh',
      data: {TaiKhoan: userChosing.taiKhoan}
    }).then(result => {
      dispatch(getCourseListNotEnrollAction(result.data))
    }).catch(error => {
      console.log(error)
    })
  }
}
export const getCourseListNotEnrollAction = (courseList) => {
  return {
    type: GET_COURSE_LIST_NOT_ENROLL,
    data: courseList
  }
}

export const getCourseListEnrolled = () => {
  return (dispatch,getState) => {
    const {userChosing} = getState().usersReducer
    axios.request({
      method: 'POST',
      url: 'QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet',
      data: {taiKhoan: userChosing.taiKhoan}
    }).then(result => {
      dispatch(getCourseListEnrolledAction(result.data))
    }).catch(error => {
      console.log(error)
    })
  }
}
export const getCourseListEnrolledAction = (courseList) => {
  return {
    type: GET_COURSE_LIST_ENROLLED,
    data: courseList
  }
}

export const getCourseListWaitEnrolled = () => {
  return (dispatch, getState) => {
    const {userChosing} = getState().usersReducer
    axios.request({
      method: 'POST',
      url: 'QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet',
      data: {taiKhoan: userChosing.taiKhoan}
    }).then(result => {
      dispatch(getCourseListWaitEnrolledAction(result.data))
    }).catch(error => {
      console.log(error)
    })
  }
}
export const getCourseListWaitEnrolledAction = (courseList) => {
  return {
    type: GET_COURSE_LIST_WAIT_ENROLLED,
    data: courseList
  }
}

export const cancleEnroll = (taiKhoan, maKhoaHoc) => {
  return (dispatch,getState) => {
      // const {courseChosen} = getState().courseReducer
      // const {userChosing} = getState().usersReducer
      axios.request({
          method: 'POST',
          url: 'QuanLyKhoaHoc/HuyGhiDanh',
          data: {taiKhoan, maKhoaHoc}
      }).then(result => {
        dispatch(cancleEnrollAction(maKhoaHoc))
        dispatch(huyGhiDanhTheoNguoiDung(maKhoaHoc))
          // dispatch(getUserListWaitCourse())
          // dispatch(getUserListOfCourse())
          // /////////////////////////////
          // dispatch(getCourseListWaitEnrolled())
          // dispatch(getCourseListEnrolled())
      }).catch(error => {
          console.log(error)
      })
  }
}

export const confirmEnroll = (taiKhoan, maKhoaHoc) => {
  return (dispatch, getState) => {
      // const {courseChosen} = getState().courseReducer
      // const {userChosing} = getState().usersReducer
      axios.request({
          method: 'POST',
          url: 'QuanLyKhoaHoc/GhiDanhKhoaHoc',
          data : {taiKhoan, maKhoaHoc}
      }).then(result => {
          // console.log(result)
          // dispatch(getUserListWaitCourse())
          // dispatch(getCourseListWaitEnrolled())
          dispatch(confirmEnrollAction(maKhoaHoc))
      }).catch(error => {
          console.log(error)
      })
  }
}
export const confirmEnrollAction = (maKhoaHoc) => {
  return {
    type: CONFIRM_ENROLL,
    data: maKhoaHoc
  }
}
export const cancleEnrollAction = (maKhoaHoc) => {
  return {
    type: CANCLE_ENROLL,
    data: maKhoaHoc
  }
}

//Ghi danh Firebase 
export const ghiDanhTheoNguoiDung = (khoaHoc) => {
  return (dispatch,getState) => {
      const {userChosing} = getState().usersReducer
      firebaseApp.database().ref(`khoaHocDuocXetDuyet/${userChosing.taiKhoan}/${khoaHoc.maKhoaHoc}`).set({
          tenKhoaHoc: khoaHoc.tenKhoaHoc,
          hinhAnh: khoaHoc.hinhAnh
      })
  }
}
//huy ghi danh theo nguoi dung
export const huyGhiDanhTheoNguoiDung = (maKhoaHoc) => {
  return (dispatch, getState) => {
      const {userChosing} = getState().usersReducer
      firebaseApp.database().ref(`khoaHocDuocXetDuyet/${userChosing.taiKhoan}`).child(maKhoaHoc).remove().then(() => {

      })
  }
}


