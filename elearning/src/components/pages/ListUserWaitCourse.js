import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserListWaitCourse, confirmUserJoinCourse, cancleUserJoinCourse } from '../../actions/courseAction'
import { userChosingAction } from '../../actions/usersAction'

const ListUserWaitCourse = () => {
    const dispatch = useDispatch()
    const {userWaitCourse, courseChosen} = useSelector(state => state.courseReducer)
    useEffect(()=>{
        dispatch(getUserListWaitCourse())
    },[])
    return (
        <div>
             <h2>Danh sach hoc vien cho xet duyet khoa hoc</h2>
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
          {userWaitCourse.map(item => (
            <tr>
              <td>{item.taiKhoan}</td>
              <td>{item.biDanh}</td>
              <td>{item.hoTen}</td>
            <td>
                <button className="btn btn-primary" onClick={()=> {dispatch(userChosingAction(item)); dispatch(confirmUserJoinCourse())}}>Ghi danh</button>
                <button className="btn btn-danger" onClick={() => {dispatch(userChosingAction(item)); dispatch(cancleUserJoinCourse())}}>Huy ghi danh</button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    )
}
export default ListUserWaitCourse
