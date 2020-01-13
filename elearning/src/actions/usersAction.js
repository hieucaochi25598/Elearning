import axios from "../util/axios";
import {
  GET_USER_LIST,
  USER_CHOSING,
  GET_USER_DETAIL,
  EDIT_USER_DETAIL,
  ADD_USER,
  FIND_USER,
  GET_COURSE_LIST_NOT_ENROLL,
  GET_COURSE_LIST_ENROLLED,
  GET_COURSE_LIST_WAIT_ENROLLED
} from "../contants/usersConstants";
import Swal from "sweetalert2";
export const getUserList = () => {
  return dispatch => {
    axios
      .request({
        method: "GET",
        url: "QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01"
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
export const deleteUser = taiKhoan => {
  return dispatch => {
    axios
      .request({
        method: "DELETE",
        url: `QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
      })
      .then(result => {
        dispatch(getUserList())
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

export const userChosingAction = user => {
  return {
    type: USER_CHOSING,
    data: user
  };
};

export const getUserDetail = () => {
  return (dispatch, getState) => {
    const { userChosing } = getState().usersReducer;
    axios
      .request({
        method: "POST",
        url: "QuanLyNguoiDung/ThongTinTaiKhoan",
        data: { taiKhoan: userChosing.taiKhoan }
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
        dispatch(editUserDetailAction(result.data));
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
        dispatch(getUserList())
      })
      .catch(error => {
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