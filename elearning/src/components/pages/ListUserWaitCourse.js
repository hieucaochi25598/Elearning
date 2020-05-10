import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserListWaitCourse, confirmUserJoinCourse, cancleUserJoinCourse, ghiDanhTheoKhoaHoc } from '../../actions/courseAction'
import { userChosingAction } from '../../actions/usersAction'

const ListUserWaitCourse = () => {
    const dispatch = useDispatch()
    const {userWaitCourse, courseChosen} = useSelector(state => state.courseReducer)
    useEffect(()=>{
        dispatch(getUserListWaitCourse())
    },[])
    return (
        <div>
             <h2>DANH SÁCH HỌC VIÊN CHỜ XÉT DUYỆT</h2>
            <h3>KHÓA HỌC {courseChosen.tenKhoaHoc.toUpperCase()}</h3>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Tài khoản</th>
            <th>Bí danh</th>
            <th>Họ tên</th>
            <th>Chức năng</th>
          </tr>
        </thead>

        <tbody>
          {userWaitCourse.map(item => (
            <tr>
              <td>{item.taiKhoan}</td>
              <td>{item.biDanh}</td>
              <td>{item.hoTen}</td>
            <td>
                <button className="btn btn-primary mr-2" onClick={()=> {dispatch(userChosingAction(item)); dispatch(confirmUserJoinCourse()); dispatch(ghiDanhTheoKhoaHoc(item))}}>Ghi danh</button>
                <button className="btn btn-danger" onClick={() => {dispatch(userChosingAction(item)); dispatch(cancleUserJoinCourse(item.taiKhoan, courseChosen.maKhoaHoc))}}>Hủy ghi danh</button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    )
}
export default ListUserWaitCourse
