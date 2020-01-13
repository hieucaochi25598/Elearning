import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserListNotChoseCourse } from '../../actions/courseAction'

const ListUserNotCourse = () => {
    const {userNotChoseCourse, courseChosen} = useSelector(state => state.courseReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserListNotChoseCourse())
    }, [])
    
    return (
        <div>
            <h2>Danh sach hoc vien chua ghi danh khoa hoc</h2>
            <h3>Khoa hoc {courseChosen.tenKhoaHoc}</h3>
      <table class="table">
        <thead>
          <tr>
            <th>Tai khoan</th>
            <th>Bi danh</th>
            <th>Ho ten</th>
          </tr>
        </thead>

        <tbody>
          {userNotChoseCourse.map(item => (
            <tr>
              <td>{item.taiKhoan}</td>
              <td>{item.biDanh}</td>
              <td>{item.hoTen}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    )
}
export default ListUserNotCourse
