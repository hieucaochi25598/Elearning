import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getCourseListWaitEnrolled, confirmEnroll, cancleEnroll, ghiDanhTheoNguoiDung } from '../../actions/usersAction'
import { courseChosenAction, confirmUserJoinCourse, cancleUserJoinCourse, getCourseListAll } from '../../actions/courseAction'


const ListCourseWaitEnrolled = () => {
    const dispatch = useDispatch()
    const {userChosing, listCourseWaitEnrolled} = useSelector(state => state.usersReducer)
    const {listCourses} = useSelector(state => state.courseReducer)
    useEffect(()=>{
        dispatch(getCourseListWaitEnrolled())
        dispatch(getCourseListAll(() => {}))
    },[])
    const renderListCourseWait = (course) => {
        const index = listCourseWaitEnrolled.findIndex(item => item.maKhoaHoc === course.maKhoaHoc)
        if(index !== -1){
            return <tr key={course.maKhoaHoc}>
            <td><img src={course.hinhAnh} alt="images" width={70} height={70}/> {course.tenKhoaHoc}</td>
            <td className="align-middle">{course.nguoiTao && course.nguoiTao.hoTen}</td>
            <td className="align-middle">{course.ngayTao}</td>
            <td className="align-middle">
            <button className="btn btn-success mr-2" onClick={() => {dispatch(confirmEnroll(userChosing.taiKhoan, course.maKhoaHoc)); dispatch(ghiDanhTheoNguoiDung(course))}}><i className="fa fa-check mr-2"></i>Ghi danh</button>
                <button className="btn btn-danger" onClick={() => {dispatch(cancleEnroll(userChosing.taiKhoan, course.maKhoaHoc))}}>
                <i className="fa fa-times-circle mr-2"></i>Hủy ghi danh
                </button>
            </td>
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
                        <th>Tác Vụ</th>
                    </tr>
                </thead>
                <tbody>
                    {listCourses.map(item => (
                 
                    renderListCourseWait(item)
                   
                    ))}
                    
                    
                </tbody>
            </table>
        </div>
    )
}
export default ListCourseWaitEnrolled
