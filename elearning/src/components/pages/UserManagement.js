import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getUserList,
  deleteUser,
  userChosingAction,
  findUser
} from "../../actions/usersAction";
import Swal from "sweetalert2";
import { onToggleModal } from "../../actions/userActions";
import FormEditUsers from "./FormEditUsers";
import { useState } from "react";
import FormAddUser from "./FormAddUser";
import { MyTextField } from "./Signup";
import { Formik } from "formik";
import { Form, FormGroup } from "reactstrap";
const UserManagement = props => {
  const { listUsers } = useSelector(state => state.usersReducer);

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getUserList());
  }, []);

  const handleFind = e => {
    if (e.target.value !== "") {
      dispatch(findUser(e.target.value));
    } else {
      dispatch(getUserList());
    }
  };
  return (
    <div>
      <FormAddUser />
      <h2>Danh sach nguoi dung</h2>
      <button
        className="btn btn-success mb-3"
        onClick={() => dispatch(onToggleModal(true))}
      >
        Them nguoi dung
      </button>
      <div>
        <Formik
          initialValues={{
            taiKhoan: ""
          }}
        >
          {({ handleChange }) => (
            <FormGroup>
              <MyTextField
                name="taiKhoan"
                type="text"
                label="Find user"
                onChange={e => {
                  handleChange(e);
                  handleFind(e);
                }}
              />
            </FormGroup>
          )}
        </Formik>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Tai khoan</th>
            <th>Ho ten</th>
            <th>Email</th>
            <th>So DT</th>
            <th>Ma loai</th>
            <th>Chuc nang</th>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.taiKhoan}</td>
              <td>{user.hoTen}</td>
              <td>{user.email}</td>
              <td>{user.soDt || user.soDT}</td>
              <td>{user.maLoaiNguoiDung}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    props.history.push(`/admin/user-detail/${user.taiKhoan}`)
                  }
                >
                  Chi tiet
                </button>
                <button className="btn btn-success" onClick={() => {props.history.push(`/admin/list-course-not-enroll/${user.taiKhoan}`); dispatch(userChosingAction(user))}}>DSKH chua ghi danh</button>
                <button className="btn btn-warning" onClick={() => {props.history.push(`/admin/list-course-enrolled/${user.taiKhoan}`); dispatch(userChosingAction(user))}}>DSKH da ghi danh</button>
                <button className="btn btn-secondary" onClick={() => {props.history.push(`/admin/list-course-wait-enrolled/${user.taiKhoan}`); dispatch(userChosingAction(user))}}>DSKH cho xet duyet</button>
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    Swal.fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, delete it!"
                    }).then(result => {
                      if (result.value) {
                        dispatch(deleteUser(user.taiKhoan));
                      }
                    })
                  }
                >
                  Xoa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default UserManagement;
