import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getCourseListNotEnroll } from '../../actions/usersAction'
import { getCourseListAll } from '../../actions/courseAction'

const ListCourseNotEnroll = () => {
    const dispatch = useDispatch()
    const {userChosing, listCourseNotEnroll} = useSelector(state => state.usersReducer)
    useEffect(() => {
        dispatch(getCourseListNotEnroll())
        dispatch(getCourseListAll(() => {}))
    }, [])
    const {listCourses} = useSelector(state => state.courseReducer)
    const renderListNotEnrolled = (course) => {
        const index = listCourseNotEnroll.findIndex(item => item.maKhoaHoc === course.maKhoaHoc)
        if(index !== -1){
            return <tr key={course.maKhoaHoc}>
                
                <td ><img src={course.hinhAnh} alt="images" width={70} height={70}/> {course.tenKhoaHoc}</td>
                <td className="align-middle">{course.nguoiTao && course.nguoiTao.hoTen}</td>
                <td className="align-middle">{course.ngayTao}</td>
                
            </tr>
        }
    }
    return (
        <div>
            <table className="table table-striped">
            <thead className="thead-dark">
                    <tr>
                        <th>Khóa Học</th>
                        <th>Người Tạo</th>
                        <th>Ngày Tạo</th>
                    </tr>
                </thead>
                <tbody>
                    {listCourses.map(item => (
                    renderListNotEnrolled(item)
                    ))}
                    
                    
                </tbody>
            </table>
        </div>
    )
}
export default ListCourseNotEnroll
