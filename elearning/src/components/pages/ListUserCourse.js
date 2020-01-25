import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserListOfCourse, cancleUserJoinCourse } from "../../actions/courseAction";
import { userChosingAction } from "../../actions/usersAction";

const ListUserCourse = () => {
  const dispatch = useDispatch();
  const { userOfCourse } = useSelector(state => state.courseReducer);
  const { courseChosen } = useSelector(state => state.courseReducer);
  // useEffect(() => {
  //   dispatch(getUserListOfCourse());
  // }, []);
  console.log(userOfCourse);
  return (
    <div>
      <h2>Danh sach hoc vien khoa hoc</h2>
      <h3>Khoa hoc {courseChosen.tenKhoaHoc}</h3>
      <table class="table">
        <thead>
          <tr>
            <th>Tai khoan</th>
            <th>Bi danh</th>
            <th>Ho ten</th>
            <th>Chuc nang</th>
          </tr>
        </thead>

        <tbody>
          {userOfCourse.map(item => (
            <tr>
              <td>{item.taiKhoan}</td>
              <td>{item.biDanh}</td>
              <td>{item.hoTen}</td>
              <td><button className="btn btn-danger" onClick={() => {dispatch(userChosingAction(item)); dispatch(cancleUserJoinCourse())}}>Huy ghi danh</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ListUserCourse;
