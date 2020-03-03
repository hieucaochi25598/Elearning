import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseDetail } from '../../actions/courseAction'
import { signUpCourse } from '../../actions/userActions'


const CourseDetail = ({ ...props }) => {
    const dispatch = useDispatch()
    const { maKhoaHoc } = props.match.params
    const { courseDetail } = useSelector(state => state.courseReducer)
    useEffect(() => {
        dispatch(getCourseDetail(maKhoaHoc))
    }, [])

    return (
        <div>
            <h1>Chi tiet khoa hoc</h1>
            <img src={courseDetail.hinhAnh} alt="" />
            <p>{courseDetail.tenKhoaHoc}</p>
            {courseDetail.nguoiTao && <p>{courseDetail.nguoiTao.hoTen}</p>}
            {courseDetail.danhMucKhoaHoc && <p>{courseDetail.danhMucKhoaHoc.tenDanhMucKhoaHoc}</p>}
            {/* Do luc dau chay render truoc nen object luc dau se bi rong nen can phai qua buoc kiem tra */}
        {/* <button className="btn btn-success" onClick={() => {dispatch(signUpCourse(courseDetail.maKhoaHoc,handleSuccess))}}>Dang ky khoa hoc</button> */}
        </div>
    )
}
export default CourseDetail
