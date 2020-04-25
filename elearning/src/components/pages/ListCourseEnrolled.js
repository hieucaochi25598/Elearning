import React from 'react'
import { userChosingAction, getCourseListEnrolled, cancleEnroll } from '../../actions/usersAction'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { courseChosenAction, cancleUserJoinCourse, getCourseListAll } from '../../actions/courseAction'

const ListCourseEnrolled = (props) => {
    const dispatch = useDispatch()
    const {userChosing, listCourseEnrolled} = useSelector(state => state.usersReducer)
    const {listCourses} = useSelector(state => state.courseReducer)
    useEffect(() => {
        dispatch(getCourseListEnrolled())
        dispatch(getCourseListAll(() => {}))
    }, [])
    const renderListEnrolled = (course) => {
        const index = listCourseEnrolled.findIndex(item => item.maKhoaHoc === course.maKhoaHoc)
        if(index !== -1){
            return <tr key={course.maKhoaHoc}>
                
                <td><img src={course.hinhAnh} alt="images" width={70} height={70}/> {course.tenKhoaHoc}</td>
                <td className="align-middle">{course.nguoiTao && course.nguoiTao.hoTen}</td>
                <td className="align-middle">{course.ngayTao}</td>
                <td className="align-middle">
                    <button className="btn btn-danger" onClick={() => {dispatch(cancleEnroll(userChosing.taiKhoan, course.maKhoaHoc))}}>
                    <i className="fa fa-times-circle mr-2"></i>Hủy ghi danh
                    </button>
                </td>
            </tr>
        }
    }
    return (
        <div>
            <table className="table table-striped" align="center">
                <thead className="thead-dark">
                    <tr>
                       
                        <th>Khóa Học</th>
                        <th>Người Tạo</th>
                        <th>Ngày Tạo</th>
                        <th>Tác Vụ</th>
                    </tr>
                </thead>
                <tbody>
                    {listCourses.map(item => (
                        renderListEnrolled(item)
                    )) 
                    }
                </tbody>
            </table>
        </div>
    )
}
export default ListCourseEnrolled
