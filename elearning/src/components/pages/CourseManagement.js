import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCourseList, deleteCourse, courseChosenAction } from "../../actions/courseAction";

const CourseManagement = (props) => {
  const { listCourses, courseChosen } = useSelector(state => state.courseReducer);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getCourseList())
  }, [])
  console.log(courseChosen)
  return (
    <div>
      <h2>Danh sach khoa hoc</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Ma khoa hoc</th>
            <th>Ten khoa hoc</th>
            <th>Ngay tao</th>
            <th>Ten danh muc khoa hoc</th>
            <th>Chuc nang</th>
          </tr>
        </thead>
        <tbody>
          {
            listCourses.map(item => (
              <tr>
                <td scope="row">{item.maKhoaHoc}</td>
                <td>{item.tenKhoaHoc}</td>
                <td>{item.ngayTao}</td>
                {item.danhMucKhoaHoc && <td>{item.danhMucKhoaHoc.tenDanhMucKhoaHoc}</td>}
                <td>
                    <button className="btn btn-warning" onClick={() => {props.history.push(`/admin/list-user-course/${item.maKhoaHoc}`); dispatch(courseChosenAction(item))}}>Danh sach hoc vien</button>
                    <button className="btn btn-warning" onClick={() =>{props.history.push(`/admin/list-user-not-course/${item.maKhoaHoc}`); dispatch(courseChosenAction(item))}}>DS chua ghi danh</button>
                    <button className="btn btn-warning" onClick={() =>{props.history.push(`/admin/list-user-wait-course/${item.maKhoaHoc}`); dispatch(courseChosenAction(item))}}>DS cho xet duyet</button>
                    <button className="btn btn-primary">Sua</button>
                    <button className="btn btn-danger" onClick={() => dispatch(deleteCourse(item.maKhoaHoc))}>Xoa</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default CourseManagement;
