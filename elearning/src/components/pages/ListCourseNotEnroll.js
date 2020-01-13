import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getCourseListNotEnroll } from '../../actions/usersAction'

const ListCourseNotEnroll = () => {
    const dispatch = useDispatch()
    const {userChosing, listCourseNotEnroll} = useSelector(state => state.usersReducer)
    useEffect(() => {
        dispatch(getCourseListNotEnroll())
    }, [])
    return (
        <div>
            <h2>Danh sach khoa hoc chua ghi danh</h2>
            <h2>Tai khoan: {userChosing.taiKhoan}</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Ma khoa hoc</th>
                        <th>Bi danh</th>
                        <th>Ten khoa hoc</th>
                    </tr>
                </thead>
                <tbody>
                    {listCourseNotEnroll.map(item => (
                    <tr>
                    <td>{item.maKhoaHoc}</td>
                    <td>{item.biDanh}</td>
                    <td>{item.tenKhoaHoc}</td>
                    </tr>
                    ))}
                    
                    
                </tbody>
            </table>
        </div>
    )
}
export default ListCourseNotEnroll
