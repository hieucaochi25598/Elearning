import React from 'react'
import { userChosingAction, getCourseListEnrolled } from '../../actions/usersAction'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { courseChosenAction, cancleUserJoinCourse } from '../../actions/courseAction'

const ListCourseEnrolled = (props) => {
    const dispatch = useDispatch()
    const {userChosing, listCourseEnrolled} = useSelector(state => state.usersReducer)
    useEffect(() => {
        dispatch(getCourseListEnrolled())
    }, [])
    console.log(props)
    return (
        <div>
            <h2>Danh sach khoa hoc da ghi danh</h2>
            <h2>Tai khoan: {userChosing.taiKhoan}</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Ma khoa hoc</th>
                        <th>Ten khoa hoc</th>
                        <th>Chuc nang</th>
                    </tr>
                </thead>
                <tbody>
                    {listCourseEnrolled.map(item => (
                    <tr>
                    <td>{item.maKhoaHoc}</td>
                    <td>{item.tenKhoaHoc}</td>
                    <td><button className="btn btn-danger" onClick={() => {dispatch(courseChosenAction(item)); dispatch(cancleUserJoinCourse())}}>Huy ghi danh</button></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default ListCourseEnrolled
