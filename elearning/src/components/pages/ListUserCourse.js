import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserListOfCourse, cancleUserJoinCourse } from "../../actions/courseAction";
import { userChosingAction } from "../../actions/usersAction";

const ListUserCourse = () => {
  const dispatch = useDispatch();
  const { userOfCourse } = useSelector(state => state.courseReducer);
  const { courseChosen } = useSelector(state => state.courseReducer);
 
  return (
    <div>
      <h2>DANH SÁCH HỌC VIÊN KHÓA HỌC</h2>
      <h3>KHÓA HỌC {courseChosen.tenKhoaHoc.toUpperCase()}</h3>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Tài khoản</th>
            <th>Bí danh</th>
            <th>Họ tên</th>
            <th>Tác vụ</th>
          </tr>
        </thead>

        <tbody>
          {userOfCourse.map(item => (
            <tr key={item.taiKhoan}>
              <td>{item.taiKhoan}</td>
              <td>{item.biDanh}</td>
              <td>{item.hoTen}</td>
              <td><button className="btn btn-danger" onClick={() => {dispatch(userChosingAction(item)); dispatch(cancleUserJoinCourse(item.taiKhoan, courseChosen.maKhoaHoc))}}>Hủy ghi danh</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ListUserCourse;
