import React from 'react'
import { userChosingAction, getCourseListEnrolled } from '../../actions/usersAction'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const ListCourseEnrolled = () => {
    const dispatch = useDispatch()
    const {userChosing, listCourseEnrolled} = useSelector(state => state.usersReducer)
    useEffect(() => {
        dispatch(getCourseListEnrolled())
    }, [])
    return (
        <div>
            <h2>Danh sach khoa hoc da ghi danh</h2>
            <h2>Tai khoan: {userChosing.taiKhoan}</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Ma khoa hoc</th>
                        
                        <th>Ten khoa hoc</th>
                    </tr>
                </thead>
                <tbody>
                    {listCourseEnrolled.map(item => (
                    <tr>
                    <td>{item.maKhoaHoc}</td>
                    
                    <td>{item.tenKhoaHoc}</td>
                    </tr>
                    ))}
                    
                    
                </tbody>
            </table>
        </div>
    )
}
export default ListCourseEnrolled
