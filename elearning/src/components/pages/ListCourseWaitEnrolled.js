import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getCourseListWaitEnrolled } from '../../actions/usersAction'

const ListCourseWaitEnrolled = () => {
    const dispatch = useDispatch()
    const {userChosing, listCourseWaitEnrolled} = useSelector(state => state.usersReducer)
    useEffect(()=>{
        dispatch(getCourseListWaitEnrolled())
    },[])
    return (
        <div>
              <h2>Danh sach khoa hoc cho xet duyet</h2>
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
                    {listCourseWaitEnrolled.map(item => (
                    <tr>
                    <td>{item.maKhoaHoc}</td>
                    
                    <td>{item.tenKhoaHoc}</td>
                    <td>
                        <button className="btn btn-success">Ghi danh</button>
                        <button className="btn btn-danger">Huy ghi danh</button>
                    </td>
                    </tr>
                    ))}
                    
                    
                </tbody>
            </table>
        </div>
    )
}
export default ListCourseWaitEnrolled
