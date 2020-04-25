import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getUserList,
  deleteUser,
  userChosingAction,
  findUser,
  changePageAction,
} from "../../actions/usersAction";
import Swal from "sweetalert2";
import { onToggleModal } from "../../actions/userActions";
import SearchIcon from "@material-ui/icons/Search";
import { InputAdornment } from "@material-ui/core";
import FormEditUsers from "./FormEditUsers";
import { useState } from "react";
import FormAddUser from "./FormAddUser";
import { MyTextField } from "./Signup";
import { Formik } from "formik";
import { Form, FormGroup } from "reactstrap";
import PaginationComponent from "../layout/Pagination";

const UserManagement = props => {
  const { listUsers,currentPage, totalCount } = useSelector(state => state.usersReducer);

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getUserList(currentPage, 8));
  }, [currentPage]);
  const onChangePage = (page) => {
    dispatch(changePageAction(page))
}
  
  return (
    <div>
      <FormAddUser />
      <h2>DANH SÁCH NGƯỜI DÙNG</h2>
      <div className="d-flex justify-content-between">
      <button
        className="btn btn-success mb-3"
        onClick={() => dispatch(onToggleModal(true))}
      >
        <i className="fa fa-plus-circle mr-2"></i>Thêm người dùng
      </button>
      <div>
        <Formik
          initialValues={{
            taiKhoan: ""
          }}
        onSubmit={values => dispatch(findUser(values.taiKhoan))}>
          {({ handleSubmit }) => (
            <FormGroup>
              <MyTextField
                name="taiKhoan"
                type="text"
                label="Find user"
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={handleSubmit}
                    >
                      <SearchIcon
                        fontSize="large"
                        style={{ cursor: "pointer" }}
                      />
                    </InputAdornment>
                  )
                }}
              />
            </FormGroup>
          )}
        </Formik>
      </div>
      </div>
      
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Tài Khoản</th>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>Số ĐT</th>
            <th>Loại Người Dùng</th>
            <th>Tác Vụ</th>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.taiKhoan}</td>
              <td>{user.hoTen}</td>
              <td>{user.email}</td>
              <td>{user.soDT}</td>
              <td>{user.tenLoaiNguoiDung}</td>
              <td>
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => {
                    props.history.push(`/admin/user-detail/list-course-enrolled/${user.taiKhoan}`);
                    dispatch(userChosingAction(user))
                  }
                   
                  }
                >
                  <i className="fa fa-file-alt mr-2"></i>Chi tiết
                </button>
                {/* <button className="btn btn-success" onClick={() => {props.history.push(`/admin/list-course-not-enroll/${user.taiKhoan}`); dispatch(userChosingAction(user))}}>DSKH chua ghi danh</button>
                <button className="btn btn-warning" onClick={() => {props.history.push(`/admin/list-course-enrolled/${user.taiKhoan}`); dispatch(userChosingAction(user))}}>DSKH da ghi danh</button>
                <button className="btn btn-secondary" onClick={() => {props.history.push(`/admin/list-course-wait-enrolled/${user.taiKhoan}`); dispatch(userChosingAction(user))}}>DSKH cho xet duyet</button> */}
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    Swal.fire({
                      title: "Bạn có chắc chắn muốn xóa tài khoản này?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Có",
                      cancelButtonText: "Không"
                    }).then(result => {
                      if (result.value) {
                        dispatch(deleteUser(user.taiKhoan));
                      }
                    })
                  }
                >
                  <i className="fa fa-trash-alt mr-2"></i>Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="row justify-content-center mt-4">
            <PaginationComponent
              pageSize={8}
              currentPage={currentPage}
              totalCount={totalCount}
              onChangePage={onChangePage}
            />
          </div>
    </div>
  );
};
export default UserManagement;
