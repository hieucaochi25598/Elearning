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
            <h2>DANH SÁCH HỌC VIÊN CHƯA GHI DANH</h2>
            <h3>KHÓA HỌC {courseChosen.tenKhoaHoc.toUpperCase()}</h3>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Tài khoản</th>
            <th>Bí danh</th>
            <th>Họ tên</th>
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
