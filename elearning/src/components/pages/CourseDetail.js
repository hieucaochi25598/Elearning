import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseDetail } from '../../actions/courseAction'
import { signUpCourse, deleteSignUpCourse, getAccountInfo } from '../../actions/userActions'


const CourseDetail = ({ ...props }) => {
    const dispatch = useDispatch()
    const { maKhoaHoc } = props.match.params
    const {accountInfo} = useSelector(state => state.userReducer)
    const { courseDetail } = useSelector(state => state.courseReducer)
    const [isEnroll, setIsEnroll] = useState(false)
    useEffect(() => {
        dispatch(getCourseDetail(maKhoaHoc))
        const index = accountInfo.chiTietKhoaHocGhiDanh.findIndex(item => item.maKhoaHoc === maKhoaHoc)
        if(index !== -1){
            setIsEnroll(true)
        }
    }, [])

    
    const handleSuccess = () => {
        props.history.push('/course-list')
    }
    return (
        <div>
            <h1>Chi tiet khoa hoc</h1>
            <img src={courseDetail.hinhAnh} alt="" />
            <p>{courseDetail.tenKhoaHoc}</p>
            {courseDetail.nguoiTao && <p>{courseDetail.nguoiTao.hoTen}</p>}
            {courseDetail.danhMucKhoaHoc && <p>{courseDetail.danhMucKhoaHoc.tenDanhMucKhoaHoc}</p>}
            {/* Do luc dau chay render truoc nen object luc dau se bi rong nen can phai qua buoc kiem tra */}
            {isEnroll ? <button className="btn btn-danger" onClick={() => {dispatch(deleteSignUpCourse(handleSuccess))}}>Huy dang ky</button> : <button className="btn btn-success" onClick={() => {dispatch(signUpCourse(handleSuccess))}}>Dang ky khoa hoc</button> }
        </div>
    )
}
export default CourseDetail
