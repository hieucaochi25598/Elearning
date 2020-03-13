import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCourseDetail } from '../../actions/courseAction'
import { signUpCourse, commentCourse, getCommentCourse } from '../../actions/userActions'
import {Formik, Form} from 'formik'
import { MyInput } from './FormEditAccount'
import { Button } from 'reactstrap'

const CourseDetail = ({ ...props }) => {
    const dispatch = useDispatch()
    const { maKhoaHoc } = props.match.params
    const { courseDetail } = useSelector(state => state.courseReducer)
    const {commentArray} = useSelector(state => state.userReducer)
    useEffect(() => {
        dispatch(getCourseDetail(maKhoaHoc))
        dispatch(getCommentCourse(maKhoaHoc))
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
        {commentArray.map((item,index) => (
            <React.Fragment key={index}>
            <p>{item.taiKhoan}</p>
        <p>{item.comment}</p>
        </React.Fragment>
        ))}
        <Formik
        initialValues={{
            comment: ''
        }}
        onSubmit={values => dispatch(commentCourse(values))}>
            {({handleSubmit}) => 
            <Form>
                <MyInput name="comment" type="text"/>
                <Button color="primary" onClick={handleSubmit}>Binh luan</Button>
            </Form>}
        </Formik>
        </div>
    )
}
export default CourseDetail
